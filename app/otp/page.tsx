"use client";
import OtpForm from "@/components/layout/auth/OtpForm";
import RightCircleBackgroundLayout from "@/components/layout/RightCircleBackground";

const OtpPage = () => {
  return (
    <RightCircleBackgroundLayout>
      <OtpForm className="relative z-10" />
    </RightCircleBackgroundLayout>
  );
};

export default OtpPage;
