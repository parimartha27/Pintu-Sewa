"use client"

import LabelledInput from "@/components/fragments/editProfile/LabelledInput"
import EditProfileForm from "../Form"
import LabelledDropdown from "@/components/fragments/editProfile/LabelledDropdown"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { AddressProps, AddressResponseProps } from "@/types/address"
import { customerBaseUrl } from "@/types/globalVar"
import AddressFormSkeleton from "./AddressFormSkeleton"
import { EditAddressRequestProps, EditAddressResponseProps } from "@/types/editAddress"

interface dataAlamatProps {
  id: string
  text: string
}

const EditAddressBody = () => {
  const router = useRouter()
  const [addressData, setAddressData] = useState<AddressProps>()
  const [customerId, setCustomerId] = useState("")
  const [isClient, setIsClient] = useState(false)
  const [provinsi, setProvinsi] = useState<dataAlamatProps[]>([])
  const [kabupaten, setKabupaten] = useState<dataAlamatProps[]>([])
  const [kecamatan, setKecamatan] = useState<dataAlamatProps[]>([])
  const [kodePos, setKodePos] = useState<dataAlamatProps[]>([])
  const [jalan, setJalan] = useState("")
  const [catatan, setCatatan] = useState("")
  const [selectedProvinsi, setSelectedProvinsi] = useState<string | number>("")
  const [selectedKabupaten, setSelectedKabupaten] = useState<string | number>("")
  const [selectedKecamatan, setSelectedKecamatan] = useState<string | number>("")
  const [selectedKodePos, setSelectedKodePos] = useState<string | number>("")

  const [, setErrors] = useState({
    jalan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
  })

  const [loading, setLoading] = useState(true)
  const [loadingSubmit, setLoadingSubmit] = useState(false)

  // First detect if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Then access localStorage only when on the client
  useEffect(() => {
    if (isClient) {
      const storedCustomerId = localStorage.getItem("customerId") || ""
      setCustomerId(storedCustomerId)
    }
  }, [isClient])

  useEffect(() => {
    const fetchData = async () => {
      if (!customerId) return // Don't fetch if customerId isn't available yet

      try {
        setLoading(true)
        const addressRes = await axios.get<AddressResponseProps>(`${customerBaseUrl}/address/${customerId}`)
        const resOutputSchema = addressRes.data.output_schema
        console.log("address schema: ", resOutputSchema)
        setAddressData(resOutputSchema)
        setJalan(resOutputSchema.street)
        setCatatan(resOutputSchema.notes || "")
      } catch {
        console.log("error fetching alamat di edit alamat")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [customerId])

  const getTextById = (id: string | number, data: dataAlamatProps[]) => {
    const item = data.find((item) => item.id === id.toString())
    return item ? item.text : ""
  }

  const getIdByText = (text: string, data: dataAlamatProps[]): string | number => {
    const item = data.find((item) => item.text === text)
    return item ? item.id : ""
  }

  const validateForm = () => {
    const newErrors = {
      jalan: jalan.trim() ? "" : "Jalan tidak boleh kosong",
      provinsi: selectedProvinsi ? "" : "Provinsi harus dipilih",
      kabupaten: selectedKabupaten ? "" : "Kabupaten harus dipilih",
      kecamatan: selectedKecamatan ? "" : "Kecamatan harus dipilih",
    }

    setErrors(newErrors)

    const firstError = Object.values(newErrors).find((msg) => msg !== "")
    if (firstError) {
      alert(firstError)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoadingSubmit(true)
    const payload: EditAddressRequestProps = {
      id: customerId,
      street: jalan,
      district: getTextById(selectedKecamatan, kecamatan),
      regency: getTextById(selectedKabupaten, kabupaten),
      province: getTextById(selectedProvinsi, provinsi),
      post_code: getTextById(selectedKodePos, kodePos),
      notes: catatan,
    }

    try {
      const response = await axios.put<EditAddressResponseProps>(`${customerBaseUrl}/edit-address`, payload)
      if (response.data.error_schema.error_message === "SUCCESS") {
        setLoadingSubmit(false)
        alert("Berhasil mengedit alamat")
        router.push("/profile")
      } else {
        alert("Gagal mengedit alamat")
      }
    } catch (e) {
      alert("Gagal: " + e)
      setLoadingSubmit(false)
    }
  }

  useEffect(() => {
    if (!addressData) return
    const fetchProvinsi = async () => {
      try {
        const response = await axios.get("https://alamat.thecloudalert.com/api/provinsi/get/")
        const data = response.data
        if (data.status === 200) {
          setProvinsi(data.result)
          setSelectedProvinsi(getIdByText(addressData?.province || "", data.result) || data.result[0].id)
        }
      } catch (error) {
        console.error("Gagal mengambil data provinsi:", error)
      }
    }
    fetchProvinsi()
  }, [addressData])

  useEffect(() => {
    const fetchKabupaten = async () => {
      if (!selectedProvinsi || !addressData) return
      if (selectedProvinsi) {
        try {
          const response = await fetch(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${selectedProvinsi}`)
          const data = await response.json()
          if (data.status === 200) {
            setKabupaten(data.result)
            setSelectedKabupaten(getIdByText(addressData?.regency || "", data.result) || data.result[0].id)
          }
        } catch (error) {
          console.error("Gagal mengambil data kabupaten:", error)
        }
      }
    }
    fetchKabupaten()
  }, [selectedProvinsi, addressData])

  useEffect(() => {
    const fetchKecamatan = async () => {
      if (!selectedKabupaten || !addressData) return
      if (selectedKabupaten) {
        try {
          const response = await fetch(`https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${selectedKabupaten}`)
          const data = await response.json()
          if (data.status === 200) {
            setKecamatan(data.result)
            setSelectedKecamatan(getIdByText(addressData?.district || "", data.result) || data.result[0].id)
          }
        } catch (error) {
          console.error("Gagal mengambil data kecamatan:", error)
        }
      }
    }
    fetchKecamatan()
  }, [selectedKabupaten, addressData])

  useEffect(() => {
    if (!selectedKabupaten || !selectedKecamatan || !addressData) return
    const fetchKodePos = async () => {
      if (selectedKabupaten && selectedKecamatan) {
        try {
          const response = await fetch(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${selectedKabupaten}&d_kecamatan_id=${selectedKecamatan}`)
          const data = await response.json()
          if (data.status === 200) {
            setKodePos(data.result)
            setSelectedKodePos(getIdByText(addressData?.post_code || "", data.result) || data.result[0].id)
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
  }, [selectedKabupaten, selectedKecamatan, addressData])

  // Show loading skeleton while waiting for client-side rendering
  if (!isClient || loading) {
    return (
      <div className='flex w-full h-auto pb-12 md:pb-[462px]'>
        <EditProfileForm title='Edit Alamat'>
          <div className='flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full'>
            <AddressFormSkeleton />
          </div>
        </EditProfileForm>
      </div>
    )
  }

  return (
    <div className='flex w-full h-auto pb-12 md:pb-[462px]'>
      <EditProfileForm title='Edit Alamat'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}
          className='flex flex-col lg:flex-row mt-5 space-y-5 lg:space-y-0 lg:space-x-10 w-full'
        >
          {/* KIRI */}
          <div className='flex flex-col space-y-5 lg:w-1/2'>
            <div className='flex flex-col'>
              <LabelledInput
                label='Jalan'
                htmlFor='jalan'
                id='jalan'
                type='text'
                value={jalan}
                onChange={(e) => setJalan(e.target.value)}
              />
            </div>
            <div className='flex flex-col'>
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
            <div className='flex flex-col'>
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
            {loadingSubmit && <div className='hidden lg:block h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-color-primaryDark'></div>}
            <Button
              onClick={handleSubmit}
              type='submit'
              className='hidden lg:block w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90'
            >
              Simpan Perubahan
            </Button>
          </div>

          {/* KANAN */}
          <div className='flex flex-col space-y-5 lg:w-1/2'>
            <div className='flex flex-col'>
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
            <div className='flex flex-col'>
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
            <div className='flex flex-col'>
              <LabelledInput
                label='Catatan'
                htmlFor='catatan'
                id='catatan'
                type='text'
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
              />
            </div>
            {loadingSubmit && <div className='lg:hidden self-center h-5 w-5 animate-spin rounded-full border-t-2 border-b-2 border-color-primaryDark'></div>}
            <Button
              onClick={handleSubmit}
              type='submit'
              className='lg:hidden self-center lg:self-start w-[200px] h-[48px] mt-3 text-white text-[14px] font-medium bg-custom-gradient-tr hover:opacity-90'
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </EditProfileForm>
    </div>
  )
}

export default EditAddressBody
