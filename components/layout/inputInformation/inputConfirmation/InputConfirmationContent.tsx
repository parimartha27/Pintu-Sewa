"use client";

import Image from "next/image"
import Guest from "@/public/guest.svg"
import InputtedData from "@/components/fragments/input-information/InputtedData"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"
import { createCustomerBaseUrl } from "@/types/globalVar"
import LoadingPopup from "../../LoadingPopUp"
import Alert from "@/components/layout/Alert";
import { AlertProps } from "@/types/alert";
import { IoMdAlert } from "react-icons/io";
import { useAuth } from "@/hooks/auth/useAuth";
interface CustomerRequest {
  id: string | null
  username: string
  name: string
  street: string
  phone_number: string
  email: string
  district: string
  regency: string
  province: string
  gender: string
  birth_date: string
  post_code: string
  password: string
  notes?: string
}

interface CustomerResponse {
  error_schema: {
    error_code: string;
    error_message: string;
  };
  output_schema: {
    customer_id: string;
    username: string;
    email: string;
    phone_number: string;
    token: string;
    image: string;
  };
}

const InputConfirmationContentLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [imageSrc, setImageSrc] = useState(Guest);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });
  const {customerId} = useAuth();

  useEffect(() => {
    // This runs only on client side
    const data: Record<string, string> = {};
    const keys = [
      // "customerId",
      "username",
      "fullname",
      "jalan",
      "handphone",
      "email",
      "kecamatan",
      "kabupaten",
      "provinsi",
      "gender",
      "date",
      "kodepos",
      "password",
      "catatan",
      "image",
    ];

    keys.forEach((key) => {
      data[key] = localStorage.getItem(key) || "";
    });

    setFormData(data);
    setImageSrc(data.image || Guest);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload: CustomerRequest = {
        id: customerId,
        username: formData.username,
        name: formData.fullname,
        street: formData.jalan,
        phone_number: formData.handphone,
        email: formData.email,
        district: formData.kecamatan,
        regency: formData.kabupaten,
        province: formData.provinsi,
        gender: formData.gender,
        birth_date: formData.date,
        post_code: formData.kodepos,
        password: formData.password,
        notes: formData.catatan,
      }

      console.log("Payload: ", payload)

      const response = await axios.post<CustomerResponse>(
        createCustomerBaseUrl,
        payload
      );

      if (response.data.error_schema.error_code === "PS-00-000") {
        const username = response.data.output_schema.username;
        localStorage.clear();
        localStorage.setItem("username", username);
        localStorage.setItem("image", response.data.output_schema.image);
        // localStorage.setItem("token", response.data.output_schema.token);
        // localStorage.setItem(
        //   "customerId",
        //   response.data.output_schema.customer_id
        // );

        document.cookie = `token=${
          response.data.output_schema?.token || ""
        }; path=/; Secure; SameSite=Lax`;
        // document.cookie = `customerId=${
        //   response.data.output_schema?.customer_id || ""
        // }; path=/; Secure; SameSite=Lax`;
        router.push("/");
      } else {
        setAlertState({
          isOpen: true,
          message:
            "Registrasi gagal: " + response.data.error_schema.error_message,
        });
        router.push("/input-biodata");
      }
    } catch (error) {
      setAlertState({
        isOpen: true,
        message: "Registrasi gagal: " + error,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() =>
            setAlertState({ isOpen: false, message: "", isWrong: true })
          }
          isWrong={alertState.isWrong}
        />
      )}
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
              src={imageSrc}
              alt="Profile Full Size"
              width={300}
              height={300}
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row-reverse w-full space-y-5">
        <div className="flex flex-col items-center w-full space-y-6 mt-5">
          <Image
            className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full object-cover cursor-pointer"
            src={imageSrc}
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
            <InputtedData label="Username" input={formData.username || "-"} />
            <InputtedData
              label="Nama Lengkap"
              input={formData.fullname || "-"}
            />
            <InputtedData label="Email" input={formData.email || "-"} />
            <InputtedData
              label="Nomor Telepon"
              input={formData.handphone || "-"}
            />
            <InputtedData
              label="Password"
              input={"*".repeat(formData.password?.length || 0)}
            />
            <InputtedData
              label="Jenis Kelamin"
              input={formData.gender || "-"}
            />
            <InputtedData
              label='Tanggal Lahir'
              input={formData.date || "-"}
            />
            <InputtedData
              label='Jalan'
              input={formData.jalan || "-"}
            />
            <InputtedData
              label='Provinsi'
              input={formData.provinsi || "-"}
            />
            <InputtedData
              label='Kabupaten'
              input={formData.kabupaten || "-"}
            />
            <InputtedData
              label='Kecamatan'
              input={formData.kecamatan || "-"}
            />
            <InputtedData
              label='Kode Pos'
              input={formData.kodepos || "-"}
            />
            <InputtedData
              label='Catatan'
              input={formData.catatan || "-"}
            />

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
