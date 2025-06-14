"use client";

import { useEffect, useState } from "react";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import Section from "@/components/fragments/filter/Section";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronDown, X } from "lucide-react";
import Image from "next/image";
import Guest from "@/public/guest.svg";
import Upload from "@/public/upload.svg";
import Next from "@/public/next.svg";
import { useRouter } from "next/navigation";
import { useAuthForm } from "@/hooks/auth/useAuthForm";
import { BirthdayCalendar } from "@/components/ui/birthday-calendar";
import { AlertProps } from "@/types/alert";
import Alert from "../../Alert";
import CryptoJS from "crypto-js";

const SECRET_KEY = "pintusewa123";

const InputBiodataContent = () => {
  const router = useRouter();
  const { validateEmail, validateHandphone, validatePassword } = useAuthForm();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Laki-Laki");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  });

  const [errors, setErrors] = useState({
    username: "",
    fullname: "",
    email: "",
    handphone: "",
    password: "",
    date: "",
  });

  useEffect(() => {
    setDate(
      localStorage.getItem("date")
        ? new Date(localStorage.getItem("date")!)
        : undefined
    );

    if (localStorage.getItem("password")) {
      const decryptedPass = CryptoJS.AES.decrypt(
        localStorage.getItem("password")!,
        SECRET_KEY
      ).toString(CryptoJS.enc.Utf8);
      setPassword(decryptedPass);
    }

    setUsername(localStorage.getItem("username") || "");
    setFullname(localStorage.getItem("fullname") || "");
    setEmail(localStorage.getItem("email") || "");
    setHandphone(localStorage.getItem("handphone") || "");
    setGender(localStorage.getItem("gender") || "Laki-Laki");
    setProfileImage(localStorage.getItem("image") || "");
  }, []);

  //fullname min 3
  //username min bebas

  const validateForm = () => {
    const newErrors = {
      username: username.trim() ? "" : "Username tidak boleh kosong",
      fullname: !fullname.trim()
        ? "Nama lengkap tidak boleh kosong"
        : fullname.trim().length < 3
        ? "Nama lengkap minimal 3 karakter"
        : "",
      email: validateEmail(email),
      handphone: validateHandphone(handphone),
      password: validatePassword(password),
      date: date ? "" : "Tanggal lahir tidak boleh kosong",
      // image: profileImage.trim() ? profileImage : "",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const validFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (file && !validFormats.includes(file.type)) {
      setAlertState({
        isOpen: true,
        message: "Format gambar harus .JPEG, .JPG, atau .PNG",
      });
      return;
    }

    if (file && file.size > 1048576) {
      setAlertState({
        isOpen: true,
        message: "Ukuran gambar maksimal 1MB",
      });
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem("image", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

    const birthDate = formattedDate ? new Date(formattedDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (birthDate) {
      if (birthDate > today) {
        setAlertState({
          isOpen: true,
          message: "Tanggal Lahir Tidak Boleh Lebih Dari Hari Ini",
          isWrong: true,
        });
        return;
      }
    }

    if (!profileImage.trim()) {
      setAlertState({
        isOpen: true,
        message: "Foto Profile Tidak Boleh Kosong!",
      });
      return;
    }

    if (!validateForm()) {
      console.log("ADA ERROR DI FORM BIODATA");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("email", email);
    localStorage.setItem("handphone", handphone);
    const encryptedPass = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
    localStorage.setItem("password", encryptedPass);
    localStorage.setItem("gender", gender);
    localStorage.setItem("date", formattedDate || "");
    localStorage.setItem("image", profileImage || "");

    router.push("/input-address");
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
              src={profileImage?.trim() === "" ? profileImage : Guest}
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
            className="cursor-pointer w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full border object-cover"
            src={profileImage || Guest}
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
            <h4 className="text-color-primaryDark text-[12px]">Unggah Foto</h4>
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
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div className="flex flex-col">
              <LabelledInput
                label="Username"
                htmlFor="username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={15}
              />
              {errors.username && (
                <p className="text-red-500 text-xs md:text-md pt-2">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <LabelledInput
                label="Nama Lengkap"
                htmlFor="fullname"
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                maxLength={40}
              />
              {errors.fullname && (
                <p className="text-red-500 text-xs md:text-md pt-2">
                  {errors.fullname}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <LabelledInput
                label="Email"
                htmlFor="email"
                id="email"
                type="text"
                value={email}
                disabled={localStorage.getItem("register_by") == "email" ? true : false}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-xs md:text-md pt-2">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <LabelledInput
                label="Nomor Telepon"
                htmlFor="handphone"
                id="handphone"
                type="text"
                maxLength={13}
                value={handphone}
                disabled={localStorage.getItem("register_by") == "phone_number" ? true : false}
                onChange={(e) => setHandphone(e.target.value)}
              />
              {errors.handphone && (
                <p className="text-red-500 text-xs md:text-md pt-2">
                  {errors.handphone}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <LabelledInput
                label="Password"
                htmlFor="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs md:text-md pt-2">
                  {errors.password}
                </p>
              )}
            </div>

            <Section Header="Jenis Kelamin">
              <RadioGroup
                defaultValue="Laki-Laki"
                className="flex flex-row space-x-6 mt-1"
                value={gender}
                onValueChange={(value) => setGender(value)}
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
            <div className="relative ">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex flex-col">
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
                    {errors.date && (
                      <p className="text-red-500 text-xs md:text-md pt-2">
                        {errors.date}
                      </p>
                    )}
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
              <Button
                type="submit"
                className="space-x-[10px] bg-black w-full flex items-center mx-auto lg:mx-0 max-w-[250px] h-[48px] mt-[60px] rounded-xl hover:opacity-80 bg-custom-gradient-tr"
              >
                <Image src={Next} alt="next" className="w-4 h-[14px]" />
                <h4 className="text-sm font-medium ">Selanjutnya</h4>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputBiodataContent;
