"use client"

import Image from "next/image"
import Guest from "@/public/guest.svg"
import EditProfileForm from "@/components/layout/profile/Form"
import Section from "@/components/fragments/editProfile/Section"
import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { customerBaseUrl } from "@/types/globalVar"
import { ProfileResponse } from "@/types/profile"

const SellerProfileBody = () => {
  const customerId = typeof window !== "undefined" ? localStorage.getItem("customerId") : null
  const [customerData, setCustomerData] = useState<ProfileResponse>()
  const [loading, setLoading] = useState(true)
  const [, setError] = useState("")

  useEffect(() => {
    if (!customerId) {
      setError("User ID tidak ditemukan di localStorage.")
      setLoading(false)
      return
    }

    axios
      .get(`${customerBaseUrl}/${customerId}`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setCustomerData(res.data.output_schema)
          console.log(res.data.output_schema)
        } else {
          setError("Gagal fetch data customer.")
        }
      })
      .catch((err) => {
        console.error(err)
        setError("Terjadi kesalahan saat fetching.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <DefaultLayout
        customerData={customerData}
        loading={loading}
      />
    </>
  )
}

export default SellerProfileBody

interface DefaultLayoutProps {
  customerData?: ProfileResponse
  loading: boolean
}

function DefaultLayout({ customerData, loading }: DefaultLayoutProps) {
  return (
    <>
      {" "}
      <EditProfileForm
        title='Profile Toko'
        iconName='Edit'
        link='edit-profile'
      >
        <div className='w-full flex justify-center items-center pb-3 xl:pb-0'>
          <div className='flex flex-col md:flex-row items-center mt-6 w-full md:space-x-16 '>
            <div className='flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 lg:mr-12'>
              <Section
                title='Username'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{customerData?.username || "-"}</h4>}
              </Section>
              <Section
                title='Email'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{customerData?.email || "-"}</h4>}
              </Section>
              <Section
                title='Jenis Kelamin'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{customerData?.gender || "-"}</h4>}
              </Section>
            </div>

            {/* Bagian kanan */}
            <div className='flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12'>
              <Section
                title='Nama Lengkap'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{customerData?.name || "-"}</h4>}
              </Section>
              <Section
                title='Nomor Telepon'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{customerData?.phone_number || "-"}</h4>}
              </Section>
              <Section
                title='Tanggal Lahir'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? (
                  <Skeleton className='h-4 w-36' />
                ) : (
                  <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>
                    {customerData?.birth_date
                      ? new Date(customerData.birth_date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </h4>
                )}
              </Section>
            </div>
          </div>

          {/* Image */}
          <div className='flex flex-col w-1/3 items-center max-w-[300px] mt-6 lg:mt-0'>
            {loading ? (
              <Skeleton className='w-[110px] h-[110px] rounded-full' />
            ) : (
              <Image
                className='w-[110px] h-[110px]'
                src={customerData?.image || Guest}
                alt=''
              />
            )}

            <h4 className='hidden lg:block ml-20 w-full text-[12px] text-color-primary mt-4'>
              Ukuran Gambar: <span className='font-bold'>Max. 1Mb</span>
            </h4>
            <h4 className='hidden lg:block ml-20 w-full text-[12px] text-color-primary mt-2'>
              Format Gambar: <span className='font-bold'>.JPEG, .JPG, .PNG</span>
            </h4>
          </div>
        </div>
      </EditProfileForm>
    </>
  )
}
