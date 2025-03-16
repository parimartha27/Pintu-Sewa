import InputConfirmationContentLayout from "@/components/layout/inputInformation/inputConfirmation/InputConfirmationContent";
import InputInformationForm from "@/components/layout/inputInformation/InputInformationForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";

const InputConfirmationPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <InputInformationForm step={3}>
        <InputConfirmationContentLayout/>
      </InputInformationForm>
    </LeftCircleBackgroundLayout>
  );
};

export default InputConfirmationPage;
