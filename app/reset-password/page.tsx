"use client";

import ForgotPasswordForm from "@/components/layout/auth/ForgotPasswordForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";

const ForgotPasswordPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <ForgotPasswordForm className="relative z-10" />
    </LeftCircleBackgroundLayout>
  );
};

export default ForgotPasswordPage;
