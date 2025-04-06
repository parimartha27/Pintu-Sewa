"use client";

import Image from "next/image";
import Link from "next/link";
import Guest from "@/public/guest.svg";
import EditProfileForm from "@/components/layout/profile/Form";
import Section from "@/components/fragments/editProfile/Section";
import ProfileSidebarLayout from "../ProfileSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const baseUrl = "https://pintu-sewa.up.railway.app/api/customers";

interface ProfileResponse {
  id: string;
  username: string;
  name: string;
  street: string;
  phone_number: string;
  email: string;
  district: string;
  regency: string;
  province: string;
  gender: string;
  birth_date: string;
  post_code: string;
  note?: string;
}

const ProfileBody = () => {
  const customerId = localStorage.getItem("customerId");
  const [customerData, setCustomerData] = useState<ProfileResponse>();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");

  useEffect(() => {
    if (!customerId) {
      setError("User ID tidak ditemukan di localStorage.");
      setLoading(false);
      return;
    }

    axios
      .get(`${baseUrl}/${customerId}`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setCustomerData(res.data.output_schema);
          console.log(res.data.output_schema);
        } else {
          setError("Gagal fetch data customer.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Terjadi kesalahan saat fetching.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout">
      <ProfileSidebarLayout />
      <div className="w-full p-2 md:p-0 max-h-auto">
        <DefaultLayout customerData={customerData} loading={loading} />
      </div>
    </div>
  );
};

export default ProfileBody;

interface DefaultLayoutProps {
  customerData?: ProfileResponse;
  loading: boolean;
}

function DefaultLayout({ customerData, loading }: DefaultLayoutProps) {
  return (
    <div className="flex flex-col space-y-8 pb-12 md:pb-[325px]">
      <EditProfileForm
        title="Informasi Personal"
        iconName="Edit"
        link="edit-profile"
      >
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-3 xl:pb-0">
          <div className="flex flex-col md:flex-row items-center mt-6 w-full md:w-2/3 md:space-x-16 lg:space-x-30">
            <div className="flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Username" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.username || "-"}
                  </h4>
                )}
              </Section>
              <Section
                title="Email"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.email || "-"}
                  </h4>
                )}
              </Section>
              <Section
                title="Jenis Kelamin"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.gender || "-"}
                  </h4>
                )}
              </Section>
            </div>

            {/* Bagian kanan */}
            <div className="flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section
                title="Nama Lengkap"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.name || "-"}
                  </h4>
                )}
              </Section>
              <Section
                title="Nomor Telepon"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.phone_number || "-"}
                  </h4>
                )}
              </Section>
              <Section
                title="Tanggal Lahir"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.birth_date
                      ? new Date(customerData.birth_date).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )
                      : "-"}
                  </h4>
                )}
              </Section>
            </div>
          </div>

          {/* Image */}
          <div className="flex flex-col w-1/3 items-center max-w-[300px] mt-4 lg:mt-0">
            <Link href={""}>
              <Image className="w-[110px] h-[110px]" src={Guest} alt="" />
            </Link>
            <h4 className="hidden lg:block ml-20 w-full text-[12px] text-color-primary mt-4">
              Ukuran Gambar: <span className="font-bold">Max. 1Mb</span>
            </h4>
            <h4 className="hidden lg:block ml-20 w-full text-[12px] text-color-primary mt-2">
              Format Gambar:{" "}
              <span className="font-bold">.JPEG, .JPG, .PNG</span>
            </h4>
          </div>
        </div>
      </EditProfileForm>

      <EditProfileForm
        title="Alamat"
        iconName="Edit Alamat"
        link="edit-address"
      >
        <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-3 lg:pb-0">
          <div className="flex flex-col md:flex-row w-full md:space-x-5 mb-6">
            <div className="flex flex-col mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Jalan" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.street || "-"}
                  </h4>
                )}
              </Section>
              <Section
                title="Kabupaten / Kota"
                className="text-center lg:text-start self-center md:self-start"
              >
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.regency || "-"}
                  </h4>
                )}
              </Section>
              <Section title="Kode Pos" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.post_code || "-"}
                  </h4>
                )}
              </Section>
            </div>

            <div className="flex flex-col mx-auto md:mx-0 w-1/2 lg:mr-12">
              <Section title="Kecamatan" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.district || "-"}
                  </h4>
                )}
              </Section>
              <Section title="Provinsi" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.province || "-"}
                  </h4>
                )}
              </Section>
              <Section title="Catatan" className="text-center lg:text-start self-center md:self-start">
                {loading ? (
                  <Skeleton className="h-4 w-36" />
                ) : (
                  <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                    {customerData?.note || "-"}
                  </h4>
                )}
              </Section>
            </div>
          </div>
        </div>
      </EditProfileForm>
    </div>
  );
}
