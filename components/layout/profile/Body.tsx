"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Link from "next/link";
import Profile from "@/public/profile.svg";
import Pesanan from "@/public/pesanan.svg";
import Guest from "@/public/guest.svg";
import EditProfileForm from "@/components/layout/profile/Form";
import Section from "@/components/fragments/editProfile/Section";

const ProfileBody = ({ children }: { children: React.ReactNode }) => {
  
  return (
    <div className="flex w-full justify-self-center p-1 md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-8">
      <div className="flex flex-col w-1/4 max-w-[280px] h-auto max-h-[190px] shadow-md">
        <div className="flex flex-col">
          <Accordion type="single" collapsible className="h-auto">
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger className="pl-5 pt-7 pr-5">
                <div className="flex space-x-2">
                  <Image
                    src={Profile}
                    alt="profile"
                    width={16.5}
                    height={17.26}
                  />
                  <h4 className="text-[#2C3941] text-sm font-medium">
                    Akun Saya
                  </h4>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <Link href={"/profile"}>
                  <h4 className="pl-8 py-1.5 text-[#2C3941] text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                    Edit Profile
                  </h4>
                </Link>
                <Link href={"/profile"}>
                  <h4 className="pl-8 py-1.5 text-[#2C3941] text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                    Ubah Password
                  </h4>
                </Link>
              </AccordionContent>
              <Link href={"/profile"} className="group">
                <div className="pl-5 pr-2 pb-6">
                  {" "}
                  <div className="flex space-x-2">
                    <Image src={Pesanan} alt="profile" width={15} height={20} />
                    <h4 className="text-[#2C3941] text-sm font-medium group-hover:underline">
                      Pesanan Saya
                    </h4>
                  </div>
                </div>
              </Link>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="w-3/4">
        {children ? children : <DefaultLayout />}
      </div>
    </div>
  );
};

export default ProfileBody;

function DefaultLayout() {
  return (
    <div className="flex flex-col space-y-8">
      <EditProfileForm title="Informasi Personal" iconName="Edit">
        <div className="w-full flex flex-wrap flex-col md:flex-row ">
          <div className="flex w-2/3 space-x-40">
            <div className="flex flex-col mb-6 w-1/2">
              <Section title="Username">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Parimartha
                </h4>
              </Section>
              <Section title="Email">
                <h4 className="text-[16px] font-medium text-color-primary">
                  parimartha@gmail.com
                </h4>
              </Section>
              <Section title="Jenis Kelamin">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Laki - Laki
                </h4>
              </Section>
            </div>

            <div className="flex flex-col w-1/2">
              <Section title="Nama Lengkap">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Putu Agus Parimartha
                </h4>
              </Section>
              <Section title="Nomor Telepon">
                <h4 className="text-[16px] font-medium text-color-primary">
                  081xxxxxxx
                </h4>
              </Section>
              <Section title="Tanggal Lahir">
                <h4 className="text-[16px] font-medium text-color-primary">
                  27 Desember 2002
                </h4>
              </Section>
            </div>
          </div>

          <div className="flex flex-col w-1/3 mt-6 items-center max-w-[300px]">
          
              <Link href={""}>
                <Image
                  className="w-[110px] h-[110px]"
                  src={Guest}
                  alt=""
                />
              </Link>

              <h4 className="ml-20 w-full text-[12px]  text-color-primary mt-4">Ukuran Gambar: <span className="font-bold">Max. 1Mb</span></h4>
              <h4 className="ml-20 w-full text-[12px] text-color-primary mt-2">Format Gambar: <span  className="font-bold">.JPEG, .JPG, .PNG</span></h4>
          </div>

        </div>
      </EditProfileForm>
      <EditProfileForm title="Alamat" iconName="Edit Alamat">
      <div className="w-full flex flex-col md:flex-row ">
          <div className="flex w-full space-x-40">
            <div className="flex flex-col mb-6 w-1/2">
              <Section title="Jalan">
                <h4 className="text-[16px] font-medium text-color-primary">
                Jln. Foresta Raya, Cluster Naturale, Pagedangan
                </h4>
              </Section>
              <Section title="Kabupaten">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Tangerang
                </h4>
              </Section>
              <Section title="Kode Pos">
                <h4 className="text-[16px] font-medium text-color-primary">
                  15339
                </h4>
              </Section>
            </div>

            <div className="flex flex-col w-1/2">
              <Section title="Kecamatan">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Pagedangan
                </h4>
              </Section>
              <Section title="Provinsi">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Banten
                </h4>
              </Section>
              <Section title="Catatan">
                <h4 className="text-[16px] font-medium text-color-primary">
                  Kosku paling gede
                </h4>
              </Section>
            </div>
          </div>

       
        </div>
      </EditProfileForm>
    </div>
  );
}
