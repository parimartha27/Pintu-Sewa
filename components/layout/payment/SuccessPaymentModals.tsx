"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Success from "@/public/success.svg";
import { useRouter } from "next/navigation";

const SuccessPaymentModals = () => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative z-10 w-[90%] max-w-md p-4 rounded-2xl">
        <Card className="w-[400px] h-[360px] lg:w-[540px] lg:h-[500px] p-4 shadow-xl rounded-lg bg-white pt-10 ">
          <CardContent className="flex flex-col items-center justify-between h-full">
            <h3 className="text-xl lg:text-2xl font-bold text-color-primaryDark text-center">
              SELAMAT PEMBAYARAN BERHASIL
            </h3>
            <Image
              width={198}
              height={198}
              src={Success}
              alt="success"
              className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] self-center"
            />
            <p
              onClick={() => router.push("/")}
              className="text-sm text-color-primaryDark hover:opacity-70 hover:cursor-pointer"
            >
              Kembali Ke Dashboard
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessPaymentModals;
