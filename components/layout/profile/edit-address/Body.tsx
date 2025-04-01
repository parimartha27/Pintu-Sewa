"use client";

import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import EditProfileForm from "../Form";
import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown";
import { Button } from "@/components/ui/button";

const EditAddressBody = () => {
  return (
    <div className="flex w-full h-auto pb-12 md:pb-[462px]">
      <EditProfileForm title="Edit Alamat">
        <form onSubmit={() => alert("Perubahan Disimpan")} className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full">
          <div className="flex flex-col space-y-5 lg:w-1/2">
            <LabelledInput
              label="Jalan"
              htmlFor="jalan"
              id="jalan"
              type="text"
            />
            <LabelledDropdown
              label="Kabupaten"
              htmlFor="kabupaten"
              id="kabupaten"
              options={[
                { value: "Badung", label: "Badung" },
                { value: "Himalaya", label: "Himalaya" },
                { value: "Cabala", label: "Cabala" },
              ]}
            />
            <LabelledInput
              label="Kode Pos"
              htmlFor="kode-pos"
              id="kode-pos"
              type="text"
            />
            <Button
              type="submit"
              className="hidden lg:block w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90"
            >
              Simpan Perubahan
            </Button>
          </div>
          <div className="flex flex-col space-y-5 lg:w-1/2">
            <LabelledDropdown
              label="Kecamatan"
              htmlFor="kecamatan"
              id="kecamatan"
              options={[
                { value: "Badung", label: "Badung" },
                { value: "Himalaya", label: "Himalaya" },
                { value: "Cabala", label: "Cabala" },
              ]}
            />
            <LabelledDropdown
              label="Provinsi"
              htmlFor="provinsi"
              id="provinsi"
              options={[
                { value: "Badung", label: "Badung" },
                { value: "Himalaya", label: "Himalaya" },
                { value: "Cabala", label: "Cabala" },
              ]}
            />
            <LabelledInput
              label="Catatan"
              htmlFor="catatan"
              id="catatan"
              type="text"
            />
              <Button
              type="submit"
              className="lg:hidden self-center lg:self-start w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </EditProfileForm>
    </div>
  );
};

export default EditAddressBody;
