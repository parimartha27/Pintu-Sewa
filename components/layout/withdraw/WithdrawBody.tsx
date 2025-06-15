"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPopup from "../LoadingPopUp";
import SuccessPaymentModals from "../payment/SuccessPaymentModals";
import { AlertProps } from "@/types/alert";
import Alert from "../Alert";
import { useAuth } from "@/hooks/auth/useAuth";
import { walletBaseUrl } from "@/types/globalVar";
import { useRouter } from "next/navigation";

const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

const WithdrawBody = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [shopId, setShopId] = useState<string | null>(null);
  const [storedAmount, setStoredAmount] = useState<string>("0");
  const [paymentData, setPaymentData] = useState({
    method: "Unknown Method",
    accountNumber: "",
    totalAmount: "0",
  });
  const [isSuccessPaymentOpen, setIsSuccessPaymentOpen] = useState(false);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });
  const [timeLeft, setTimeLeft] = useState(7200);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const amount = localStorage.getItem("amountWithdraw") || "0";
      const method = localStorage.getItem("withdrawMethod") || "Unknown Method";
      const accountNumber = localStorage.getItem("accountNumberWithdraw") || "";
      const shopId = localStorage.getItem("shopId") || null;

      setStoredAmount(amount);
      setShopId(shopId);

      setPaymentData({
        method,
        accountNumber,
        totalAmount: new Intl.NumberFormat("id-ID").format(parseInt(amount)),
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const handleCheckStatus = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${walletBaseUrl}/withdraw?shopId=${shopId}&amount=${storedAmount}`
      );
      if (response.data.error_schema.error_code === "PS-00-000") {
        localStorage.removeItem("accountNumberWithdraw");
        localStorage.removeItem("amountWithdraw");
        localStorage.removeItem("withdrawMethod");
        setIsSuccessPaymentOpen(true);
      } else {
        setAlertState({
          isOpen: true,
          message: "Withdraw Gagal, Coba Periksa Amount Wallet Kamu",
          isWrong: true,
        });
      }
    } catch (error) {
      setAlertState({
        isOpen: true,
        message: "Withdraw Gagal, Silahkan Coba Lagi",
        isWrong: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getBankLogo = (method: string) => {
    const logos: Record<string, string> = {
      "Bank BCA": "/BCA.svg",
      "Bank BRI": "/BRI.svg",
      "Bank BNI": "/BNI.svg",
    };
    return logos[method] || "/BCA.svg";
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

      {isSuccessPaymentOpen && <SuccessPaymentModals />}
      {isLoading && <LoadingPopup />}

      <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-3 md:px-6 md:pt-12 max-w-[1400px] space-y-4 md:space-y-0 md:space-x-8 bg-color-layout">
        <div className="w-full p-2 md:p-0">
          <h1 className="font-semibold text-color-primary text-[24px] md:text-[28px] text-center md:text-start">
            Penarikan Saldo
          </h1>

          <main className="w-full py-6 md:py-8">
            <div className="flex flex-col gap-6 md:gap-8 w-full h-full">
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center border-b p-0 mx-6 py-6 md:justify-between space-y-2 md:space-y-0">
                  <CardTitle className="text-lg md:text-xl font-semibold text-color-primary w-full">
                    Waktu Proses Pengembalian Dana
                  </CardTitle>
                  <div className="text-[18px] font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </div>
                </CardHeader>
              </Card>

              <Card className="w-full">
                <CardHeader className="flex flex-col md:flex-row md:items-center border-b p-0 mx-6 py-6 md:justify-between space-y-2 md:space-y-0">
                  <CardTitle className="text-lg md:text-xl font-semibold text-color-primary w-full">
                    {paymentData.method}
                  </CardTitle>
                  <div className="hidden md:flex items-center justify-center w-[200px] h-[40px] ">
                    <Image
                      src={getBankLogo(paymentData.method)}
                      alt={`${paymentData.method} Logo`}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] py-4"
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-5">
                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-500">
                      Nomor Virtual Account
                    </p>
                    <p className="text-[16px] font-medium text-color-primary">
                      {paymentData.accountNumber}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-500">
                      Total Penarikan
                    </p>
                    <p className="text-[20px] md:text-[24px] font-semibold text-color-secondary">
                      Rp{paymentData.totalAmount}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-6 py-6">
                  <Button
                    onClick={handleCheckStatus}
                    className="w-full h-8 md:h-10 bg-custom-gradient-tr text-white px-4 py-6 rounded-lg hover:bg-color-secondary transition-colors hover:opacity-80 text-sm md:text-base"
                    disabled={isLoading || timeLeft === 0}
                  >
                    {isLoading ? "Memproses..." : "Tarik Saldo"}
                  </Button>
                  {timeLeft === 0 && (
                    <p className="text-center text-sm text-red-500 font-medium">
                      Waktu penarikan telah habis.
                    </p>
                  )}
                  <Button
                    onClick={() => router.push("/dashboard-seller")}
                    className="w-full h-8 md:h-10 bg-custom-gradient-tr text-white px-4 py-6 rounded-lg hover:bg-color-secondary transition-colors hover:opacity-80 text-sm md:text-base"
                  >
                    Kembali
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default WithdrawBody;
