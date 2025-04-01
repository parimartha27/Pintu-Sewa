import AuthenticationStepNavigation from "@/components/fragments/input-information/AuthenticationStepNavigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const InputInformationForm = ({ children, step }: { children: React.ReactNode; step: number }) => {

  return (
    <Card className="relative z-10 px-10 md:px-20 py-10 w-full max-w-[1280px] my-8">
      <CardHeader className="flex justify-between items-center px-0">
        <h2 className="text-2xl w-full lg:text-[28px] font-semibold text-color-primary text-center lg:text-start">
          Yuk Lengkapi Profil Kamu!
        </h2>
        <AuthenticationStepNavigation step={step} />
      </CardHeader>
      <CardContent className="w-full border-t-[1px] border-[#D9D9D9] pt-8 px-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default InputInformationForm;
