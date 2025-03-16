"use client";

import InputBiodataContent from "@/components/layout/inputInformation/inputBiodata/InputBiodataContent";
import InputInformationForm from "@/components/layout/inputInformation/InputInformationForm";
import LeftCircleBackgroundLayout from "@/components/layout/LeftCircleBackground";

const InputBiodataPage = () => {
  return (
    <LeftCircleBackgroundLayout>
      <InputInformationForm step={1}>
        <InputBiodataContent />
      </InputInformationForm>
    </LeftCircleBackgroundLayout>
  );
};

export default InputBiodataPage;
