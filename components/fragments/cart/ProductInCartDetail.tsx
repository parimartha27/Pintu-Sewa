"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Delete from "@/public/delete.svg";
import ProductImage from "@/public/productTest.jpeg";
import { useState } from "react";
import { CartItemProps } from "@/types/cart";
import { formatToRupiah } from "@/hooks/useConvertRupiah";
import axios from "axios";
import { cartBaseUrl } from "@/types/globalVar";
import Edit from "@/public/edit.svg";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  format,
  // isValid,
} from "date-fns";
import { parseIndoDateToISO } from "@/hooks/useIndoDate";
import Alert from "@/components/layout/Alert";
import { AlertProps } from "@/types/alert";
import { useAuth } from "@/hooks/auth/useAuth";
import { addDays, isBefore, isWithinInterval } from "date-fns";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface ProductInCartDetailProps {
  cartItem: CartItemProps;
  onDelete: (cartId: string) => void;
  isChecked: boolean;
  onCheckChange: (cartId: string, checked: boolean) => void;
  onRefresh: () => void;
}

interface CartRequestHandleProps {
  cart_id: string;
  quantity: number;
  start_rent_date: string;
  end_rent_date: string;
}

const ProductInCartDetail = ({
  cartItem,
  onDelete,
  isChecked,
  onCheckChange,
  onRefresh,
}: ProductInCartDetailProps) => {
  const [qty, setQty] = useState<number>(cartItem.quantity);
  const [max] = useState<number>(cartItem.stock);
  const isAvailable = cartItem.available_to_rent;
  const [startDate, setStartDate] = useState<Date | undefined>(
    cartItem.start_rent_date ? new Date(cartItem.start_rent_date) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    cartItem.end_rent_date ? new Date(cartItem.end_rent_date) : undefined
  );
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });
  const today = new Date();
  const disableUntil = addDays(today, 4);
  const enableDate = addDays(today, 5);
  // let showError = false;

  // if (cartItem.start_rent_date) {
  //   const parsedDate = new Date(cartItem.start_rent_date);
  //   if (isValid(parsedDate) && isBefore(parsedDate, disableUntil)) {
  //     showError = true;
  //   }
  // }

  const { customerId } = useAuth();

  const getMinDurationAndUnit = (
    product: CartItemProps
  ): { value: number; unit: "day" | "week" | "month" } => {
    if (product.daily_price) return { value: 1, unit: "day" };
    if (product.weekly_price) return { value: 1, unit: "week" };
    if (product.monthly_price) return { value: 1, unit: "month" };
    return { value: 0, unit: "day" };
  };

  const handleDeleteClick = async () => {
    try {
      const res = await axios.delete(`${cartBaseUrl}/delete`, {
        data: {
          cart_id: cartItem.cart_id,
          customer_id: customerId,
        },
      });

      const data = res.data;
      if (data.error_schema.error_message === "SUCCESS") {
        const currentSelected = JSON.parse(
          localStorage.getItem("selectedCartIds") || "[]"
        );
        const updatedSelected = currentSelected.filter(
          (id: string) => id !== cartItem.cart_id
        );
        localStorage.setItem(
          "selectedCartIds",
          JSON.stringify(updatedSelected)
        );
        onDelete(cartItem.cart_id);
        onRefresh();
      } else {
        setAlertState({
          isOpen: true,
          message: "Gagal Menghapus Item",
        });
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleSelectStartDate = (date: Date | undefined) => {
    setStartDate(date);
    if (date && endDate && date > endDate) {
      setEndDate(undefined);
    }
  };

  const handleSelectEndDate = (date: Date | undefined) => {
    setEndDate(date);
  };

  const handleDecreaseQty = async () => {
    if (qty <= 1) return;
    try {
      const payload: CartRequestHandleProps = {
        cart_id: cartItem.cart_id,
        quantity: qty - 1,
        start_rent_date: format(
          new Date(parseIndoDateToISO(cartItem.start_rent_date)),
          "yyyy-MM-dd"
        ),
        end_rent_date: format(
          new Date(parseIndoDateToISO(cartItem.end_rent_date)),
          "yyyy-MM-dd"
        ),
      };

      const res = await axios.put(`${cartBaseUrl}/edit`, payload);

      const data = res.data;
      if (data.error_schema.error_message === "SUCCESS") {
        if (qty > 1) setQty(qty - 1);
      } else {
        setAlertState({
          isOpen: true,
          message: "Gagal mengurangi jumlah item",
        });
      }
    } catch (err) {
      console.error("decrease qty failed:", err);
    }
  };

  const handleIncreaseQty = async () => {
    if (qty >= max) return;
    try {
      const payload: CartRequestHandleProps = {
        cart_id: cartItem.cart_id,
        quantity: qty + 1,
        start_rent_date: format(
          new Date(parseIndoDateToISO(cartItem.start_rent_date)),
          "yyyy-MM-dd"
        ),
        end_rent_date: format(
          new Date(parseIndoDateToISO(cartItem.end_rent_date)),
          "yyyy-MM-dd"
        ),
      };

      const res = await axios.put(`${cartBaseUrl}/edit`, payload);
      console.log("payload ubah tanggal: ", payload);

      const data = res.data;
      if (data.error_schema.error_message === "SUCCESS") {
        if (qty < max) setQty(qty + 1);
      } else {
        setAlertState({
          isOpen: true,
          message: "Gagal menambah jumlah item",
        });
      }
    } catch (err) {
      console.error("increase qty failed:", err);
    }
  };

  const handleApplyDate = async () => {
    if (!startDate || !endDate) return;

    const { value, unit } = getMinDurationAndUnit(cartItem);
    let isValid = false;

    switch (unit) {
      case "day":
        isValid = differenceInDays(endDate, startDate) + 1 >= value;
        break;
      case "week":
        isValid = differenceInWeeks(endDate, startDate) + 1 >= value;
        break;
      case "month":
        isValid = differenceInMonths(endDate, startDate) + 1 >= value;
        break;
    }

    if (!isValid) {
      setAlertState({
        isOpen: true,
        message: `Tanggal selesai harus minimal ${value} ${
          unit === "day" ? "hari" : unit === "week" ? "minggu" : "bulan"
        } setelah tanggal mulai.`,
        isWrong: true,
      });
      setIsPopoverOpen(false);
      return;
    }

    try {
      const payload: CartRequestHandleProps = {
        cart_id: cartItem.cart_id,
        quantity: qty,
        start_rent_date: format(startDate, "yyyy-MM-dd"),
        end_rent_date: format(endDate, "yyyy-MM-dd"),
      };

      console.log("payload ubah tanggal: ", payload);
      const res = await axios.put(`${cartBaseUrl}/edit`, payload);

      if (res.data.error_schema.error_message === "SUCCESS") {
        onRefresh();
        setAlertState({
          isOpen: true,
          message: "Tanggal Berhasil Diubah",
          isWrong: false,
        });
        setIsPopoverOpen(false);
      }
    } catch (err) {
      setAlertState({
        isOpen: true,
        message: "Gagal mengubah tanggal: " + err,
        isWrong: true,
      });
    }
  };

  const handleCheckChange = () => {
    const newCheckedState = !isChecked;
    onCheckChange(cartItem.cart_id, newCheckedState);
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
      <div
        className={`flex flex-col lg:flex-row lg:flex-wrap lg:justify-between mb-6 lg:lg-3 pt-6 lg:pt-3 border-t-[1px] border-t-[#D9D9D9] `}
      >
        <div
          className={`flex space-x-8 w-[300px] ${
            !isAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex space-x-4">
            <Checkbox
              checked={isChecked}
              onCheckedChange={handleCheckChange}
              disabled={!isAvailable}
            />

            <Image
              width={88}
              height={88}
              src={cartItem.image || ProductImage}
              alt="product"
              className={`w-[60px] h-[60px] xl:w-[88px] xl:h-[88px] min-w-[60px] min-h-[60px] xl:min-w-[88px] xl:min-h-[88px] object-fit rounded-md ${
                !cartItem.available_to_rent ? "grayscale" : ""
              }`}
            />
          </div>
          <div className="flex flex-col space-y-2 lg:w-[200px]">
            <h2
              className="text-color-primary text-[16px] font-semibold text-wrap max-w-[100px] md:max-w-[200px] lg:max-w-[250px] truncate"
              title={cartItem.product_name}
            >
              {cartItem.product_name || "Nama Produk"}
            </h2>
            <h2 className="text-color-primaryDark text-[14px] sm:text-base font-semibold max-w-[160px] truncate sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px]">
              {formatToRupiah(cartItem.price) || "Rp 500.000"}
            </h2>
            {!isAvailable && (
              <p className="text-color-grayPrimary text-[14px] font-medium text-opacity-70">
                Produk tidak tersedia untuk disewa
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-16 mt-10 lg:mt-0 ${
            !isAvailable ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex flex-col space-y-1 md:space-y-3 w-[300px]">
            <div className="flex space-x-1">
              <h2 className="text-color-primary text-[14px] font-semibold">
                Periode Sewa
              </h2>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 hover:bg-transparent"
                  >
                    <Image
                      src={Edit}
                      alt="edit"
                      width={15}
                      height={15}
                      className="hover:cursor-pointer hover:opacity-70"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 space-y-4 flex flex-col">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-sm font-medium text-color-secondary text-center">
                        Mulai
                      </h4>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={handleSelectStartDate}
                        disabled={(date) =>
                          isBefore(date, today) ||
                          isWithinInterval(date, {
                            start: today,
                            end: disableUntil,
                          })
                        }
                        initialFocus
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <h4 className="text-sm font-medium text-color-secondary text-center">
                        Selesai
                      </h4>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={handleSelectEndDate}
                        disabled={(date) =>
                          isBefore(date, today) ||
                          isWithinInterval(date, {
                            start: today,
                            end: disableUntil,
                          })
                        }
                        initialFocus
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleApplyDate}
                    disabled={startDate && endDate ? false : true}
                    className="w-full self-end mb-6 mr-4 max-w-[100px] mt-4 bg-color-secondary hover:bg-blue-700 "
                  >
                    Terapkan
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            {(cartItem.date_error) && (
              <p className="text-red-500 text-sm mb-2 font-semibold">
                Tanggal mulai sewa minimal{" "}
                {enableDate.toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            )}

            <h2 className="text-color-primary text-[14px] md:space-y-3">
              {cartItem.start_rent_date && cartItem.end_rent_date
                ? `${cartItem.start_rent_date} - ${cartItem.end_rent_date}`
                : "28 Januari 2025 - 28 Februari 2025"}
            </h2>
          </div>
          <div className="flex flex-col space-y-1 md:space-y-3">
            <h2 className="text-color-primary text-[14px] font-semibold">
              Durasi Sewa
            </h2>
            <h2 className="text-color-primary text-[14px]">
              {cartItem.rent_duration || "x BULAN"}
            </h2>
          </div>
          <div className="flex flex-col space-y-1 md:space-y-3">
            <h2 className="text-color-primary text-[14px] font-semibold">
              Quantity{" "}
              <span className="text-xs text-color-grayPrimary text-opacity-80 font-normal">
                (maks:{cartItem.stock})
              </span>
            </h2>
            <div
              className={`flex space-x-[7px] xl:space-x-3 px-2.5 py-3 items-center border-[1px] border-[#73787B] bg-transparent w-full max-w-[60px] xl:max-w-[72px] h-[20px] rounded-sm ${
                !cartItem.available_to_rent
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
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
        </div>

        <div
          onClick={() => setShowConfirm(true)}
          className="flex self-end lg:self-start space-x-2 mt-6 lg:mt-1 hover:font-semibold hover:cursor-pointer max-w-[70px] "
        >
          <Image src={Delete} alt="delete" />
          <h2 className="text-color-primary text-[14px] mr-[6px]">Hapus</h2>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteClick}
      />
    </>
  );
};

export default ProductInCartDetail;
