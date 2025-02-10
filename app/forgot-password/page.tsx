"use client";

import { ForgotPasswordForm } from "@/components/layout/auth/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-color-third px-2 overflow-hidden">
      <ForgotPasswordForm className="relative z-10" />
      <div className="bg-custom-circle-gradient-bl w-5/6 rounded-full h-[170%] absolute -left-1/4 top-1/2 -translate-y-1/2"></div>
    </main>
  );
};

export default ForgotPasswordPage;
