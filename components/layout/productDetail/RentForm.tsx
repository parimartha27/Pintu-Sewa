"use client";

import Image from "next/image";
import CalendarImage from "@/public/calendar.svg";
import { differenceInDays, format } from "date-fns";
import NextSymbol from "@/public/next.svg";
import Cart from "@/public/cart.svg";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  addDays,
  isBefore,
  isWithinInterval,
  differenceInCalendarDays 
} from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import { ProductDetailProps } from "@/types/productDetail";
import { formatToRupiah } from "@/hooks/useConvertRupiah";
import { AddToCartRequestProps, AddToCartResponse } from "@/types/addToCart";
import axios, { AxiosError } from "axios";
import { cartBaseUrl, checkoutBaseUrl } from "@/types/globalVar";
import { useRouter } from "next/navigation";
import { getMinDuration } from "@/hooks/useMinRentDuration";
import LoadingPopup from "../LoadingPopUp";
import { checkoutFromCartResponseProps } from "@/types/checkout";
import Alert from "../Alert";
import { AlertProps } from "@/types/alert";
import { useAuth } from "@/hooks/auth/useAuth";

function formatDate(date: Date | undefined) {
  return date ? format(date, "yyyy-MM-dd") : undefined;
}

const RentForm = ({ productDetail }: { productDetail: ProductDetailProps }) => {
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cartIconRef = useRef<HTMLDivElement>(null);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const duration = getMinDuration(productDetail);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const disableUntil = addDays(today, 4);

  const [startDate, setStartDate] = useState<Date | undefined>(
    () => addDays(today, 5)
  );

  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const baseDate = new Date();

    let daysToAdd = 0;
    if (duration === "1 Minggu") daysToAdd = 7;
    else if (duration === "1 Bulan") daysToAdd = 30;

    baseDate.setDate(baseDate.getDate() + daysToAdd + 5);
    return baseDate;
  });

  const [qty, setQty] = useState<number>(productDetail.min_rented);
  const max = productDetail.stock;

  const { customerId, token } = useAuth();

  function handleDecreaseQty() {
    if (qty > productDetail.min_rented) setQty(qty - 1);
  }

  function handleIncreaseQty() {
    if (qty < max) setQty(qty + 1);
  }

  function calculateTotal() {
      if (!startDate || !endDate) return 0;

  const diffInDays = differenceInCalendarDays(endDate, startDate);
  const days = diffInDays >= 0 ? diffInDays + 1 : 0;

  let total = 0;
  let remainingDays = days;

  const monthlyPrice = productDetail.monthly_price || 0;
  const weeklyPrice = productDetail.weekly_price || 0;
  const dailyPrice = productDetail.daily_price || 0;

  const months = Math.floor(remainingDays / 30);
  total += months * monthlyPrice;
  remainingDays %= 30;

  const weeks = Math.floor(remainingDays / 7);
  total += weeks * weeklyPrice;
  remainingDays %= 7;

  total += remainingDays * dailyPrice;

  return formatToRupiah(total * qty);
  }

  const validateDates = (): { valid: boolean; message?: string } => {
    if (!startDate || !endDate) {
      return {
        valid: false,
        message: "Tanggal mulai dan selesai harus dipilih",
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedStart = new Date(startDate);
    selectedStart.setHours(0, 0, 0, 0);

    const selectedEnd = new Date(endDate);
    selectedEnd.setHours(0, 0, 0, 0);

    if (selectedStart < today) {
      return {
        valid: false,
        message: "Tanggal Mulai Tidak Boleh Sebelum Hari Ini",
      };
    }

    if (selectedStart > selectedEnd) {
      return {
        valid: false,
        message: "Tanggal Selesai Tidak Boleh Sebelum Tanggal Mulai",
      };
    }

    const dayDiff = differenceInDays(selectedEnd, selectedStart);
    let minDays = 1;

    if (productDetail.daily_price) {
      minDays = 1;
    } else if (productDetail.weekly_price) {
      minDays = 7;
    } else if (productDetail.monthly_price) {
      minDays = 30;
    }

    if (dayDiff < minDays - 1) {
      return { valid: false, message: `Durasi sewa minimal ${minDays} hari` };
    }

    return { valid: true };
  };

  const addToCartReq: AddToCartRequestProps = {
    customer_id: customerId || "",
    product_id: productDetail.id,
    quantity: qty,
    start_rent_date: formatDate(startDate) || "",
    end_rent_date: formatDate(endDate) || "",
  };

  const handleAddToCart = async () => {
    if (!customerId || !token) {
      setAlertState({
        isOpen: true,
        message: "Silahkan Login Terlebih Dahulu",
      });
      return;
    }
    const validation = validateDates();
    if (!validation.valid) {
      setAlertState({
        isOpen: true,
        message: validation.message || "Tanggal tidak valid",
      });
      return;
    }

    try {
      setAddToCartLoading(true);
      console.log("add to cart req: ", addToCartReq);
      const res = await axios.post<AddToCartResponse>(
        `${cartBaseUrl}/add`,
        addToCartReq
      );
      if (res.data.error_schema.error_message === "SUCCESS") {
        setAddToCartLoading(false);
        setAlertState({
          isOpen: true,
          message: "Produk Berhasil Ditambahkan Ke Keranjang",
          isWrong: false,
        });
      }
      console.log("add to cart res: ", res);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setAlertState({ isOpen: true, message: "Stok Telah Habis" });
          return;
        }
      }
    } finally {
      setAddToCartLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!customerId || !token) {
      setAlertState({
        isOpen: true,
        message: "Silahkan Login Terlebih Dahulu",
      });
      return;
    }
    const validation = validateDates();
    if (!validation.valid) {
      setAlertState({
        isOpen: true,
        message: validation.message || "Tanggal tidak valid",
      });
      return;
    }

    try {
      const payload = {
        customer_id: customerId,
        product_id: productDetail.id,
        start_date: formatDate(startDate),
        end_date: formatDate(endDate),
        quantity: qty,
        shipping_partner_id: "JNE",
      };
      console.log("PAYLOAD CHECKOUT: ", payload);
      setCheckoutLoading(true);
      const res = await axios.post<checkoutFromCartResponseProps>(
        `${checkoutBaseUrl}/product`,
        payload
      );
      if (res.data.error_schema.error_message === "SUCCESS") {
        setCheckoutLoading(false);
        localStorage.setItem(
          "transactionIds",
          JSON.stringify(res.data.output_schema.transaction_ids)
        );
        router.push("/checkout");
      }
    } catch (error) {
      console.error(error);
      setAlertState({ isOpen: true, message: "Checkout Gagal" });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() =>
            setAlertState({ isOpen: false, message: "", isWrong: true })
          }
          isWrong={alertState.isWrong}
        />
      )}
      {checkoutLoading && <LoadingPopup />}
      <div className="flex flex-col mt-[15px] md:max-h-[425px] lg:max-h-[450px] xl:max-h-[500px] md:mt-[60px] xl:max-w-[400px] xl:w-full pt-3 lg:pt-7 pb-4 xl:pb-[35px] px-3 xl:px-7 shadow-md outline-none bg-white">
        <h2 className="text-[14px] xl:text-[18px] text-color-primary font-medium">
          Formulir Penyewaan
        </h2>

        {/* PERIODE SEWA */}
        <div className="flex space-x-2 mt-[27px] items-center">
          <Image
            src={CalendarImage}
            alt="calendar"
            className="w-[11px] h-[12.22px]"
          />
          <h4 className="text-xs xl:text-sm text-color-primary font-medium">
            Periode Sewa
          </h4>
        </div>

        <div className="flex mt-[14px] space-x-[6px] items-center">
          {/* TANGGAL MULAI */}
          <div className="flex flex-col space-y-[6px]">
            <h4 className="text-[10px] xl:text-xs font-normal text-color-primary">
              Mulai
            </h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={productDetail.stock <= 0}
                  className={cn(
                    "w-[132px] justify-start text-left font-normal text-[12px] text-color-primary border-[1px] border-[#73787B] bg-transparent hover:bg-slate-200",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  {startDate ? (
                    format(startDate, "dd-MM-yyyy")
                  ) : (
                    <span>Tanggal Mulai</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={setStartDate}
                  selected={startDate}
                  initialFocus
                  disabled={(date) =>
                    isBefore(date, today) ||
                    isWithinInterval(date, { start: today, end: disableUntil })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <h4 className="text-color-primary mt-5">-</h4>

          {/* TANGGAL SELESAI */}
          <div className="flex flex-col space-y-[6px]">
            <h4 className="text-[10px] xl:text-xs font-normal text-color-primary">
              Selesai
            </h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  disabled={productDetail.stock <= 0}
                  className={cn(
                    "w-[132px] justify-start text-left font-normal text-[12px] text-color-primary border-[1px] border-[#73787B] bg-transparent hover:bg-slate-200",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  {endDate ? (
                    format(endDate, "dd-MM-yyyy")
                  ) : (
                    <span>Tanggal Selesai</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  onSelect={setEndDate}
                  selected={endDate}
                  disabled={(date) =>
                    isBefore(date, today) ||
                    isWithinInterval(date, { start: today, end: disableUntil })
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* QUANTITY */}
        <div className="flex flex-col mt-[14px] space-y-[4px]">
          <div className="flex flex-col space-y-[6px]">
            <h2 className="text-[12px] xl:text-sm font-medium text-color-primary">
              Quantity
            </h2>
            <div className="flex space-x-[7px] xl:space-x-6 px-2.5 xl:px-3 py-3 items-center border-[1px] border-[#73787B] bg-transparent w-full max-w-[60px] xl:max-w-[100px] h-[20px] rounded-sm">
              <button onClick={handleDecreaseQty} className="hover:opacity-75">
                -
              </button>
              <h4 className="block text-[12px] text-color-primary">{qty}</h4>
              <button
                onClick={handleIncreaseQty}
                className="mb-[2px] hover:opacity-75"
              >
                +
              </button>
            </div>
          </div>
          <h3 className="text-[8px] xl:text-[10px] text-color-grayPrimary font-normal">
            Sisa Stok:{" "}
            <span className="font-semibold">{productDetail.stock}</span>
          </h3>
        </div>

        {/* SUBTOTAL */}
        <div className="flex justify-between items-center w-full mt-3">
          <h3 className="text-normal text-color-primary text-[12px] xl:text-[14px]">
            Subtotal
          </h3>
          <h2 className="text-lg xl:text-[20px] text-color-primaryDark font-bold">
            {calculateTotal()}
          </h2>
        </div>

        {productDetail.stock === 0 && (
          <h2 className="text-sm xl:text-lg font-semibold text-color-secondary text-center mt-3">
            Stok tidak tersedia
          </h2>
        )}

        <div className="flex flex-col mt-[14px] space-y-3">
          <Button
            onClick={() => {
              handleCheckout();
            }}
            disabled={productDetail.stock <= 0}
            className={`w-full xl:h-[54px] hover:opacity-80 bg-custom-gradient-tr flex space-x-[9px] ${
              productDetail.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image
              src={NextSymbol}
              alt="next-symbol"
              className="w-3 h-[14px] xl:w-5 xl:h-5"
            />
            <h4 className="text-[12px] xl:text-lg font-medium ">Selanjutnya</h4>
          </Button>
          <Button
            ref={buttonRef}
            onClick={handleAddToCart}
            disabled={addToCartLoading || productDetail.stock <= 0}
            className={`w-full xl:h-[54px] bg-transparent border-[1px] border-color-primaryDark hover:bg-slate-200  flex space-x-[9px] ${
              productDetail.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""
            } ${addToCartLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Image
              src={Cart}
              alt="cart"
              className="w-3 h-[14px] xl:w-5 xl:h-5"
            />
            <h4 className="text-[12px] xl:text-lg font-medium text-color-primaryDark">
              Keranjang
            </h4>
          </Button>
          <div
            ref={cartIconRef}
            className="fixed top-4 right-4 z-50 invisible"
          />
        </div>
      </div>
    </>
  );
};

export default RentForm;