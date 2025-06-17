"use client"

import Image from "next/image"
import OpenShop from "@/public/openShop.svg"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import LabelledInput from "@/components/fragments/editProfile/LabelledInput"
import Section from "@/components/fragments/filter/Section"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import TextedCheckbox from "@/components/fragments/TextedCheckbox"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown"
import axios, { Axios } from "axios"
import { shopBaseUrl } from "@/types/globalVar"
import { AlertProps } from "@/types/alert"
import Alert from "../Alert"
import { useAuth } from "@/hooks/auth/useAuth"

interface AddressData {
  id: string
  text: string
}

interface CreateShopRequest {
  customer_id: string | null
  email: string
  street: string
  district: string
  regency: string
  province: string
  post_code: string
  is_same_address: string
}

const CreateShopBody = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [shopName, setShopName] = useState("")
  const [email, setEmail] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [addressType, setAddressType] = useState<"Alamat Saat Ini" | "Alamat Baru">("Alamat Saat Ini")
  const [provinsi, setProvinsi] = useState<AddressData[]>([])
  const [kabupaten, setKabupaten] = useState<AddressData[]>([])
  const [kecamatan, setKecamatan] = useState<AddressData[]>([])
  const [kodePos, setKodePos] = useState<AddressData[]>([])
  const [jalan, setJalan] = useState("")
  const [selectedProvinsi, setSelectedProvinsi] = useState<string | number>("")
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | number>("")
  const [selectedKecamatan, setSelectedKecamatan] = useState<string | number>("")
  const [selectedKodePos, setSelectedKodePos] = useState<string | number>("")
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })

  const [errors, setErrors] = useState({
    shopName: "",
    email: "",
    jalan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    kodePos: "",
    terms: "",
  })

  const { customerId } = useAuth()

  const getTextById = (id: string | number, data: AddressData[]): string => {
    const item = data.find((item) => item.id === id)
    return item ? item.text : ""
  }

  const getIdByText = (text: string, data: AddressData[]): string => {
    const item = data.find((item) => item.text === text)
    return item ? item.id : ""
  }

  const redirectFunction = () => {
    router.push("/terms-and-conditions")
  }

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const postCodeRegex = /^\d{5}$/

    const newErrors = {
      shopName: !shopName.trim() ? "Nama toko tidak boleh kosong" : shopName.length > 100 ? "Nama toko maksimal 100 karakter" : "",
      email: !email.trim() ? "Email tidak boleh kosong" : !emailRegex.test(email) ? "Format email tidak valid" : "",
      jalan: addressType === "Alamat Baru" && !jalan.trim() ? "Jalan tidak boleh kosong" : "",
      provinsi: addressType === "Alamat Baru" && !selectedProvinsi ? "Provinsi harus dipilih" : "",
      kabupaten: addressType === "Alamat Baru" && !selectedKabupaten ? "Kabupaten harus dipilih" : "",
      kecamatan: addressType === "Alamat Baru" && !selectedKecamatan ? "Kecamatan harus dipilih" : "",
      kodePos: addressType === "Alamat Baru" && !selectedKodePos ? "Kode pos harus dipilih" : selectedKodePos && !postCodeRegex.test(getTextById(selectedKodePos, kodePos)) ? "Kode pos harus terdiri dari 5 angka" : "",
      terms: !agreedToTerms ? "Anda harus menyetujui syarat dan ketentuan" : "",
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => !error)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      setAlertState({
        isOpen: true,
        message: "Data yang Anda Input Tidak Valid",
      })
      return
    }

    setIsLoading(true)

    try {
      const shopData: CreateShopRequest = {
        customer_id: customerId,
        name: shopName,
        email: email,
        street: jalan,
        district: getTextById(selectedKecamatan, kecamatan),
        regency: getTextById(selectedKabupaten, kabupaten),
        province: getTextById(selectedProvinsi, provinsi),
        post_code: getTextById(selectedKodePos, kodePos),
        is_same_address: addressType === "Alamat Saat Ini" ? "y" : "n",
      }

      const response = await axios.post(`${shopBaseUrl}/create`, shopData)
      const defaultImage = "https://res.cloudinary.com/dtizgexle/image/upload/v1749995104/logoTOko_fshgim.jpg"

      if (response.data) {
        localStorage.setItem("shopId", response.data.output_schema.id)
        localStorage.setItem("shopName", response.data.output_schema.name)
        localStorage.setItem("shopImage", response.data.output_schema.image)
        setAlertState({
          isOpen: true,
          message: "Toko berhasil dibuat",
          isWrong: false,
        })
        setTimeout(() => {
          router.push("/dashboard-seller")
        }, 3000)
      } else {
        throw new Error("Gagal membuat toko")
      }
    } catch (error) {
      console.error("Error creating shop:", error)
      setAlertState({
        isOpen: true,
        message: "Gagal membuat toko: " + error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch address data functions remain the same but with proper typing
  useEffect(() => {
    const fetchProvinsi = async () => {
      try {
        const response = await fetch("https://alamat.thecloudalert.com/api/provinsi/get/")
        const data = await response.json()
        if (data.status === 200) {
          setProvinsi(data.result)
          setSelectedProvinsi(getIdByText(localStorage.getItem("provinsi") || "1", data.result) || data.result[0].id)
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error)
        setAlertState({
          isOpen: true,
          message: "Gagal mengambil data provinsi: " + error,
        })
      }
    }
    fetchProvinsi()
  }, [])

  useEffect(() => {
    const fetchKabupaten = async () => {
      if (selectedProvinsi) {
        try {
          const response = await fetch(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${selectedProvinsi}`)
          const data = await response.json()
          if (data.status === 200) {
            setKabupaten(data.result)
            setSelectedKabupaten(getIdByText(localStorage.getItem("kabupaten") || "1", data.result) || data.result[0].id)
          }
        } catch (error) {
          console.error("Gagal mengambil data kabupaten:", error)
        }
      }
    }
    fetchKabupaten()
  }, [selectedProvinsi])

  useEffect(() => {
    const fetchKecamatan = async () => {
      if (selectedKabupaten) {
        try {
          const response = await fetch(`https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${selectedKabupaten}`)
          const data = await response.json()
          if (data.status === 200) {
            setKecamatan(data.result)
            setSelectedKecamatan(getIdByText(localStorage.getItem("kecamatan") || "1", data.result) || data.result[0].id)
          }
        } catch (error) {
          console.error("Gagal mengambil data kecamatan:", error)
        }
      }
    }
    fetchKecamatan()
  }, [selectedKabupaten])

  useEffect(() => {
    const fetchKodePos = async () => {
      if (selectedKabupaten && selectedKecamatan) {
        try {
          // console.log("selected kabupaten:" + selectedKabupaten, "selectedKecamatan :" + selectedKecamatan);
          const response = await fetch(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${selectedKabupaten}&d_kecamatan_id=${selectedKecamatan}`)
          const data = await response.json()
          if (data.status === 200) {
            setKodePos(data.result)
            setSelectedKodePos(getIdByText(localStorage.getItem("kodepos") || "1", data.result) || data.result[0].id)
          } else {
            setKodePos([])
            setSelectedKodePos("")
          }
        } catch (error) {
          console.log("Gagal mengambil data kode pos:", error)
        }
      }
    }
    fetchKodePos()
  }, [selectedKabupaten, selectedKecamatan])

  return (
    <>
      {" "}
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "", isWrong: true })}
          isWrong={alertState.isWrong}
        />
      )}{" "}
      <div className='flex justify-center pb-16 px-2 lg:px-6 mx-auto w-full max-w-[1280px] min-h-screen h-auto bg-color-layout pt-12'>
        {/* Left side - Image */}
        <div className='hidden lg:flex flex-col w-1/2 items-center'>
          <h2 className='text-[24px] xl:text-[32px] font-semibold text-color-primary'>Mulai Sewain Barang Di Pintu Sewa</h2>
          <Image
            src={OpenShop}
            alt='openShop'
            className='w-[300px] h-[300px] xl:w-[400px] xl:h-[400px] mt-4'
            width={500}
            height={372}
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className='flex flex-col w-full lg:w-1/2 md:max-h-[815px]'>
          <h2 className='text-[18px] sm:text-[20px] md:text-2xl font-semibold text-color-primary text-center lg:hidden'>Mulai Sewain Barang Di Pintu Sewa</h2>

          <Card className='mt-6 px-6 border-none shadow-lg'>
            <CardHeader className='border-b-[1px] border-b-[#D9D9D9] border-opacity-70 px-0 pb-3'>
              <h2 className='w-full text-sm md:text-base lg:text-xl font-semibold text-color-primary'>Formulir Detail Toko</h2>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className='px-0 pt-3 space-y-5'>
                {/* Shop Name */}
                <LabelledInput
                  label='Nama Toko'
                  htmlFor='nama toko'
                  id='nama toko'
                  type='text'
                  placeholder=''
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                />

                {/* Email */}
                <LabelledInput
                  label='Email'
                  htmlFor='email'
                  id='email'
                  type='text'
                  placeholder='toko@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Address Section */}
                <Section Header='Alamat Toko'>
                  <RadioGroup
                    defaultValue='Alamat Saat Ini'
                    className='flex flex-row space-x-6 mt-1'
                    value={addressType}
                    onValueChange={(value: "Alamat Saat Ini" | "Alamat Baru") => setAddressType(value)}
                  >
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='Alamat Saat Ini'
                        id='Alamat Saat Ini'
                      />
                      <Label
                        htmlFor='Alamat Saat Ini'
                        className='text-[12px] text-color-primary font-medium'
                      >
                        Alamat Saat Ini
                      </Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem
                        value='Alamat Baru'
                        id='Alamat Baru'
                      />
                      <Label
                        htmlFor='Alamat Baru'
                        className='text-[12px] text-color-primary font-medium'
                      >
                        Alamat Baru
                      </Label>
                    </div>
                  </RadioGroup>
                </Section>

                {/* New Address Fields */}
                {addressType === "Alamat Baru" && (
                  <div className='flex flex-col space-y-5'>
                    {/* Street */}
                    <div className='flex flex-col'>
                      {errors.jalan && <p className='text-red-500 text-xs md:text-md'>{errors.jalan}</p>}
                      <LabelledInput
                        label='Jalan'
                        htmlFor='jalan'
                        id='jalan'
                        type='text'
                        value={jalan}
                        onChange={(e) => setJalan(e.target.value)}
                      />
                    </div>

                    {/* District and Regency */}
                    <div className='w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4'>
                      <div className='flex flex-col w-full md:w-1/2'>
                        {errors.kecamatan && <p className='text-red-500 text-xs md:text-md'>{errors.kecamatan}</p>}
                        <LabelledDropdown
                          label='Kecamatan'
                          htmlFor='kecamatan'
                          id='kecamatan'
                          options={kecamatan.map((k) => ({
                            value: k.id,
                            label: k.text,
                          }))}
                          value={selectedKecamatan}
                          onValueChange={setSelectedKecamatan}
                          disabled={!selectedKabupaten}
                        />
                      </div>
                      <div className='flex flex-col w-full md:w-1/2'>
                        {errors.kabupaten && <p className='text-red-500 text-xs md:text-md'>{errors.kabupaten}</p>}
                        <LabelledDropdown
                          label='Kabupaten'
                          htmlFor='kabupaten'
                          id='kabupaten'
                          options={kabupaten.map((k) => ({
                            value: k.id,
                            label: k.text,
                          }))}
                          value={selectedKabupaten}
                          onValueChange={setSelectedKabupaten}
                          disabled={!selectedProvinsi}
                        />
                      </div>
                    </div>

                    {/* Province and Postal Code */}
                    <div className='w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4'>
                      <div className='flex flex-col w-full md:w-1/2'>
                        {errors.provinsi && <p className='text-red-500 text-xs md:text-md'>{errors.provinsi}</p>}
                        <LabelledDropdown
                          label='Provinsi'
                          htmlFor='provinsi'
                          id='provinsi'
                          options={provinsi.map((k) => ({
                            value: k.id,
                            label: k.text,
                          }))}
                          value={selectedProvinsi}
                          onValueChange={setSelectedProvinsi}
                        />
                      </div>
                      <div className='flex flex-col w-full md:w-1/2'>
                        {errors.kodePos && <p className='text-red-500 text-xs md:text-md'>{errors.kodePos}</p>}
                        <LabelledDropdown
                          label='Kode Pos'
                          htmlFor='kodepos'
                          id='kodepos'
                          options={kodePos.map((k) => ({
                            value: k.id,
                            label: k.text,
                          }))}
                          value={selectedKodePos}
                          onValueChange={setSelectedKodePos}
                          disabled={!selectedKecamatan}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Checkbox */}
                <div className='flex flex-col'>
                  {errors.terms && <p className='text-red-500 text-xs md:text-md'>{errors.terms}</p>}
                  <TextedCheckbox
                    className='text-sm text-color-primary'
                    checked={agreedToTerms}
                    onCheckedChange={() => setAgreedToTerms(!agreedToTerms)}
                  >
                    Saya menyetujui{" "}
                    <span
                      onClick={redirectFunction}
                      className='font-semibold underline cursor-pointer'
                    >
                      syarat dan ketentuan
                    </span>{" "}
                    Pembuatan Toko
                  </TextedCheckbox>
                </div>
              </CardContent>

              {/* Submit Button */}
              <CardFooter className='flex justify-center lg:justify-start px-0'>
                <Button
                  className='w-[200px] h-[48px] rounded-xl text-white text-base md:text-sm font-medium py-3 px-6 bg-custom-gradient-tr disabled:opacity-50 hover:opacity-70'
                  type='submit'
                  disabled={!agreedToTerms || isLoading}
                >
                  {isLoading ? "Memproses..." : "Daftar Toko Sekarang"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  )
}

export default CreateShopBody
