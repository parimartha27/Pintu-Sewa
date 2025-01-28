"use client";

import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Card } from "@/components/ui/card";

export function OtpForm({className: string}) {
  const clickHandler = () => {
    console.log("Validating");
    window.location.href = "/";
  };

  return (
    <>
      <Card className="w-2/5 h-full flex flex-col justify-center items-center p-5 rounded-3xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-color-primaryDark">
          OTP Authentication
        </h2>
        <h4 className="text-color-grayPrimary mt-2 mb-8 text-xs sm:text-md md:text-lg">
          Enter the OTP sent to your SMS or Email
        </h4>
        <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup className="text-color-primaryDark">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          className="bg-color-primaryDark mt-8 hover:opacity-80 hover:bg-blue-950"
          onClick={clickHandler}
        >
          Verify
        </Button>
      </Card>
    </>
  );
}
