import AuthForm from "@/components/layout/auth/AuthForm";
import RightCircleBackgroundLayout from "@/components/layout/RightCircleBackground";

const RegisterPage = () => {
  return (
    <RightCircleBackgroundLayout>
      <AuthForm type="register" className="relative z-10" />
    </RightCircleBackgroundLayout>
  );
};

export default RegisterPage;
