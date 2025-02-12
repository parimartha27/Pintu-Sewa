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
import Dots from "@/public/dots.png";
import EditProfileForm from "@/components/layout/profile/Form";
import Section from "@/components/fragments/editProfile/Section";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ProfileBody = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8">
      <div className="flex flex-col w-1/4 max-w-[60px] md:max-w-[280px] h-auto max-h-[190px] md:shadow-md ">
        <Button
          variant="ghost"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden z-20 p-2 mx-auto hover:bg-color-third md:mx-8 flex flex-col my-3 group w-15 h-full"
        >
          <Image src={Dots} alt="dots" className="w-5 h-5" />
          <h4 className="text-[12px] text-color-primary text-center group-hover:text-color-primaryDark">Lainnya</h4>
        </Button>

        {/* Overlay untuk mobile */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Accordion/Sidebar */}
        <div
          className={`fixed md:static -m-1 md:w-full z-50 md:z-auto w-2/4 max-w-[280px] h-screen md:h-auto bg-white shadow-md md:shadow-none transform transition-transform duration-300 ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex flex-col w-full h-auto max-h-[190px]">
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
                      <h4 className="text-[#2C3941] text-xs lg:text-sm font-medium">
                        Akun Saya
                      </h4>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="w-full">
                    <Link
                      href={"/profile"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <h4 className="pl-8 py-1.5 text-[#2C3941] text-[10px] lg:text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                        Edit Profile
                      </h4>
                    </Link>
                    <Link
                      href={"/profile"}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <h4 className="pl-8 py-1.5 text-[#2C3941] text-[10px] lg:text-[12px] font-medium hover:bg-color-third hover:text-color-primaryDark">
                        Ubah Password
                      </h4>
                    </Link>
                  </AccordionContent>
                  <Link
                    href={"/profile"}
                    className="group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="pl-5 pr-2 pb-6">
                      <div className="flex space-x-2">
                        <Image
                          src={Pesanan}
                          alt="profile"
                          width={15}
                          height={20}
                        />
                        <h4 className="text-[#2C3941] text-xs lg:text-sm font-medium group-hover:underline">
                          Pesanan Saya
                        </h4>
                      </div>
                    </div>
                  </Link>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-2 md:p-0 max-h-auto">{children ? children : <DefaultLayout />}</div>
    </div>
  );
};

export default ProfileBody;

function DefaultLayout() {
  return (
    <div className="flex flex-col space-y-8">
      <EditProfileForm title="Informasi Personal" iconName="Edit" link="edit-profile">
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-3 xl:pb-0">
          <div className="flex items-center mt-6 w-full md:w-2/3 md:space-x-16 lg:space-x-30">
            <div className="flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Username" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Parimartha
                </h4>
              </Section>
              <Section title="Email" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  parimartha@gmail.com
                </h4>
              </Section>
              <Section title="Jenis Kelamin" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Laki - Laki
                </h4>
              </Section>
            </div>

            <div className="flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Nama Lengkap" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Putu Agus Parimartha
                </h4>
              </Section>
              <Section title="Nomor Telepon" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  081xxxxxxx
                </h4>
              </Section>
              <Section title="Tanggal Lahir" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  27 Desember 2002
                </h4>
              </Section>
            </div>
          </div>

          <div className="flex flex-col w-1/3 items-center max-w-[300px] mt-4 lg:mt-0 ">
            <Link href={""}>
              <Image className="w-[110px] h-[110px]" src={Guest} alt="" />
            </Link>
    
            <h4 className="hidden lg:block ml-20 w-full text-[12px]  text-color-primary mt-4">
              Ukuran Gambar: <span className="font-bold">Max. 1Mb</span>
            </h4>
            <h4 className="hidden lg:block ml-20 w-full text-[12px] text-color-primary mt-2">
              Format Gambar:{" "}
              <span className="font-bold">.JPEG, .JPG, .PNG</span>
            </h4>
          </div>
        </div>
      </EditProfileForm>

      <EditProfileForm title="Alamat" iconName="Edit Alamat" link="edit-address">
      <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-3 lg:pb-0 ">
          <div className="flex w-full md:space-x-5 mb-6">
            <div className="flex flex-col mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Jalan" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Jln. Foresta Raya, Cluster Naturale, Pagedangan
                </h4>
              </Section>
              <Section title="Kabupaten" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Tangerang
                </h4>
              </Section>
              <Section title="Kode Pos" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  15339
                </h4>
              </Section>
            </div>

            <div className="flex flex-col mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Kecamatan" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Pagedangan
                </h4>
              </Section>
              <Section title="Provinsi" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Banten
                </h4>
              </Section>
              <Section title="Catatan" className="text-center lg:text-start">
                <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                  Kos Paling Mevvah
                </h4>
              </Section>
            </div>
          </div>

        </div>
      </EditProfileForm>
    </div>
  );
}
