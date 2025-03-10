import InputEmailOtpForm from "@/components/layout/auth/InputEmailOtpForm";

const inputEmailOtpPage = () => {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-color-third px-2 overflow-hidden">
      <InputEmailOtpForm  />
      <div className="bg-custom-circle-gradient-bl w-5/6 rounded-full h-[170%] absolute -left-1/4 top-1/2 -translate-y-1/2"></div>
    </main>
  );
};

export default inputEmailOtpPage;
