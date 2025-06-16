"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { transactionDetailBaseUrl, walletBaseUrl } from "@/types/globalVar";
import axios from "axios";
import PaymentStepModals from "./PaymentStepModals";
import LoadingPopup from "../LoadingPopUp";
import SuccessPaymentModals from "./SuccessPaymentModals";
import { AlertProps } from "@/types/alert";
import Alert from "../Alert";
import { useAuth } from "@/hooks/auth/useAuth";

const PaymentBody = () => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft] = useState<string>("");
  const [paymentData, setPaymentData] = useState({
    deadline: "",
    method: "Unknown Method",
    accountNumber: "",
    totalAmount: "0",
  });
  const [isPaymentStepOpen, setIsPaymentStepOpen] = useState(false);
  const [isSuccessPaymentOpen, setIsSuccessPaymentOpen] = useState(false);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const { customerId } = useAuth();

  const generateAccountNumber = (method: string) => {

    const prefixes: Record<string, string> = {
      "BCA Virtual Account": "1234",
      "BRI Virtual Account": "5678",
      "BNI Virtual Account": "9012",
    };
    const randomSuffix = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0");
    return prefixes[method]
      ? prefixes[method] + randomSuffix
      : "1234" + randomSuffix;
  };

  useEffect(() => {
    const storedAmount = localStorage.getItem("grandTotalPayment") || "0";
    const storedMethod =
      localStorage.getItem("paymentMethod") || "Unknown Method";

    const formattedDeadline =
      new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
      }) + " WIB";

    setPaymentData({
      deadline: formattedDeadline,
      method: storedMethod,
      accountNumber: generateAccountNumber(storedMethod),
      totalAmount: new Intl.NumberFormat("id-ID").format(
        parseInt(storedAmount)
      ),
    });

    localStorage.setItem(
      "paymentData",
      JSON.stringify({
        deadline: formattedDeadline,
        method: storedMethod,
        accountNumber: generateAccountNumber(storedMethod),
        totalAmount: storedAmount,
        generatedAt: new Date().toISOString(),
      })
    );
  }, []);

  const handleCheckStatus = async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("referenceNo");
      const referenceNumbers: string[] = stored ? JSON.parse(stored) : [];
      const totalAmount = paymentData.totalAmount.replace(/\./g, "");
      const payload = {
        reference_numbers: referenceNumbers,
        payment_method:paymentData.method,
        customer_id:customerId,
        amount: parseInt(localStorage.getItem("grandTotalPayment") || "0"),
      };
      const response = await axios.patch(
        `${transactionDetailBaseUrl}/payment`,
        payload
      );

      if (response.data.error_schema.error_code === "PS-00-000") {
        localStorage.removeItem("grandTotalPayment");
        localStorage.removeItem("paymentMethod");
        localStorage.removeItem("paymentData");
        localStorage.removeItem("transactionIds");
        localStorage.removeItem("referenceNo");
        setIsSuccessPaymentOpen(true);
      }else if(response.data.error_schema.error_code === "PS-99-999"){
        setAlertState({
        isOpen: true,
        message: "Pembayaran Gagal, Periksa Saldo Anda",
      });
      }

    } catch (error) {
      setAlertState({
        isOpen: true,
        message: "Pembayaran Gagal, Silahkan Coba Lagi",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBankLogo = (method: string) => {
    const logos: Record<string, string> = {
      "BCA Virtual Account": "/BCA.svg",
      "BRI Virtual Account": "/BRI.svg",
      "BNI Virtual Account": "/BNI.svg",
      "Pintu_Sewa_Wallet": "/pintuSewa.svg",
      Ovo: "/ovo.jpg",
      Gopay: "/gopay.jpg",
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
      <PaymentStepModals
        isOpen={isPaymentStepOpen}
        onClose={() => setIsPaymentStepOpen(false)}
      />
      <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-3 md:px-6 md:pt-12 max-w-[1400px] space-y-4 md:space-y-0 md:space-x-8 bg-color-layout">
        <div className="w-full p-2 md:p-0">
          <h1 className="font-semibold text-color-primary text-[24px] md:text-[28px] text-center md:text-start">
            Pembayaran
          </h1>

          <main className="w-full py-6 md:py-8">
            <div className="flex flex-col gap-6 md:gap-8 w-full h-full">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold text-color-primary">
                    Batas akhir pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-base md:text-lg text-color-primary">
                      {paymentData.deadline}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full">
                <CardHeader className="flex flex-col md:flex-row md:items-center border-b p-0 mx-6 py-6 md:justify-between space-y-2 md:space-y-0">
                  <CardTitle className="text-lg md:text-xl font-semibold text-color-primary  w-full">
                    {paymentData.method === "Pintu_Sewa_Wallet" ? "Pintu Sewa Wallet" : paymentData.method}
                  </CardTitle>
                  <div className="hidden md:flex items-center justify-center w-[200px] h-[40px] ">
                    <Image
                      src={getBankLogo(paymentData.method)}
                      alt={`${paymentData.method} Logo`}
                      width={48}
                      height={24}
                      className="w-[100px] h-[100px] py-4"
                    />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-5">
                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-500">
                      Nomor Virtual Account
                    </p>
                    <div className="flex flex-row justify-between sm:items-center gap-2">
                      <p className="text-lg font-medium text-color-primary break-all">
                        {paymentData.accountNumber}
                      </p>
                      <button
                        onClick={handleCopy}
                        className="text-color-secondary font-medium hover:underline text-sm md:text-base"
                      >
                        {copied ? "Disalin" : "Salin"}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm md:text-base text-gray-500">
                      Total Pembayaran
                    </p>
                    <p className="text-[20px] md:text-[24px] font-semibold text-color-secondary">
                      Rp{paymentData.totalAmount}
                    </p>
                  </div>

                  <div className="pt-4 text-center border-t">
                    <p
                      onClick={() => setIsPaymentStepOpen(true)}
                      className="font-medium text-color-secondary hover:underline cursor-pointer text-sm md:text-base"
                    >
                      Lihat Cara Pembayaran
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-6 py-6">
                  <p className="text-base md:text-lg text-gray-600 text-center md:text-start">
                    Silakan lakukan pembayaran segera agar proses sewa dapat
                    dilakukan
                  </p>
                  <Button
                    onClick={handleCheckStatus}
                    className="w-full h-8 md:h-10 bg-custom-gradient-tr text-white px-4 py-6 rounded-lg hover:bg-color-secondary transition-colors hover:opacity-80 text-sm md:text-base"
                    disabled={
                      isLoading || timeLeft === "Waktu pembayaran telah habis"
                    }
                  >
                    {isLoading ? "Memproses..." : "Bayar"}
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

export default PaymentBody;
