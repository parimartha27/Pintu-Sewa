"use client";

import Image from "next/image";
import Link from "next/link";
import Guest from "@/public/guest.svg";
import EditProfileForm from "@/components/layout/profile/Form";
import Section from "@/components/fragments/editProfile/Section";
import ProfileSidebarLayout from "../ProfileSidebar";

const ProfileBody = () => {

  return (
    <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout">
      <ProfileSidebarLayout/>
      <div className="w-full p-2 md:p-0 max-h-auto"><DefaultLayout /></div>
    </div>
  );
};

export default ProfileBody;

function DefaultLayout() {
  return (
    <div className="flex flex-col space-y-8 pb-12 md:pb-[325px]">
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
