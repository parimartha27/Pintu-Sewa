"use client";
import AuthForm from "@/components/layout/auth/AuthForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";

const LoginPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <AuthForm type="login" className="relative z-10" />
    </LeftCircleBackgroundLayout>
  );
};

export default LoginPage;
