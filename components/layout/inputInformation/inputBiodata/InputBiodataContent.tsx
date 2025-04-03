import { useEffect, useState } from "react";
import LabelledInput from "@/components/fragments/editProfile/LabelledInput";
import Section from "@/components/fragments/filter/Section";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Guest from "@/public/guest.svg";
import Upload from "@/public/upload.svg";
import Next from "@/public/next.svg";
import { useRouter } from "next/navigation";

const InputBiodataContent = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Laki-Laki");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    setUsername(localStorage.getItem("username") || "");
    setFullname(localStorage.getItem("fullname") || "");
    setEmail(localStorage.getItem("email") || "");
    setHandphone(localStorage.getItem("handphone") || "");
    setPassword(localStorage.getItem("password") || "");
    setGender(localStorage.getItem("gender") || "");
    setProfileImage(localStorage.getItem("image") || Guest);
  }, []);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "Email tidak boleh kosong";
    if (!emailRegex.test(value)) return "Format email tidak valid";
    return "";
  };

  const validateHandphone = (value: string) => {
    if (!value.trim()) return "Handphone tidak boleh kosong";
    if (!/^08\d{8,12}$/.test(value))
      return "Nomor HP harus diawali 08 dan terdiri dari 10-14 digit";
    return "";
  };

  const validatePassword = (value: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,20}$/;
    if (!value.trim()) return "Password tidak boleh kosong";
    if (!passwordRegex.test(value))
      return "Password harus 12-20 karakter, mengandung huruf besar, huruf kecil, dan angka.";
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      username: username.trim() ? "" : "Username tidak boleh kosong",
      fullname: fullname.trim() ? "" : "Nama lengkap tidak boleh kosong",
      email: validateEmail(email),
      handphone: validateHandphone(handphone),
      password: validatePassword(password),
      date: date ? "" : "Tanggal lahir tidak boleh kosong",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const validFormats = ["image/jpeg", "image/jpg", "image/png"];
    if (file && !validFormats.includes(file.type)) {
      alert("Format gambar harus .JPEG, .JPG, atau .PNG");
      return;
    }

    if (file && file.size > 1048576) {
      alert("Ukuran gambar maksimal 1MB");
      return;
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem("profileImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const formattedDate = date?.toISOString().split("T")[0];

    localStorage.setItem("username", username);
    localStorage.setItem("fullname", fullname);
    localStorage.setItem("email", email);
    localStorage.setItem("handphone", handphone);
    localStorage.setItem("password", password);
    localStorage.setItem("gender", gender);
    localStorage.setItem("date", formattedDate || ""); 
    localStorage.setItem("image", profileImage || "");

    router.push("/input-address");
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
              src={profileImage || Guest}
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
          {profileImage && (
            <Image
              className="cursor-pointer w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full border object-cover"
              src={profileImage}
              alt="Profile"
              width={200}
              height={200}
              onClick={() => setIsModalOpen(true)}
            />
          )}
          <label className="flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark px-4 py-2 rounded-lg cursor-pointer">
            <Image
              src={Upload || Guest}
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
              {errors.username && (
                <p className="text-red-500 text-xs md:text-md">
                  {errors.username}
                </p>
              )}
              <LabelledInput
                label="Username"
                htmlFor="username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              {errors.fullname && (
                <p className="text-red-500 text-xs md:text-md">
                  {errors.fullname}
                </p>
              )}
              <LabelledInput
                label="Nama Lengkap"
                htmlFor="fullname"
                id="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              {errors.email && (
                <p className="text-red-500 text-xs md:text-md">
                  {errors.email}
                </p>
              )}
              <LabelledInput
                label="Email"
                htmlFor="email"
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              {errors.handphone && (
                <p className="text-red-500 text-xs md:text-md">
                  {errors.handphone}
                </p>
              )}
              <LabelledInput
                label="Nomor Telepon"
                htmlFor="handphone"
                id="handphone"
                type="text"
                value={handphone}
                onChange={(e) => setHandphone(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              {errors.password && (
                <p className="text-red-500 text-xs md:text-md">
                  {errors.password}
                </p>
              )}
              <LabelledInput
                label="Password"
                htmlFor="password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Section Header="Jenis Kelamin">
              <RadioGroup
                defaultValue="option-one"
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
                    {errors.date && (
                      <p className="text-red-500 text-xs md:text-md">
                        {errors.date}
                      </p>
                    )}
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
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
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
