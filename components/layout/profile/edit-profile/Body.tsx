"use client";
import EditProfileForm from "../Form";
import Guest from "@/public/guest.svg";
import Upload from "@/public/upload.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import Section from "@/components/fragments/editProfile/Section";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { ChevronDown } from "lucide-react";
import { id } from "date-fns/locale";
import { X } from "lucide-react";
import { BiodataResponseProps } from "@/types/biodata";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { customerBaseUrl } from "@/types/globalVar";
import axios from "axios";
import { ProfileResponse } from "@/types/profile";
import ProfileFormSkeleton from "./ProfileFormSkeleton";
import { EditProfileResponseProps } from "@/types/editProfile";
import { useRouter } from "next/navigation";
import { BirthdayCalendar } from "@/components/ui/birthday-calendar";
import LoadingPopup from "../../LoadingPopUp";
import { AlertProps } from "@/types/alert";
import Alert from "../../Alert";
import { useAuth } from "@/hooks/auth/useAuth";
import dataUrlToFile from "@/hooks/useConvertStringToFile";

const EditProfileBody = () => {
  const router = useRouter();
  const {
    date,
    setDate,
    username,
    setUsername,
    fullname,
    setFullname,
    handphone,
    setHandphone,
    validateHandphone,
    gender,
    setGender,
  } = useAuthForm();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [biodataData, setBiodataData] = useState<ProfileResponse>();
  const { customerId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const [, setErrors] = useState({
    username: "",
    fullname: "",
    phone: "",
    gender: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!customerId) return;

      try {
        const biodataRes = await axios.get<BiodataResponseProps>(
          `${customerBaseUrl}/${customerId}`
        );
        const data = biodataRes.data.output_schema;
        console.log(data);
        setBiodataData(data);
        setUsername(data?.username || "");
        setFullname(data?.name || "");
        setHandphone(data?.phone_number || "");
        setGender(data?.gender || "");
        const parsedDate = parse(
          data?.birth_date || "",
          "yyyy-MM-dd",
          new Date()
        );

        if (isValid(parsedDate)) {
          setDate(parsedDate);
        } else {
          setDate(undefined);
        }

        setLoading(false);
      } catch (e) {
        setAlertState({
          isOpen: true,
          message: "Gagal Mengambil Data: " + e,
        });
        setLoading(false);
      }
    };
    fetchData();
  }, [customerId]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const validFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (file && !validFormats.includes(file.type)) {
      setAlertState({
        isOpen: true,
        message: "Format Gambar Harus .JPEG, .JPG, Atau .PNG",
      });
      return;
    }

    if (file && file.size > 1048576) {
      setAlertState({
        isOpen: true,
        message: "Ukuran Gambar Maksimal 1MB",
      });
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {
      username: username.trim() ? "" : "username tidak boleh kosong",
      fullname: !fullname.trim()
        ? "Nama lengkap tidak boleh kosong"
        : fullname.trim().length < 3
        ? "Nama lengkap minimal 3 karakter"
        : "",
      gender: gender.trim() ? "" : "jenis kelamin tidak boleh kosong",
      phone: validateHandphone(handphone),
    };

    setErrors(newErrors);

    const firstError = Object.values(newErrors).find((msg) => msg !== "");
    if (firstError) {
      setAlertState({
        isOpen: true,
        message: firstError,
      });
      return false;
    }

    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (date > today) {
        setAlertState({
          isOpen: true,
          message: "Tanggal Lahir Tidak Boleh Lebih Dari Hari Ini",
          isWrong: true,
        });
        return;
      }
    }

    setLoadingSubmit(true);

    try {
      const formData = new FormData();

      formData.append("id", customerId || "");
      formData.append("username", username || "");
      formData.append("name", fullname || "");
      formData.append("phoneNumber", handphone || "");
      formData.append("gender", gender || "");
      const formattedDate = date ? format(date, 'yyyy-MM-dd') : '';
      formData.append("birthDate", formattedDate);
      if (profileImage) {
        const imageFile = dataUrlToFile(profileImage || "", Guest);
        formData.append("image", imageFile);
      }
      formData.forEach((value, key) => {
        console.log(`Data submitted: ${key}:`, value);
      });

      const response = await axios.put<EditProfileResponseProps>(
        `${customerBaseUrl}/edit-biodata`,
        formData
      );

      console.log("res edit profile", response);

      if (response.data.error_schema.error_message === "SUCCESS") {
        localStorage.setItem("image", response.data.output_schema.image || "");
        localStorage.setItem("username", username || "");
        router.push("/profile");
      } else {
        setAlertState({
          isOpen: true,
          message:
            "Gagal Mengedit Profile: " +
            response.data.error_schema.error_message,
        });
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.error_schema?.error_code;
        if (errorCode === "PS-01-003") {
          setAlertState({
            isOpen: true,
            message: "Nomor Telepon Telah Terdaftar",
          });
        } else if (errorCode === "PS-01-001") {
          setAlertState({
            isOpen: true,
            message: "Username Telah Terdaftar",
          });
        } else {
          setAlertState({
            isOpen: true,
            message: "Terjadi Kesalahan Tidak Diketahui",
          });
        }
      } else {
        setAlertState({
          isOpen: true,
          message: "Terjadi Kesalahan Tidak Diketahui",
        });
      }
    } finally {
      setLoadingSubmit(false);
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
              className="absolute -top-10 -right-11 z-50 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            <Image
              src={profileImage || biodataData?.image || Guest}
              alt="Profile Full Size"
              width={300}
              height={300}
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white"
            />
          </div>
        </div>
      )}
      {loading ? (
        <ProfileFormSkeleton />
      ) : (
        <div className="flex w-full h-auto pb-12 md:pb-[174px]">
          <EditProfileForm title="Edit Informasi Personal">
            <div className="flex flex-col lg:flex-row-reverse w-full space-y-5">
              <div className="flex flex-col items-center w-full space-y-6 mt-5">
                <Image
                  className="cursor-pointer w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full border object-cover"
                  src={profileImage || biodataData?.image || Guest}
                  alt="Profile"
                  width={200}
                  height={200}
                  onClick={() => setIsModalOpen(true)}
                />
                <label className="flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark px-4 py-2 rounded-lg cursor-pointer">
                  <Image
                    src={Upload}
                    alt="upload"
                    width={18}
                    height={18}
                    className="mt-1"
                  />
                  <h4 className="text-color-primaryDark text-[12px]">
                    Unggah Foto
                  </h4>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>

                <div className="flex flex-col">
                  <h4 className="w-full text-[12px] text-center lg:text-start text-color-primary">
                    Ukuran Gambar: <span className="font-bold">Max. 1Mb</span>
                  </h4>
                  <h4 className="w-full text-[12px] text-center lg:text-start text-color-primary mt-2">
                    Format Gambar:{" "}
                    <span className="font-bold">.JPEG, .JPG, .PNG</span>
                  </h4>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col space-y-5"
                >
                
                  <LabelledInput
                    label="Username"
                    htmlFor="username"
                    id="username"
                    type="text"
                    maxLength={15}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <LabelledInput
                    label="Nama Lengkap"
                    htmlFor="fullname"
                    id="fullname"
                    type="text"
                    maxLength={40}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <LabelledInput
                    label="Nomor Telepon"
                    htmlFor="handphone"
                    id="handphone"
                    type="phone"
                    value={handphone}
                    maxLength={13}
                    onChange={(e) => setHandphone(e.target.value)}
                  />
                  <Section title="Jenis Kelamin">
                    <RadioGroup
                      defaultValue="option-one"
                      className="flex space-x-6 mt-1"
                      value={gender}
                      onValueChange={(val) => setGender(val)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Laki-Laki" id="option-one" />
                        <Label
                          htmlFor="option-one"
                          className="text-[12px] text-color-primary font-medium"
                        >
                          Laki - Laki
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Perempuan" id="option-two" />
                        <Label
                          htmlFor="option-two"
                          className="text-[12px] text-color-primary font-medium"
                        >
                          Perempuan
                        </Label>
                      </div>
                    </RadioGroup>
                  </Section>
                  <div className="relative">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div>
                          <LabelledInput
                            label="Tanggal Lahir"
                            htmlFor="tanggal-lahir"
                            id="tanggal-lahir"
                            type="text"
                            placeholder="Pilih tanggal"
                            value={
                              date
                                ? format(date, "dd MMMM yyyy", { locale: id })
                                : ""
                            }
                            readonly={true}
                          />
                          <ChevronDown className="h-4 w-4 absolute right-3 top-14 -translate-y-1/2 text-[#73787B] pointer-events-none" />
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <BirthdayCalendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  {loadingSubmit && <LoadingPopup />}
                  <Button
                    type="submit"
                    className="w-[200px] h-[48px] mt-3 text-white text-[14px] self-center lg:self-start font-medium bg-custom-gradient-tr hover:opacity-90"
                  >
                    Simpan Perubahan
                  </Button>
                </form>
              </div>
            </div>
          </EditProfileForm>
        </div>
      )}
    </>
  );
};

export default EditProfileBody;
