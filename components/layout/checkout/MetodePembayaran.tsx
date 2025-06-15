import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import BCA from "@/public/BCA.svg";
import BRI from "@/public/BRI.svg";
import BNI from "@/public/BNI.svg";
import PintuSewaWallet from "@/public/pintuSewa.svg";
import Gopay from "@/public/gopay.jpg";
import Ovo from "@/public/ovo.jpg";
import Money from "@/public/money.svg";
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TransactionResponseProps } from "@/types/checkout";
import { formatToRupiah } from "@/hooks/useConvertRupiah";
import { useRouter } from "next/navigation";
import { AlertProps } from "@/types/alert";
import Alert from "../Alert";
import { useEffect, useState } from "react";
import axios from "axios";
import { transactionDetailBaseUrl } from "@/types/globalVar";

const MetodePembayaranLayout = ({
  checkoutDetail,
}: {
  checkoutDetail?: TransactionResponseProps;
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const router = useRouter();

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const processPayment = async () => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("referenceNo")
          : null;
      const referenceNumbers: string[] = stored ? JSON.parse(stored) : [];
      const payload = {
        reference_numbers: referenceNumbers,
      };
      const response = await axios.patch(
        `${transactionDetailBaseUrl}/process`,
        payload
      );

      if (response.data.error_schema.error_code === "PS-00-000") {
        router.push("/payment");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
    }
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      setAlertState({
        isOpen: true,
        message: "Pilih Metode Pembayaran Terlebih Dahulu!",
      });
      return;
    }

    localStorage.setItem("paymentMethod", selectedMethod);
    localStorage.setItem(
      "grandTotalPayment",
      checkoutDetail?.grand_total_payment?.toString() ?? "0"
    );

    processPayment();
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
      <Card className="px-2 md:px-6 mb-[224px]">
        <CardHeader className="flex flex-col items-center md:flex-row md:justify-between px-0">
          <h2 className="text-md font-semibold text-color-primary">
            Metode Pembayaran
          </h2>
          {/* <h3 className="text-sm font-medium text-color-secondary hover:opacity-70 hover:cursor-pointer">
        Lihat Semua
      </h3> */}
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-0 pb-7 pt-[18px] md:pt-0 border-t-[1px] border-t-[#D9D9D9]">
          <div className="flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3">
            <MetodePembayaranFragments
              nama="BCA Virtual Account"
              gambar={BCA}
              isSelected={selectedMethod === "BCA Virtual Account"}
              onSelect={() => setSelectedMethod("BCA Virtual Account")}
            />

            <MetodePembayaranFragments
              nama="BRI Virtual Account"
              gambar={BRI}
              isSelected={selectedMethod === "BRI Virtual Account"}
              onSelect={() => setSelectedMethod("BRI Virtual Account")}
            />

            <MetodePembayaranFragments
              nama="BNI Virtual Account"
              gambar={BNI}
              isSelected={selectedMethod === "BNI Virtual Account"}
              onSelect={() => setSelectedMethod("BNI Virtual Account")}
            />
          </div>

          <div className="flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]">
            <MetodePembayaranFragments
              nama="Pintu Sewa Wallet"
              gambar={PintuSewaWallet.src}
              isSelected={selectedMethod === "Pintu_Sewa_Wallet"}
              onSelect={() => setSelectedMethod("Pintu_Sewa_Wallet")}
            />

            <MetodePembayaranFragments
              nama="Gopay"
              gambar={Gopay.src}
              isSelected={selectedMethod === "Gopay"}
              onSelect={() => setSelectedMethod("Gopay")}
            />

            <MetodePembayaranFragments
              nama="Ovo"
              gambar={Ovo.src}
              isSelected={selectedMethod === "Ovo"}
              onSelect={() => setSelectedMethod("Ovo")}
            />
          </div>
        </CardContent>
        <CardFooter className="p-0 pt-[18px] pb-7 border-t-[1px] border-t-[#D9D9D9] justify-center md:justify-end">
          <div className="flex-col max-w-[500px] w-full space-y-[14px]">
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                  Subtotal untuk Produk
                </h3>
              </div>
              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.sub_total_product_price) ||
                  "gratis"}
              </h3>
            </div>

            <div className="flex justify-between">
              <div className="flex space-x-2">
                <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                  Subtotal Ongkos Kirim{" "}
                </h3>
              </div>
              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.sub_total_shipping_cost) ||
                  "gratis"}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-color-primary text-[12px] md:text-sm">
                Subtotal Deposit
              </h3>

              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.sub_total_deposit) || "gratis"}
              </h3>
            </div>
            <div className="flex justify-between">
              <h3 className="text-color-primary text-[12px] md:text-sm">
                Biaya Layanan
              </h3>

              <h3 className="text-color-primary text-[12px] md:text-sm font-semibold">
                {formatToRupiah(checkoutDetail?.service_fee) || "gratis"}
              </h3>
            </div>

            <div className="flex justify-between pb-10">
              <h3 className="text-color-primary text-[12px] md:text-sm max-w-[110px] sm:max-w-full">
                Total Pembayaran
              </h3>

              <h3 className="text-color-secondary text-[14px] lg:text-lg font-bold">
                {formatToRupiah(checkoutDetail?.grand_total_payment) ||
                  "gratis"}
              </h3>
            </div>
            <Button
              className="flex justify-self-center md:justify-self-end w-full max-w-[320px] xl:h-[54px] rounded-xl hover:opacity-80 bg-custom-gradient-tr"
              onClick={handlePayment}
            >
              <Image
                src={Money}
                alt="money"
                className="w-5 h-3 xl:w-5 xl:h-5"
              />
              <h4 className="text-[12px] xl:text-lg font-medium ">Bayar</h4>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default MetodePembayaranLayout;
