"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import PageImage from "../../../public/inputEmailOtp.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useRef } from "react";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import axios from "axios";
import { emailValidationUrl } from "@/types/globalVar";
import { useRouter } from "next/navigation";

const InputEmailOtpForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    handleEmailOrPhoneChange,
    emailOrPhone,
    emailOrPhoneError,
    setEmailOrPhoneError,
    validateEmailOrPhone,
  } = useAuthForm();
  const [error, setError] = useState();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailOrPhoneError("");

    const error = validateEmailOrPhone(emailOrPhone);
    if (error) {
      setEmailOrPhoneError(error);
      return;
    }
    try {
      setIsLoading(true);

      const request = {
        email: emailOrPhone,
      };
      console.log("checking email req: ", request);
      const response = await axios.post(emailValidationUrl, request);

      console.log("checking email res: ", response.data);
      if (response.data.error_schema.error_code == "PS-00-000") {
        localStorage.setItem("otp_type", "reset_password");
        localStorage.setItem("email", response.data.output_schema.email);
        document.cookie = `customerId=${response.data.output_schema.customer_id}; path=/; Secure; SameSite=Lax`
        router.push("/otp");
      } else if (response.data.error_schema.error_code == "PS-00-002") {
        setError(response.data.output_schema);
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full h-full max-w-[1280px] max-h-[726px] mx-auto z-10">
      <Card className="w-full h-[600px] flex justify-center items-center p-1 md:p-5 rounded-3xl">
        <div className="hidden lg:block lg:w-1/2 self-center">
          <Image
            src={PageImage}
            width={500}
            height={400}
            alt="auth"
            className="justify-self-center object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2">
          <CardHeader className="flex-col">
            <CardTitle className="text-[22px] lg:text-[24px] xl:text-[28px] text-color-primaryDark font-semibold">
              Reset Password
            </CardTitle>
            <CardDescription className="text-[14px] xs:text-[15px] sm:text-[16px] md:text-[14px] lg:text-[16px] xl:text-[20px] text-color-primary font-normal font-sans">
              Yuk input email atau nomor hp dulu
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 xs:gap-3 sm:gap-4 mb-5">
                <div className="grid gap-1 xs:gap-2">
                  <Label
                    htmlFor="emailOrPhone"
                    className={`${
                      emailOrPhoneError ? "text-red-500" : ""
                    } text-[12px] lg:text-[14px] xl:text-[16px] mt-3 md:mt-4`}
                  >
                    Email
                  </Label>
                  <Input
                    ref={inputRef}
                    className={cn(
                      "h-[50px] xs:h-[54px] md:h-[48px] text-[13px] xs:text-[14px] sm:text-[15px] md:text-[14px] lg:text-[16px]",
                      "text-color-grayPrimary font-normal border-2 rounded-xl focus:ring-2 p-6",
                      emailOrPhoneError
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-400"
                    )}
                    id="emailOrPhone"
                    type="text"
                    placeholder="Masukkan email"
                    value={emailOrPhone}
                    onChange={handleEmailOrPhoneChange}
                  />
                  {emailOrPhoneError && (
                    <p className="text-red-500 text-[10px] lg:text-[12px] xl:text-[14px] mt-1">
                      {emailOrPhoneError}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 text-[10px] lg:text-[12px] xl:text-[14px] mt-1">
                      {error}
                    </p>
                  )}
                </div>

                {isLoading && (
                  <div className="flex justify-center items-center space-x-6">
                    <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-color-primaryDark"></div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-[50px] xs:h-[54px] md:h-[48px] rounded-xl mt-3 text-[14px] xs:text-[15px] sm:text-[16px] md:text-[15px] lg:text-[17px] xl:text-[18px] bg-custom-gradient-tr hover:opacity-80"
                  disabled={isLoading}
                >
                  Selanjutnya
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default InputEmailOtpForm;
