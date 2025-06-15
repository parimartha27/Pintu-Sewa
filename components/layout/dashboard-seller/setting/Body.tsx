"use client"

import Image from "next/image"
import Guest from "@/public/guest.svg"
import EditShopProfileForm from "@/components/layout/dashboard-seller/setting/form/form"
import Section from "@/components/fragments/editProfile/Section"
import { useEffect, useState } from "react"
import axios from "axios"
import { Skeleton } from "@/components/ui/skeleton"
import { shopBaseUrl } from "@/types/globalVar"

interface ShopDetailResponse {
  id: string
  name: string
  description: string
  image: string
  street: string
  district: string
  regency: string
  province: string
  post_code: string
  rating: number
  work_hours: string
  email: string
}

const SellerProfileBody = () => {
  const [shopData, setShopData] = useState<ShopDetailResponse>()
  const [loading, setLoading] = useState(true)
  const [, setError] = useState("")
  const [shopId, setShopId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("shopId") : null)

  useEffect(() => {
    if (!shopId) {
      setError("User ID tidak ditemukan di localStorage.")
      setLoading(false)
      return
    }

    axios
      .get(`${shopBaseUrl}/${shopId}`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setShopData(res.data.output_schema)
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
        shopData={shopData}
        loading={loading}
      />
    </>
  )
}

export default SellerProfileBody

interface DefaultLayoutProps {
  shopData?: ShopDetailResponse
  loading: boolean
}

function DefaultLayout({ shopData, loading }: DefaultLayoutProps) {
  return (
    <>
      {" "}
      <EditShopProfileForm
        title='Profil Toko'
        iconName='Edit'
        link='edit'
      >
        <div className='w-full flex justify-center items-center pb-3 xl:pb-0'>
          <div className='flex flex-col md:flex-row items-center mt-6 w-full md:space-x-16 '>
            <div className='flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 lg:mr-12'>
              <Section
                title='Nama Toko'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.name || "-"}</h4>}
              </Section>
              <Section
                title='Jalan'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.street || "-"}</h4>}
              </Section>
              <Section
                title='Kabupaten'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.regency || "-"}</h4>}
              </Section>
              <Section
                title='Kode Pos'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.post_code || "-"}</h4>}
              </Section>

              <Section
                title='Deskripsi'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.description || "-"}</h4>}
              </Section>
            </div>

            {/* Bagian kanan */}
            <div className='flex flex-col mb-0 md:mb-6 mx-auto md:mx-0 w-1/2 lg:mr-12'>
              <Section
                title='Waktu Operasional'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.work_hours || "-"}</h4>}
              </Section>
              <Section
                title='Kecamatan'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.district || "-"}</h4>}
              </Section>
              <Section
                title='Provinsi'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.province || "-"}</h4>}
              </Section>
              <Section
                title='Email'
                className='text-center lg:text-start self-center md:self-start'
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-color-primary'>{shopData?.email || "matthewstore@gmail.com"}</h4>}
              </Section>
              <Section
                title='Deskripsi'
                className='text-center lg:text-start self-center md:self-start text-white '
              >
                {loading ? <Skeleton className='h-4 w-36' /> : <h4 className='text-[12px] xl:text-[16px] font-semibold xl:font-medium text-white'>{shopData?.description || "-"}</h4>}
              </Section>
            </div>
          </div>

          {/* Image */}
          <div className='flex flex-col w-1/3 items-center max-w-[300px] mt-6 lg:mt-0'>
            {loading ? (
              <Skeleton className='w-[110px] h-[110px] rounded-full' />
            ) : (
              <Image
                className='w-[110px] h-[110px] rounded-full'
                src={shopData?.image || Guest}
                alt=''
                width={110}
                height={110}
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
      </EditShopProfileForm>
    </>
  )
}
