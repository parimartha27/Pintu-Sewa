"use client";

import Link from "next/link";
import Image from "next/image";
import Guest from "@/public/guest.svg";
import InputtedData from "@/components/fragments/input-information/InputtedData";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InputConfirmationContentLayout = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row-reverse w-full space-y-5">
      <div className="flex flex-col items-center w-full space-y-6 mt-5">
        <Link href={""}>
          <Image
            className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px]"
            src={Guest}
            alt=""
          />
        </Link>
      </div>

      <div className="flex flex-col w-full pt-6 lg:pt-0 ">
        <form
          onSubmit={() => alert("Perubahan Disimpan")}
          className="flex flex-col items-center lg:items-start space-y-5"
        >
          <InputtedData label="Username" input="Matt" />
          <InputtedData label="Nama Lengkap" input="Steven Matthew" />
          <InputtedData label="Email" input="matthewti2202@gmail.com" />
          <InputtedData label="Nomor Telepon" input="081xxxxxxxx" />
          <InputtedData label="Password" input="************" />

          <InputtedData label="Jenis Kelamin" input="Laki-Laki" />
          <InputtedData label="Tanggal Lahir" input="22 Februari 2003" />
          <InputtedData
            label="Jalan"
            input="Jl. Raya Kebon Kacang, Cluster Purwakarta"
          />
          <InputtedData label="Kecamatan" input="Kalidoni" />

          <InputtedData label="Kabupaten" input="Bukit Sangkal" />
          <InputtedData label="Provinsi" input="Jakarta Pusat" />
          <InputtedData label="Kode Pos" input="78910" />
          <InputtedData label="Catatan" input="Pintu Sewa Is The Best" />
        </form>
        <div className="flex flex-col lg:flex-row self-center lg:self-start space-y-3 lg:space-y-0 lg:space-x-6 mt-8 lg:mt-[60px] w-full max-w-[250px] lg:max-w-none px-4 sm:px-0">
            <Button
              type="submit"
              className="w-full lg:w-[200px] h-[48px] text-white text-sm sm:text-[14px] font-medium bg-custom-gradient-tr rounded-xl hover:opacity-90"
            >
              Simpan
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/input-address")}
              className="w-full lg:w-[200px] h-[48px] text-sm sm:text-[14px] font-medium text-color-primaryDark bg-transparent border-[1px] border-color-primaryDark rounded-xl hover:bg-slate-200 hover:opacity-90"
            >
              Kembali
            </Button>
          </div>
      </div>
    </div>
  );
};

export default InputConfirmationContentLayout;
