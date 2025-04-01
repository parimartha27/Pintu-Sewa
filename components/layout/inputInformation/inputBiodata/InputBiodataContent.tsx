import { useState } from "react";
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
import Link from "next/link";
import Image from "next/image";
import Guest from "@/public/guest.svg";
import Upload from "@/public/upload.svg";
import Next from "@/public/next.svg";
import { useRouter } from "next/navigation";

const InputBiodataContent = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date>();
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [handphone, setHandphone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("laki-laki");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      fullname,
      email,
      handphone,
      password,
      gender,
      dateOfBirth: date ? date.toISOString() : null,
    };

    localStorage.setItem("biodata", JSON.stringify(userData));
    alert("Data berhasil disimpan di localStorage!");
    router.push("/input-address");
  };
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
        <Button className="flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark">
          <Image
            src={Upload}
            alt="upload"
            width={18}
            height={18}
            className="mt-1"
          />
          <h4 className="text-color-primaryDark text-[12px]">Unggah Foto</h4>
        </Button>
        <div className="flex flex-col">
          <h4 className="w-full text-[12px] text-center lg:text-start text-color-primary">
            Ukuran Gambar: <span className="font-bold">Max. 1Mb</span>
          </h4>
          <h4 className="w-full text-[12px] text-center lg:text-start text-color-primary mt-2">
            Format Gambar: <span className="font-bold">.JPEG, .JPG, .PNG</span>
          </h4>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
          <LabelledInput
            label="Username"
            htmlFor="username"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <LabelledInput
            label="Nama Lengkap"
            htmlFor="fullname"
            id="fullname"
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <LabelledInput
            label="Email"
            htmlFor="email"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <LabelledInput
            label="Nomor Telepon"
            htmlFor="handphone"
            id="handphone"
            type="text"
            value={handphone}
            onChange={(e) => setHandphone(e.target.value)}
          />
          <LabelledInput
            label="Password"
            htmlFor="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Section Header="Jenis Kelamin">
            <RadioGroup
              defaultValue="option-one"
              className="flex flex-row space-x-6 mt-1"
              value={gender}
              onValueChange={(value) => setGender(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="laki-laki" id="option-one" />
                <Label
                  htmlFor="option-one"
                  className="text-[12px] text-color-primary font-medium"
                >
                  Laki - Laki
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="perempuan" id="option-two" />
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
                <div>
                  <LabelledInput
                    label="Tanggal Lahir"
                    htmlFor="tanggal-lahir"
                    id="tanggal-lahir"
                    type="text"
                    placeholder="Pilih tanggal"
                    value={
                      date ? format(date, "dd MMMM yyyy", { locale: id }) : ""
                    }
                    readonly={true}
                  />
                  <ChevronDown className="h-4 w-4 absolute right-3 top-14 -translate-y-1/2 text-[#73787B] pointer-events-none" />
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
  );
};

export default InputBiodataContent;
