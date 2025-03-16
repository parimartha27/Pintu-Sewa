"use client";

import InputAddressContent from "@/components/layout/inputInformation/inputAddress/InputAddressContent";
import InputInformationForm from "@/components/layout/inputInformation/InputInformationForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";
const InputAddressPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <InputInformationForm step={2}>
        <InputAddressContent />
      </InputInformationForm>
    </LeftCircleBackgroundLayout>
  );
};

export default InputAddressPage;
