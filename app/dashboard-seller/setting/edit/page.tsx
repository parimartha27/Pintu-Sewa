"use client"

import LabelledInput from "@/components/fragments/editProfile/LabelledInput"
import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import EditShopProfileForm from "@/components/layout/dashboard-seller/setting/form/form"
import LoadingPopup from "@/components/layout/LoadingPopUp"
import { ArrowLeft, Upload } from "lucide-react"
import Image from "next/image"
import { useState, ChangeEvent, useEffect } from "react"
import Guest from "@/public/guest.svg"
import axios from "axios"
import { shopBaseUrl } from "@/types/globalVar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

const SettingSeller = () => {
  // State untuk data toko
  const [shopData, setShopData] = useState<ShopDetailResponse>({
    id: "",
    name: "",
    description: "",
    image: "",
    street: "",
    district: "",
    regency: "",
    province: "",
    post_code: "",
    rating: 0,
    work_hours: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [shopId, setShopId] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("shopId") : null)

  // Load initial data
  useEffect(() => {
    if (!shopId) {
      setLoading(false)
      return
    }

    axios
      .get(`${shopBaseUrl}/${shopId}`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setShopData(res.data.output_schema)
        }
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [shopId])

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file size (max 1MB)
      if (file.size > 1024 * 1024) {
        alert("Ukuran gambar melebihi 1MB")
        return
      }

      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png"]
      if (!validTypes.includes(file.type)) {
        alert("Format gambar harus .JPEG, .JPG, atau .PNG")
        return
      }

      // Create preview URL
      const imageUrl = URL.createObjectURL(file)
      setShopData((prev) => ({ ...prev, image: imageUrl }))
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShopData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSubmit(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Here you would typically send the updated data to the server
      // await axios.put(`${shopBaseUrl}/${shopId}`, shopData);

      console.log("Data to be submitted:", shopData)
      alert("Profil toko berhasil diperbarui!")
    } catch (error) {
      console.error("Gagal update profil toko:", error)
      alert("Terjadi kesalahan saat memperbarui profil toko")
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <SellerLayout>
      <div className='flex w-full h-auto pb-12 md:pb-[174px] flex-col'>
         <Link
            href='/dashboard-seller/setting'
            className='flex items-center text-color-secondary mb-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            <span>Kembali</span>
          </Link>
        <EditShopProfileForm title='Edit Profil Toko'>
          <div className='flex flex-col lg:flex-row-reverse w-full space-y-5'>
            {/* Bagian gambar profil */}
            <div className='flex flex-col items-center w-full space-y-6 mt-5'>
              <Image
                className='cursor-pointer w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] xl:w-[200px] xl:h-[200px] rounded-full border object-cover'
                src={shopData.image || Guest}
                alt='Profile'
                width={200}
                height={200}
              />
              <label className='flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark px-4 py-2 rounded-lg cursor-pointer'>
                <Upload
                  size={18}
                  className='mt-1'
                />
                <h4 className='text-color-primaryDark text-[12px]'>Unggah Foto</h4>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>

              <div className='flex flex-col'>
                <h4 className='w-full text-[12px] text-center lg:text-start text-color-primary'>
                  Ukuran Gambar: <span className='font-bold'>Max. 1Mb</span>
                </h4>
                <h4 className='w-full text-[12px] text-center lg:text-start text-color-primary mt-2'>
                  Format Gambar: <span className='font-bold'>.JPEG, .JPG, .PNG</span>
                </h4>
              </div>
            </div>

            {/* Form input fields */}
            <div className='flex flex-col w-full'>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col space-y-5'
              >
                <LabelledInput
                  label='Nama Toko'
                  htmlFor='name'
                  id='name'
                  name='name'
                  type='text'
                  value={shopData.name}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Email'
                  htmlFor='email'
                  id='email'
                  name='email'
                  type='email'
                  value={shopData.email}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Jalan'
                  htmlFor='street'
                  id='street'
                  name='street'
                  type='text'
                  value={shopData.street}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Kecamatan'
                  htmlFor='district'
                  id='district'
                  name='district'
                  type='text'
                  value={shopData.district}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Kabupaten'
                  htmlFor='regency'
                  id='regency'
                  name='regency'
                  type='text'
                  value={shopData.regency}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Provinsi'
                  htmlFor='province'
                  id='province'
                  name='province'
                  type='text'
                  value={shopData.province}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Kode Pos'
                  htmlFor='post_code'
                  id='post_code'
                  name='post_code'
                  type='text'
                  value={shopData.post_code}
                  onChange={handleInputChange}
                />

                <LabelledInput
                  label='Waktu Operasional'
                  htmlFor='work_hours'
                  id='work_hours'
                  name='work_hours'
                  type='text'
                  value={shopData.work_hours}
                  onChange={handleInputChange}
                  placeholder='Contoh: 08:00 - 17:00'
                />

                <div className='flex flex-col space-y-2'>
                  <label className='text-[12px] text-color-primary font-medium'>Deskripsi Toko</label>
                  <textarea
                    id='description'
                    name='description'
                    className='w-full h-32 p-2 border rounded-md text-[12px] text-color-primary'
                    value={shopData.description}
                    onChange={handleInputChange}
                  />
                </div>

                {loadingSubmit && <LoadingPopup />}
                <Button
                  type='submit'
                  className='w-[200px] h-[48px] mt-3 text-white text-[14px] self-center lg:self-start font-medium bg-custom-gradient-tr hover:opacity-90'
                >
                  Simpan Perubahan
                </Button>
              </form>
            </div>
          </div>
        </EditShopProfileForm>
      </div>
    </SellerLayout>
  )
}

export default SettingSeller
