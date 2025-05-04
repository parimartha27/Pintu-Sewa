"use client";
import AddressForm from "./AddressForm";
import MetodePembayaranLayout from "./MetodePembayaran";
import CheckoutProductForm from "./ProductForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { checkoutBaseUrl, customerBaseUrl } from "@/types/globalVar";
import { AddressProps, AddressResponseProps } from "@/types/address";
import {
  CheckoutAddressSkeleton,
  CheckoutPaymentDetailSkeleton,
  CheckoutShopAndItemsSkeleton,
} from "./CheckoutSkeleton";
import {
  CheckoutResponseProps,
  TransactionResponseProps,
} from "@/types/checkout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import NoCart from "@/public/noCart.svg";
import { AlertProps } from "@/types/alert";
import Alert from "../Alert";

const CheckOutBody = () => {
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [transactionIds, setTransactionIds] = useState<string[]>([]);
  const [address, setAddress] = useState<AddressProps>();
  const [checkoutDetail, setCheckoutDetail] =
    useState<TransactionResponseProps>();
  const [addressLoading, setAddressLoading] = useState(true);
  const [itemLoading, setItemLoading] = useState(true);

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const fetchCheckoutItemsAndPaymentDetail = async () => {
    try {
      const payload = {
        transaction_ids: transactionIds,
        customer_id: customerId,
      };
      const res = await axios.post<CheckoutResponseProps>(
        `${checkoutBaseUrl}/details`,
        payload
      );
      console.log(res);
      const outputSchema = res.data.output_schema;
      setCheckoutDetail(outputSchema);
      const referenceNumbers = outputSchema.transactions.map(
        (transaction) => transaction.reference_number
      );

      localStorage.setItem("referenceNo", JSON.stringify(referenceNumbers));
    } catch (e) {
      console.log(e);
    } finally {
      setItemLoading(false);
    }
  };

  useEffect(() => {
    const customerIdFromLocalStorage = localStorage.getItem("customerId");
    const transactionIdsFromLocalStorage =
      localStorage.getItem("transactionIds");

    if (customerIdFromLocalStorage) {
      setCustomerId(customerIdFromLocalStorage);
    }

    if (transactionIdsFromLocalStorage) {
      try {
        setTransactionIds(JSON.parse(transactionIdsFromLocalStorage));
      } catch (e) {
        console.error("Error parsing transaction IDs from localStorage", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!customerId || !transactionIds.length) {
      return;
    }

    const fetchAddress = async () => {
      try {
        setAddressLoading(true);
        const addressRes = await axios.get<AddressResponseProps>(
          `${customerBaseUrl}/address/${customerId}`
        );
        setAddress(addressRes.data.output_schema);
      } catch {
        setAlertState({
          isOpen: true,
          message: "Gagal mengambil data alamat",
        })
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, [customerId, transactionIds.length]);

  useEffect(() => {
    if (!customerId || !transactionIds.length) {
      return;
    }
    fetchCheckoutItemsAndPaymentDetail();
  }, [customerId, transactionIds]);

  const onRefresh = () => {
    fetchCheckoutItemsAndPaymentDetail();
  };

  if (!transactionIds.length) {
    return (
      <div className="flex flex-col space-y-6 w-full justify-center items-center py-20">
        <Image className="w-[500px] h-[372px]" src={NoCart} alt="noCart" />
        <h2 className="text-color-primary text-xl text-center font-medium">
          Kamu Belum Checkout Apapun. Yuk Pilih Barang Untuk Di Checkout
          Terlebih Dahulu.
        </h2>
        <Button className="w-[200px] lg:w-[300px] mt-7 h-[50px] font-medium rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80">
          <Link href={"/cart"}>Kembali Ke Cart</Link>
        </Button>
      </div>
    );
  }

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
      )}{" "}
      <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-color-layout p-2">
        <div className="flex flex-col">
          <div className="flex flex-col w-full mt-[28px] space-y-4">
            <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
              Pembayaran
            </h2>
            {addressLoading ? (
              <CheckoutAddressSkeleton />
            ) : (
              <AddressForm address={address as AddressProps} />
            )}
          </div>

          {itemLoading ? (
            <CheckoutShopAndItemsSkeleton />
          ) : (
            <div className="flex flex-col pb-3 pt-0 mt-8">
              {checkoutDetail?.transactions.map((transaction) => (
                <CheckoutProductForm
                  key={transaction.shop_id}
                  checkoutDetail={transaction}
                  onRefresh={onRefresh}
                />
              ))}
            </div>
          )}
        </div>
        {itemLoading ? (
          <CheckoutPaymentDetailSkeleton />
        ) : (
          <div className="mt-8">
            <MetodePembayaranLayout checkoutDetail={checkoutDetail} />
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOutBody;
