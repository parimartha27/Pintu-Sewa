"use client";
import { OtpForm } from "@/components/layout/auth/OtpForm";

const OtpPage = () => {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-color-third px-8 overflow-hidden">
      <div className="bg-custom-circle-gradient-br w-5/6 rounded-full h-[170%] absolute -right-1/4 top-1/2 -translate-y-1/2"></div>
      <OtpForm className="relative z-10" />
    </main>
  );
};

export default OtpPage;
