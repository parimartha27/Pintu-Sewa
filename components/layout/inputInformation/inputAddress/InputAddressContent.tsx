"use client"

import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InputAddressContentLayout = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={() => alert("Perubahan Disimpan")}
      className="flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full"
    >
      <div className="flex flex-col space-y-5 lg:w-1/2">
        <LabelledInput label="Jalan" htmlFor="jalan" id="jalan" type="text" />
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
        <div className="flex space-x-6">
          <Button
            type="submit"
            className="hidden lg:block w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr rounded-xl hover:opacity-90"
          >
            Simpan
          </Button>
          <Button
            type="button"
            onClick={()=>router.push("/input-biodata")}
            className="hidden lg:block w-[200px] h-[48px] mt-3 text-color-primaryDark text-[14px] font-medium bg-transparent border-[1px] border-color-primaryDark rounded-xl hover:bg-slate-200 hover:opacity-90"
          >
            Kembali
          </Button>
        </div>
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
        <div className="flex justify-between max-w-[430px]">
          <Button
            type="submit"
            className="lg:hidden w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr rounded-xl hover:opacity-90"
          >
            Simpan
          </Button>
          <Button
           type="button"
           onClick={()=>router.push("/input-biodata")}
            className="lg:hidden w-[200px] h-[48px] mt-3 text-[14px] font-medium text-color-primaryDark bg-transparent border-[1px] border-color-primaryDark rounded-xl hover:bg-slate-200 hover:opacity-90"
          >
            Kembali
          </Button>
        </div>
      </div>
    </form>
  );
};

export default InputAddressContentLayout;
