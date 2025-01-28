import {OtpForm} from "@/components/layout/auth/OtpForm";

const OtpPage = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-color-third px-8">
      <div className="bg-custom-circle-gradient-br w-5/6 rounded-full h-[calc(100vh*1.7)] absolute -right-1/4"></div>
        <OtpForm className="relative z-10"/>
    </main>
  );
};

export default OtpPage;
