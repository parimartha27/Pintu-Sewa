"use client";

import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfileSidebarLayout from "../../ProfileSidebar";
import BCA from "@/public/BCA.svg";
import BRI from "@/public/BRI.svg";
import BNI from "@/public/BNI.svg";
import CimbNiaga from "@/public/cimbNiaga.jpg";
import Gopay from "@/public/gopay.jpg";
import Ovo from "@/public/ovo.jpg";
import Money from "@/public/money.svg";
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundBack } from "react-icons/io";
import { AlertProps } from "@/types/alert";
import Alert from "../../Alert";

const TopupBody = () => {
  const [amount, setAmount] = useState<string>("");

  return (
    <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout">
      <ProfileSidebarLayout />
      <div className="w-full p-2 md:p-0 max-h-auto">
        <h1 className="font-semibold text-color-primary text-[28px] pb-2">
          My Wallet
        </h1>

        <Link href="/wallet">
          <span className="flex items-center text-color-secondary hover:cursor-pointer hover:opacity-70">
            <IoIosArrowRoundBack className="mr-1" size={28} />
            Kembali
          </span>
        </Link>

        <TopupInput amount={amount} setAmount={setAmount} />
        <MetodeTopup amount={amount} />
      </div>
    </div>
  );
};

export default TopupBody;

interface TopupInputProps {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
}

function TopupInput({ amount, setAmount }: TopupInputProps) {
  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);

    if (value && parseInt(value) < 10000) {
      setError("Minimal topup adalah 10 Ribu");
    } else {
      setError("");
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(parseInt(value));
  };

  return (
    <main className="w-full py-6">
      <div className="flex flex-col gap-8 w-full h-full">
        <div className="space-y-2 w-full">
          <Card className="w-full">
            <CardHeader className="items-center justify-between px-4 md:px-6">
              <CardTitle className="text-md w-full font-semibold  border-b-[#D9D9D9]">
                Topup Saldo Wallet
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col w-full">
                <p className="text-color-primary pb-4">Nominal</p>
                <form className="w-auto">
                  <div className="relative h-[40px]">
                    <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                      <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                        Rp
                      </p>
                    </div>
                    <input
                    maxLength={13}
                      type="text"
                      className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                        placeholder:text-color-primary text-[12px] rounded-lg 
                        focus:ring-1 focus:ring-color-primaryDark focus:outline-none
                        focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                      placeholder="0"
                      value={formatAmount(amount)}
                      onChange={handleAmountChange}
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p>
                  )}
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

interface PaymentMethod {
  id: string;
  name: string;
  logo: unknown;
  description?: string;
}

function MetodeTopup({ amount }: { amount: string }) {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const paymentMethods: PaymentMethod[] = [
    { id: "BCA Virtual Account", name: "BCA Virtual Account", logo: BCA },
    { id: "BRI Virtual Account", name: "BRI Virtual Account", logo: BRI },
    { id: "BNI Virtual Account", name: "BNI Virtual Account", logo: BNI },
    { id: "CIMB Niaga", name: "CIMB Niaga", logo: CimbNiaga.src },
    { id: "Gopay", name: "Gopay", logo: Gopay.src },
    { id: "Ovo", name: "Ovo", logo: Ovo.src },
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    localStorage.setItem("paymentMethod", methodId);
  };

  const handlePayment = () => {
    if (!amount || parseInt(amount) < 10000) {
      setAlertState({
        isOpen: true,
        message: "Minimal Topup Adalah Rp 10.000",
      })
      return;
    }

    if (!selectedMethod) {
      setAlertState({
        isOpen: true,
        message: "Silakan Pilih Metode Pembayaran Terlebih Dahulu",
      })
      return;
    }

    localStorage.setItem("topupAmount", amount);
    router.push("/wallet/topup/confirmation");
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
      <Card className="px-2 md:px-6 mb-6">
        <CardHeader className="px-0 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-color-primary">
            Metode Topup
          </h2>
        </CardHeader>

        <CardContent className="p-0 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                onClick={() => handleMethodSelect(method.name)}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <MetodePembayaranFragments
                  nama={method.name}
                  gambar={method.logo}
                  isSelected={selectedMethod === method.id}
                />
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt- pl-0">
          <Button
            onClick={handlePayment}
            disabled={!selectedMethod || !amount || parseInt(amount) < 10000}
            className="w-full max-w-[200px] xl:h-[48px] rounded-xl hover:opacity-80 bg-custom-gradient-tr disabled:opacity-50"
          >
            <Image src={Money} alt="money" className="w-5 h-5 mr-2" />
            <span>Bayar</span>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
