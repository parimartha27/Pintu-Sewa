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
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDown } from "lucide-react";
import { id } from "date-fns/locale";
import { X } from "lucide-react";

const EditProfileBody = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const [date, setDate] = useState<Date>();
  return (
    <>
      {" "}
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
              src={profileImage || Guest}
              alt="Profile Full Size"
              width={300}
              height={300}
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white"
            />
          </div>
        </div>
      )}
      <div className="flex w-full h-auto pb-12 md:pb-[174px]">
        <EditProfileForm title="Edit Informasi Personal">
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
                onSubmit={() => alert("Perubahan Disimpan")}
                className="flex flex-col space-y-5"
              >
                <LabelledInput
                  label="Username"
                  htmlFor="username"
                  id="username"
                  type="text"
                />
                <LabelledInput
                  label="Nama Lengkap"
                  htmlFor="fullname"
                  id="fullname"
                  type="text"
                />
                <LabelledInput
                  label="Email"
                  htmlFor="email"
                  id="email"
                  type="text"
                />
                <LabelledInput
                  label="Nomor Telepon"
                  htmlFor="handphone"
                  id="handphone"
                  type="text"
                />
                <Section title="Jenis Kelamin">
                  <RadioGroup
                    defaultValue="option-one"
                    className="flex space-x-6 mt-1"
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
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

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
    </>
  );
};

export default EditProfileBody;
