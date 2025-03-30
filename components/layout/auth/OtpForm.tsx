"use client";

import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { cn } from "@/lib/utils";
import Image from "next/image";
import OtpShield from "../../../public/otp-shield.svg";
import OtpImage from "../../../public/otp.svg";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

interface OtpFormProps {
  className?: string;
}

const OtpForm = ({ className }: OtpFormProps) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const [timer, setTimer] = useState(30);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const email = typeof window !== "undefined" ? localStorage.getItem("email") : null;
  const phoneNumber = typeof window !== "undefined" ? localStorage.getItem("phone_number") : null;
  const storedOtp = typeof window !== "undefined" ? localStorage.getItem("otp") : null; 

  const otpSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otp === storedOtp) {
      console.log("OTP valid, mengarahkan ke dashboard...");
      window.location.href = "/editProfile"; 
    } else {
      setError("OTP yang diinput tidak sesuai"); 
    }

    setIsLoading(false); 
  };

  const handleResendOtp = () => {
    console.log("Kirim ulang OTP...");
    setTimer(30);
    setIsResendDisabled(true);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  return (
    <div
      className={cn(
        "flex justify-center w-full h-full max-w-[1280px] max-h-[726px] mx-auto",
        className
      )}
    >
      <Card className="w-full flex p-1 md:p-5 rounded-3xl">
        <div className="hidden md:block md:w-3/5 self-center">
          <Image
            src={OtpImage}
            width={500}
            height={400}
            alt="auth"
            className="justify-self-center object-contain"
          />
        </div>

        <div className="w-full md:w-2/5 p-7">
          <CardHeader className="flex flex-col items-center">
            <Image
              src={OtpShield}
              width={67}
              height={77}
              alt="auth"
              className="justify-self-center object-contain"
            />
            <CardTitle>
              <h2 className="text-[18px] lg:text-[24px] xl:text-[32px] text-center font-semibold mt-2 text-color-primary text-nowrap">
                Enter The Verification Code
              </h2>
            </CardTitle>
            <CardDescription className="text-[12px] xs:text-[15px] sm:text-[16px] md:text-[14px] lg:text-[16px] xl:text-[20px] text-color-primary ">
              <h4 className="text-center  mt-2">
                Verification code sent via {email ? "email" : "WhatsApp"}{" "}
                to {email || phoneNumber}
              </h4>
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-center justify-center w-full mt-2">
            <form
              onSubmit={otpSubmitHandler}
              className="w-full flex flex-col items-center"
            >
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPSlot
                  index={0}
                  className="w-12 h-12 text-[#73787B] text-center outline-none"
                />
                <InputOTPSlot
                  index={1}
                  className="w-12 h-12 text-[#73787B] text-center outline-none"
                />
                <InputOTPSlot
                  index={2}
                  className="w-12 h-12 text-[#73787B] text-center outline-none"
                />
                <InputOTPSlot
                  index={3}
                  className="w-12 h-12 text-[#73787B] text-center outline-none"
                />
              </InputOTP>

              {error && (
                <p className="text-red-600 text-md mt-3 ">
                  {error}
                </p>
              )}

              {isLoading && (
                <div className="flex justify-center items-center mt-5">
                  <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-color-primaryDark"></div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full max-w-[440px] mt-10 h-[50px] rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80"
                disabled={isLoading || otp.length !== 4}
              >
                Konfirmasi
              </Button>
            </form>

            <div className="mt-5 text-[11px] xs:text-[12px] sm:text-[13px] md:text-[12px] lg:text-[14px] xl:text-[15px] text-color-primary text-center">
              {isResendDisabled ? (
                <h4>
                  Tunggu <span className="font-bold text-color-secondary">{timer} detik</span> untuk
                  <span className="font-bold text-color-secondary">{" "}kirim ulang</span>
                </h4>
              ) : (
                <h4>
                  Tidak menerima OTP?{" "}
                  <button
                    onClick={handleResendOtp}
                    className="text-color-primaryDark font-semibold hover:opacity-80"
                  >
                    <span className="font-bold text-color-secondary">kirim ulang</span>
                  </button>
                </h4>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default OtpForm;