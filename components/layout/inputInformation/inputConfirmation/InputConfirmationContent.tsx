"use client";

import Image from "next/image";
import Guest from "@/public/guest.svg";
import InputtedData from "@/components/fragments/input-information/InputtedData";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

const baseUrl = "https://pintu-sewa.up.railway.app/api/customers/create"

interface CustomerRequest {
  id: string;
  username: string;
  name: string;
  street: string;
  phone_number: string;
  email:string;
  district: string;
  regency: string;
  province: string;
  gender: string;
  birth_date: string;
  post_code: string;
  password: string;
  note?: string;
}

interface CustomerResponse {
  error_schema: {
    error_code: string;
    error_message: string;
  };
  output_schema: {
  customer_id: string;
  username:string;
  email:string;
  phone_number:string;
  token:string;
  image:string;
  };
}

const InputConfirmationContentLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload: CustomerRequest = {
        id: localStorage.getItem("customer_id") || "",
        username: localStorage.getItem("username") || "",
        name: localStorage.getItem("fullname") || "",
        street: localStorage.getItem("jalan") || "",
        phone_number: localStorage.getItem("handphone") || "",
        email: localStorage.getItem("email") || "",
        district: localStorage.getItem("kecamatan") || "",
        regency: localStorage.getItem("kabupaten") || "",
        province: localStorage.getItem("provinsi") || "",
        gender: localStorage.getItem("gender") || "",
        birth_date: localStorage.getItem("date") || "",
        post_code: localStorage.getItem("kodepos") || "",
        password: localStorage.getItem("password") || "",
        note: localStorage.getItem("catatan") || "",
      };

      console.log(payload);

      const response = await axios.post<CustomerResponse>(
       baseUrl,
        payload
      );

      if (response.data.error_schema.error_code === "PS-00-000") {
        const username = response.data.output_schema.username;
        localStorage.clear();
        localStorage.setItem("username", username);
        localStorage.setItem("image", response.data.output_schema.image);
        
        document.cookie = `token=${response.data.output_schema?.token || ""}; path=/; Secure; SameSite=Lax`;
        document.cookie = `userId=${response.data.output_schema?.customer_id || ""}; path=/; Secure; SameSite=Lax`;
        router.push("/");
      } else {
        alert("Registrasi gagal: " + response.data.error_schema.error_message);
        router.push("/input-biodata")
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Gagal menyimpan data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed mt-0 inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 ">
          <div className="relative flex justify-center items-center">
            <button
              className="absolute -top-20 -right-10 text-white text-3xl font-bold hover:bg-slate-800"
              onClick={() => setIsModalOpen(false)}
            >
              x
            </button>

            <Image
              src={localStorage.getItem("image") || Guest}
              alt="Profile Full Size"
              width={300}
              height={300}
              className=" w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row-reverse w-full space-y-5">
        <div className="flex flex-col items-center w-full space-y-6 mt-5">
          <Image
            className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full object-cover cursor-pointer"
            src={localStorage.getItem("image") || Guest}
            width={200}
            height={200}
            alt=""
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <div className="flex flex-col w-full pt-6 lg:pt-0 ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center lg:items-start space-y-5 pb-12"
          >
            <InputtedData
              label="Username"
              input={localStorage.getItem("username") || "-"}
            />
            <InputtedData
              label="Nama Lengkap"
              input={localStorage.getItem("fullname") || "-"}
            />
            <InputtedData
              label="Email"
              input={localStorage.getItem("email") || "-"}
            />
            <InputtedData
              label="Nomor Telepon"
              input={localStorage.getItem("handphone") || "-"}
            />
            <InputtedData
              label="Password"
              input={"*".repeat(localStorage.getItem("password")?.length || 0)}
            />
            <InputtedData
              label="Jenis Kelamin"
              input={localStorage.getItem("gender") || "-"}
            />
            <InputtedData
              label="Tanggal Lahir"
              input={localStorage.getItem("date") || "-"}
            />
            <InputtedData
              label="Jalan"
              input={localStorage.getItem("jalan") || "-"}
            />
            <InputtedData
              label="Provinsi"
              input={localStorage.getItem("provinsi") || "-"}
            />{" "}
            <InputtedData
              label="Kabupaten"
              input={localStorage.getItem("kabupaten") || "-"}
            />
            <InputtedData
              label="Kecamatan"
              input={localStorage.getItem("kecamatan") || "-"}
            />
            <InputtedData
              label="Kode Pos"
              input={localStorage.getItem("kodepos") || "-"}
            />
            <InputtedData
              label="Catatan"
              input={localStorage.getItem("catatan") || "-"}
            />
            {loading && (
              <div className="w-5 h-5 mb-3  animate-spin rounded-full border-t-2 border-b-2 border-color-primaryDark"></div>
            )}
            {!loading && (
              <div className="flex flex-col pt-2 lg:flex-row self-center lg:self-start space-y-3 lg:space-y-0 lg:space-x-6 lg:mt-[60px] w-full max-w-[250px] lg:max-w-none px-4 sm:px-0">
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
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default InputConfirmationContentLayout;
