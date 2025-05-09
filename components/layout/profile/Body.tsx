"use client";

import Image from "next/image";
import Guest from "@/public/guest.svg";
import EditProfileForm from "@/components/layout/profile/Form";
import Section from "@/components/fragments/editProfile/Section";
import ProfileSidebarLayout from "../ProfileSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { customerBaseUrl } from "@/types/globalVar";
import { ProfileResponse } from "@/types/profile";
import { useAuth } from "@/hooks/auth/useAuth";
import { X } from "lucide-react";

const ProfileBody = () => {
  const { customerId } = useAuth();

  // useEffect(() => {
  //   const storedCustomerId = localStorage.getItem("customerId")
  //   if (!storedCustomerId) {
  //     setError("User ID tidak ditemukan di localStorage.")
  //     setLoading(false)
  //     return
  //   }
  //   setCustomerId(storedCustomerId)
  // }, [])
  const [customerData, setCustomerData] = useState<ProfileResponse>();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${customerBaseUrl}/${customerId}`);

        if (response.data.error_schema?.error_code === "PS-00-000") {
          setCustomerData(response.data.output_schema);
          console.log(response.data.output_schema);
          setError("");
        } else {
          setError("Gagal fetch data customer.");
        }
      } catch (err) {
        console.error(err);
        setError("Terjadi kesalahan saat fetching.");
      } finally {
        setLoading(false);
      }
    };

    if (customerId) fetchCustomerData();
  }, [customerId]);

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
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
              src={customerData?.image || Guest}
              alt="Profile Full Size"
              width={300}
              height={300}
              className="w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white"
            />
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-8 pb-12 md:pb-[325px]">
        <EditProfileForm
          title="Informasi Personal"
          iconName="Edit"
          link="edit-profile"
        >
          <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center pb-3 xl:pb-0">
            <div className="flex flex-col md:flex-row items-center mt-6 w-full md:w-2/3 md:space-x-16 lg:space-x-30">
              <div className="flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12">
                <Section
                  title="Username"
                  className="text-center lg:text-start self-center md:self-start"
                >
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary break-words max-w-[300px]">
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
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary break-words max-w-[300px]">
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
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary break-words max-w-[300px]">
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
            <div className="flex flex-col w-1/3 items-center max-w-[300px] mt-6 lg:mt-0">
              {loading ? (
                <Skeleton className="w-[110px] h-[110px] rounded-full" />
              ) : (
                <Image
                  onClick={() => setIsModalOpen(true)}
                  width={110}
                  height={110}
                  className="w-[110px] h-[110px] rounded-full object-cover hover:cursor-pointer"
                  src={customerData?.image || Guest}
                  alt=""
                />
              )}

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
                <Section
                  title="Jalan"
                  className="text-center lg:text-start self-center md:self-start"
                >
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary break-words max-w-[300px]">
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
                <Section
                  title="Kode Pos"
                  className="text-center lg:text-start self-center md:self-start"
                >
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
                <Section
                  title="Kecamatan"
                  className="text-center lg:text-start self-center md:self-start"
                >
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                      {customerData?.district || "-"}
                    </h4>
                  )}
                </Section>
                <Section
                  title="Provinsi"
                  className="text-center lg:text-start self-center md:self-start"
                >
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary">
                      {customerData?.province || "-"}
                    </h4>
                  )}
                </Section>
                <Section
                  title="Catatan"
                  className="text-center lg:text-start self-center md:self-start"
                >
                  {loading ? (
                    <Skeleton className="h-4 w-36" />
                  ) : (
                    <h4 className="text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary break-words max-w-[300px]">
                      {customerData?.notes || "-"}
                    </h4>
                  )}
                </Section>
              </div>
            </div>
          </div>
        </EditProfileForm>
      </div>
    </>
  );
}
