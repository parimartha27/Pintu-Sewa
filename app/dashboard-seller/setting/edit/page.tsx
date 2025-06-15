"use client"

import { useState, ChangeEvent, useEffect, FormEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import axios from "axios"
import { ArrowLeft, Upload, X } from "lucide-react"

import { shopBaseUrl } from "@/types/globalVar"
import dataUrlToFile from "@/hooks/useConvertStringToFile"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import EditShopProfileForm from "@/components/layout/dashboard-seller/setting/form/form"
import LabelledInput from "@/components/fragments/editProfile/LabelledInput"
import { Button } from "@/components/ui/button"
import LoadingPopup from "@/components/layout/LoadingPopUp"
import Alert from "@/components/layout/Alert"
import ProfileFormSkeleton from "@/components/layout/profile/edit-profile/ProfileFormSkeleton"
import Guest from "@/public/guest.svg"

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

interface AlertProps {
  isOpen: boolean
  message: string
  isWrong?: boolean
}

const SettingSeller = () => {
  const router = useRouter()
  const shopId = typeof window != "undefined" ? localStorage.getItem("shopId") : null

  const [shopData, setShopData] = useState<Omit<ShopDetailResponse, "id" | "rating">>({
    name: "",
    description: "",
    image: "",
    street: "",
    district: "",
    regency: "",
    province: "",
    post_code: "",
    work_hours: "",
    email: "",
  })
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState<string>("")

  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })

  useEffect(() => {
    const fetchShopData = async () => {
      if (!shopId) {
        setLoading(false)
        setAlertState({
          isOpen: true,
          message: "ID Toko tidak ditemukan. Silakan login kembali.",
          isWrong: true,
        })
        return
      }

      try {
        const response = await axios.get<{ output_schema: ShopDetailResponse }>(`${shopBaseUrl}/${shopId}`)
        const data = response.data.output_schema
        if (data) {
          setShopData(data)
        }
      } catch (error) {
        console.error("Gagal mengambil data toko:", error)
        setAlertState({
          isOpen: true,
          message: "Gagal mengambil data toko. Coba lagi nanti.",
          isWrong: true,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchShopData()
  }, [shopId])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShopData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validTypes = ["image/jpeg", "image/jpg", "image/png"]
    if (!validTypes.includes(file.type)) {
      setAlertState({
        isOpen: true,
        message: "Format gambar harus .JPEG, .JPG, atau .PNG",
        isWrong: true,
      })
      return
    }

    if (file.size > 1024 * 1024) {
      setAlertState({
        isOpen: true,
        message: "Ukuran gambar maksimal 1MB.",
        isWrong: true,
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result as string
      setProfileImage(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const validateForm = (): boolean => {
    if (!shopData.name.trim()) {
      setAlertState({
        isOpen: true,
        message: "Nama toko tidak boleh kosong.",
        isWrong: true,
      })
      return false
    }
    if (!shopData.email.trim() || !/\S+@\S+\.\S+/.test(shopData.email)) {
      setAlertState({
        isOpen: true,
        message: "Format email tidak valid.",
        isWrong: true,
      })
      return false
    }
    if (!shopData.street.trim()) {
      setAlertState({
        isOpen: true,
        message: "Alamat jalan tidak boleh kosong.",
        isWrong: true,
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoadingSubmit(true)

    try {
      const formData = new FormData()
      formData.append("id", shopId || "")
      formData.append("name", shopData.name)
      formData.append("description", shopData.description)
      formData.append("email", shopData.email)
      formData.append("street", shopData.street)
      formData.append("district", shopData.district)
      formData.append("regency", shopData.regency)
      formData.append("province", shopData.province)
      formData.append("post_code", shopData.post_code)
      formData.append("work_hours", shopData.work_hours)

      if (profileImage) {
        const imageFile = await dataUrlToFile(profileImage, "shop-profile.jpg")
        formData.append("image", imageFile)
      }

      const response = await axios.put(`${shopBaseUrl}/edit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.data.error_schema?.error_message === "SUCCESS") {
        localStorage.setItem("shopImage", response.data.output_schema.image)
        localStorage.setItem("shopName", response.data.output_schema.name)
        setAlertState({
          isOpen: true,
          message: "Profil toko berhasil diperbarui!",
          isWrong: false,
        })
        setTimeout(() => router.push("/dashboard-seller/setting"), 2000)
      } else {
        throw new Error(response.data.error_schema?.error_message || "Terjadi kesalahan pada server")
      }
    } catch (error) {
      console.error("Gagal update profil toko:", error)

      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.data?.error_schema?.error_code
        const errorMessage = error.response?.data?.error_schema?.error_message || "Terjadi kesalahan saat menghubungi server."

        // Handle specific error codes if needed
        if (errorCode === "SHOP-001") {
          setAlertState({
            isOpen: true,
            message: "Email telah terdaftar",
            isWrong: true,
          })
        } else if (errorCode === "SHOP-002") {
          setAlertState({
            isOpen: true,
            message: "Nama toko telah terdaftar",
            isWrong: true,
          })
        } else {
          setAlertState({
            isOpen: true,
            message: `Gagal: ${errorMessage}`,
            isWrong: true,
          })
        }
      } else {
        setAlertState({
          isOpen: true,
          message: "Terjadi kesalahan tidak diketahui",
          isWrong: true,
        })
      }
    } finally {
      setLoadingSubmit(false)
    }
  }

  return (
    <SellerLayout>
      {alertState.isOpen && (
        <Alert
          isOpen={alertState.isOpen}
          message={alertState.message}
          isWrong={alertState.isWrong}
          onClose={() => setAlertState({ ...alertState, isOpen: false })}
        />
      )}

      {/* Modal untuk preview gambar */}
      {isModalOpen && (
        <div className='fixed mt-0 inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50'>
          <div className='relative flex justify-center items-center'>
            <button
              className='absolute -top-10 -right-11 z-50 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition'
              onClick={() => setIsModalOpen(false)}
            >
              <X size={20} />
            </button>

            <Image
              src={profileImage || shopData.image || Guest}
              alt='Profile Full Size'
              width={300}
              height={300}
              className='w-[150px] h-[150px] md:w-[300px] md:h-[300px] rounded-full object-cover aspect-square border-2 border-white'
            />
          </div>
        </div>
      )}

      {loading ? (
        <ProfileFormSkeleton />
      ) : (
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
                  src={profileImage || shopData.image || Guest}
                  alt='Profile Toko'
                  width={200}
                  height={200}
                  onClick={() => setIsModalOpen(true)}
                />
                <label className='flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark px-4 py-2 rounded-lg cursor-pointer'>
                  <Upload
                    size={18}
                    className='mt-1'
                  />
                  <h4 className='text-color-primaryDark text-[12px]'>Unggah Foto</h4>
                  <input
                    type='file'
                    accept='image/jpeg,image/jpg,image/png'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </label>
                <div className='flex flex-col text-center lg:text-start'>
                  <h4 className='text-[12px] text-color-primary'>
                    Ukuran Gambar: <span className='font-bold'>Max. 1Mb</span>
                  </h4>
                  <h4 className='text-[12px] text-color-primary mt-2'>
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
                    type='text'
                    value={shopData.name}
                    onChange={(e) => setShopData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                  <LabelledInput
                    label='Email'
                    htmlFor='email'
                    id='email'
                    name='email'
                    type='email'
                    value={shopData.email}
                    onChange={(e) => setShopData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <LabelledInput
                    label='Jalan'
                    htmlFor='street'
                    id='street'
                    name='street'
                    type='text'
                    value={shopData.street}
                    onChange={(e) => setShopData((prev) => ({ ...prev, street: e.target.value }))}
                  />
                  <LabelledInput
                    label='Kecamatan'
                    htmlFor='district'
                    id='district'
                    name='district'
                    type='text'
                    value={shopData.district}
                    onChange={(e) => setShopData((prev) => ({ ...prev, district: e.target.value }))}
                  />
                  <LabelledInput
                    label='Kabupaten'
                    htmlFor='regency'
                    id='regency'
                    name='regency'
                    type='text'
                    value={shopData.regency}
                    onChange={(e) => setShopData((prev) => ({ ...prev, regency: e.target.value }))}
                  />
                  <LabelledInput
                    label='Provinsi'
                    htmlFor='province'
                    id='province'
                    name='province'
                    type='text'
                    value={shopData.province}
                    onChange={(e) => setShopData((prev) => ({ ...prev, province: e.target.value }))}
                  />
                  <LabelledInput
                    label='Kode Pos'
                    htmlFor='post_code'
                    id='post_code'
                    name='post_code'
                    type='text'
                    value={shopData.post_code}
                    onChange={(e) => setShopData((prev) => ({ ...prev, post_code: e.target.value }))}
                  />
                  <LabelledInput
                    label='Waktu Operasional'
                    htmlFor='work_hours'
                    id='work_hours'
                    name='work_hours'
                    type='text'
                    value={shopData.work_hours}
                    onChange={(e) => setShopData((prev) => ({ ...prev, work_hours: e.target.value }))}
                  />

                  {/* Textarea Deskripsi */}
                  <div className='flex flex-col space-y-2'>
                    <label className='text-[12px] text-color-primary font-medium'>Deskripsi Toko</label>
                    <textarea
                      id='description'
                      name='description'
                      className='w-full h-32 p-2 border rounded-md text-[12px] text-color-primary'
                      value={shopData.description}
                      onChange={(e) => setShopData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  {loadingSubmit && <LoadingPopup />}

                  <Button
                    type='submit'
                    className='w-[200px] h-[48px] mt-3 text-white text-[14px] self-center lg:self-start font-medium bg-custom-gradient-tr hover:opacity-90'
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </form>
              </div>
            </div>
          </EditShopProfileForm>
        </div>
      )}
    </SellerLayout>
  )
}

export default SettingSeller
