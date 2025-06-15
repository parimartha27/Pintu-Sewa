"use client"

import React, { useState, useEffect } from "react"
import { useForm, Controller, useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import axios from "axios"
import { X, Upload } from "lucide-react"
import { AlertProps } from "@/types/alert"
import Alert from "@/components/layout/Alert"
import { productBaseUrl } from "@/types/globalVar"

interface ProductFormData {
  name: string
  category: string
  photos: string[]
  stock: number
  price: number
  description: string
  dimensions: {
    length: number
    width: number
    height: number
    weight: number
  }
  rentalOptions: {
    daily: boolean
    weekly: boolean
    monthly: boolean

    dailyPrice: number
    weeklyPrice: number
    monthlyPrice: number

    deposit: number
  }
  minimumRentalDuration: number
  rentToBuy: {
    is_rnb: boolean

    buy_price: number
  }
  shippingService: string
}

export interface EditProductRequest {
  shop_id: string | null
  name: string
  category: string
  rent_category: number
  is_rnb: boolean
  buy_price?: number
  deposit: number
  weight: number
  height: number
  width: number
  length: number
  daily_price?: number
  weekly_price?: number
  monthly_price?: number
  description: string
  condition_description: string
  stock: number
  min_rented: number
  status: string
  image: string
}

export default function EditProductForm() {
  const [shopId, setShopId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
    onClose() {
      window.location.href = "/dashboard-seller/product/add"
    },
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedShopId = localStorage.getItem("shopId")
      if (storedShopId) {
        setShopId(storedShopId)
      } else {
        setAlertState({
          isOpen: true,
          message: "ID Toko tidak ditemukan. Harap login kembali.",
          isWrong: true,
        })
      }
    }
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    mode: "onChange",

    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      price: 0,
      description: "",
      dimensions: { length: 0, width: 0, height: 0, weight: 0 },
      rentalOptions: {
        daily: false,
        weekly: false,
        monthly: false,
        dailyPrice: 0,
        weeklyPrice: 0,
        monthlyPrice: 0,
        deposit: 0,
      },
      minimumRentalDuration: 1,
      rentToBuy: {
        is_rnb: false,
        buy_price: 0,
      },
      shippingService: "",
    },
  })

  const watchRentalOptions = useWatch({ control, name: "rentalOptions" })
  const watchRentToBuy = useWatch({ control, name: "rentToBuy.is_rnb" })

  const calculateRentalType = () => {
    let type = 0

    if (watchRentalOptions.daily) type += 1
    if (watchRentalOptions.weekly) type += 2
    if (watchRentalOptions.monthly) type += 4
    return type
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!shopId) {
      setAlertState({ isOpen: true, message: "Tidak dapat mengirim, ID Toko tidak valid.", isWrong: true })
      return
    }
    setIsSubmitting(true)
    try {
      const payload: EditProductRequest = {
        shop_id: shopId,
        name: data.name,
        category: data.category,
        stock: data.stock,
        description: data.description,
        condition_description: data.description,
        rent_category: calculateRentalType(),
        is_rnb: data.rentToBuy.is_rnb,
        buy_price: data.rentToBuy.is_rnb ? data.rentToBuy.buy_price : undefined,
        deposit: data.rentalOptions.deposit,
        min_rented: data.minimumRentalDuration,
        length: data.dimensions.length,
        width: data.dimensions.width,
        height: data.dimensions.height,
        weight: data.dimensions.weight,

        daily_price: watchRentalOptions.daily ? data.rentalOptions.dailyPrice : undefined,
        weekly_price: watchRentalOptions.weekly ? data.rentalOptions.weeklyPrice : undefined,
        monthly_price: watchRentalOptions.monthly ? data.rentalOptions.monthlyPrice : undefined,
        status: "AVAIABLE",
        image: uploadedImages.length > 0 ? uploadedImages[0] : "",
      }

      // console.log("Data Asli dari Form (terstruktur):", data)
      // console.log("Payload yang Dikirim ke Backend:", payload)

      const response = await axios.post(`${productBaseUrl}/add`, payload)

      setAlertState({
        isOpen: true,
        message: "Sukses Menambahkan Produk",
        isWrong: false,
      })
    } catch (error) {
      console.error("Error adding product:", error)
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || String(error.message) : String(error)
      setAlertState({ isOpen: true, message: `Gagal Menambahkan Produk: ${errorMessage}`, isWrong: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImages = [...uploadedImages]
    for (let i = 0; i < files.length; i++) {
      if (newImages.length < 5) {
        const file = files[i]
        const imageUrl = URL.createObjectURL(file)
        newImages.push(imageUrl)
      }
    }
    setUploadedImages(newImages)
  }

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages]
    newImages.splice(index, 1)
    setUploadedImages(newImages)
  }

  return (
    <main className='container'>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "", isWrong: true })}
          isWrong={alertState.isWrong}
        />
      )}
      <h1 className='text-2xl font-semibold mb-6'>Tambah Produk</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Informasi Produk</h2>
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='name'
                className='font-medium'
              >
                Nama Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Nama produk maksimal 25 karakter. Dengan minimal jumlah produk, tips produk yang relevan produk</div>
            <Input
              id='name'
              className='w-full'
              placeholder='Contoh: Mobil Toyota Innova Hitam Tahun 2024'
              {...register("name", { required: true })}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>Nama produk tidak boleh kosong</p>}
          </div>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='category'
                className='font-medium'
              >
                Kategori Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Pilih kategori yang sesuai dengan produk yang akan ditawarkan</div>
            <Controller
              name='category'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Pilih Kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Papan Permainan'>Papan Permainan</SelectItem>
                    <SelectItem value='Alat Kesehatan'>Alat Kesehatan</SelectItem>
                    <SelectItem value='Motor'>Motor</SelectItem>
                    <SelectItem value='Pakaian Wanita'>Pakaian Wanita</SelectItem>
                    <SelectItem value='Peralatan Bayi'>Peralatan Bayi</SelectItem>
                    <SelectItem value='Peralatan Sekolah'>Peralatan Sekolah</SelectItem>
                    <SelectItem value='Pakaian Pria'>Pakaian Pria</SelectItem>
                    <SelectItem value='Furnitur'>Furnitur</SelectItem>
                    <SelectItem value='Peralatan Rumah'>Peralatan Rumah</SelectItem>
                    <SelectItem value='Elektronik'>Elektronik</SelectItem>
                    <SelectItem value='Alat Tukang'>Alat Tukang</SelectItem>
                    <SelectItem value='Mobil'>Mobil</SelectItem>
                    <SelectItem value='Handphone'>Handphone</SelectItem>
                    <SelectItem value='Komputer'>Komputer</SelectItem>
                    <SelectItem value='Akun subskripsi'>Akun subskripsi</SelectItem>
                    <SelectItem value='Alat Olahraga'>Alat Olahraga</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className='text-red-500 text-sm mt-1'>Kategori produk harus dipilih</p>}
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Detail Produk</h2>
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='photos'
                className='font-medium'
              >
                Foto Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Masukkan foto yang sesuai dan menggambarkan produk yang akan disewakan</div>
            <div className='text-xs text-gray-500 mb-1'>
              Format Gambar: JPEG, JPG, PNG <br />
              Resolusi Gambar: Min 300 × 300 px <br />
              Ukuran Gambar: Max 1 MB
            </div>
            <div className='grid grid-cols-5 gap-4 mb-4'>
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className='border border-dashed border-gray-300 rounded flex items-center justify-center h-24 relative'
                >
                  {uploadedImages[index] ? (
                    <>
                      <img
                        src={uploadedImages[index]}
                        alt={`Product ${index + 1}`}
                        className='h-full w-full object-cover rounded'
                      />
                      <button
                        type='button'
                        onClick={() => removeImage(index)}
                        className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : index === uploadedImages.length ? (
                    <label className='cursor-pointer flex flex-col items-center justify-center w-full h-full'>
                      <Upload
                        size={24}
                        className='text-gray-400'
                      />
                      <input
                        type='file'
                        accept='image/jpeg,image/png,image/jpg'
                        className='hidden'
                        onChange={handleImageUpload}
                      />
                    </label>
                  ) : (
                    <div className='text-gray-300'>
                      <Upload size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {uploadedImages.length === 0 && <p className='text-red-500 text-sm'>Minimal satu foto produk diperlukan</p>}
          </div>
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='stock'
                className='font-medium'
              >
                Stok Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Tambahkan stok secara kasat Biar ketersediaan stok produk yang bisa untuk disewa</div>
            <Input
              id='stock'
              type='text'
              inputMode='numeric'
              placeholder='0'
              className='w-full'
              {...register("stock", {
                required: true,
                min: 1,
                valueAsNumber: true,
              })}
              onKeyDown={(e) => {
                const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                  e.preventDefault()
                }
              }}
            />
            {errors.stock && <p className='text-red-500 text-sm mt-1'>Stok produk tidak boleh 0 atau kosong</p>}
          </div>
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label className='font-medium'>
                Dimensi Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Input ukuran dimensi produk yang akan disewakan</div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div>
                <Label htmlFor='length'>Panjang (cm)</Label>
                <Input
                  id='length'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='w-full'
                  {...register("dimensions.length", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
                {errors.dimensions?.length && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='width'>Lebar (cm)</Label>
                <Input
                  id='width'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='w-full'
                  {...register("dimensions.width", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
                {errors.dimensions?.width && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='height'>Tinggi (cm)</Label>
                <Input
                  id='height'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='w-full'
                  {...register("dimensions.height", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
                {errors.dimensions?.height && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='weight'>Berat (gr)</Label>
                <Input
                  id='weight'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='w-full'
                  {...register("dimensions.weight", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
                {errors.dimensions?.weight && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
            </div>
          </div>
          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='price'
                className='font-medium'
              >
                Harga Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Tulis harga produkmu yang sesuai.</div>
            <div className='flex items-center'>
              <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
              <Input
                id='price'
                type='text'
                inputMode='numeric'
                placeholder='10.000.000'
                className='rounded-l-none'
                {...register("price", {
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
                onKeyDown={(e) => {
                  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                  if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault()
                  }
                }}
              />
            </div>
            {errors.price && <p className='text-red-500 text-sm mt-1'>Harga produk tidak boleh 0 atau kosong</p>}
          </div>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='description'
                className='font-medium'
              >
                Deskripsi Produk <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Tambahkan deskripsi produk dengan highlight keunggulan produk tersebut karena ini akan digunakan sebagai informasi kepada pembeli.</div>
            <Textarea
              id='description'
              className='w-full min-h-[120px]'
              placeholder='Deskripsikan lengkap tentang produk...'
              {...register("description", { required: true })}
            />
            {errors.description && <p className='text-red-500 text-sm mt-1'>Deskripsi produk tidak boleh kosong</p>}
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Penyewaan</h2>

          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label className='font-medium'>
                Durasi Penyewaan <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Masukkan opsi durasi penyewaan dalam satuan waktu tertentu, seperti harian, mingguan, bulanan.</div>
            <div className='flex flex-wrap gap-6 mt-4'>
              <Controller
                name='rentalOptions.daily'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='daily'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor='daily'>Harian</Label>
                  </div>
                )}
              />
              <Controller
                name='rentalOptions.weekly'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='weekly'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor='weekly'>Mingguan</Label>
                  </div>
                )}
              />
              <Controller
                name='rentalOptions.monthly'
                control={control}
                render={({ field }) => (
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='monthly'
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor='monthly'>Bulanan</Label>
                  </div>
                )}
              />
            </div>
            {!watchRentalOptions?.daily && !watchRentalOptions?.weekly && !watchRentalOptions?.monthly && <p className='text-red-500 text-sm mt-1'>Pilih minimal satu durasi penyewaan</p>}
          </div>

          {watchRentalOptions?.daily && (
            <div className='mb-6'>
              <Label
                htmlFor='dailyPrice'
                className='font-medium'
              >
                Harga Harian
              </Label>
              <div className='text-sm text-gray-500 mb-2'>Tulis harga produkmu saat durasi sewa harian.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='dailyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='10.000.000'
                  className='rounded-l-none'
                  {...register("rentalOptions.dailyPrice", { required: watchRentalOptions.daily, min: 1, valueAsNumber: true })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {errors.rentalOptions?.dailyPrice && <p className='text-red-500 text-sm mt-1'>Harga harian tidak boleh 0 atau kosong</p>}
            </div>
          )}

          {watchRentalOptions?.weekly && (
            <div className='mb-6'>
              <Label
                htmlFor='weeklyPrice'
                className='font-medium'
              >
                Harga Mingguan
              </Label>
              <div className='text-sm text-gray-500 mb-2'>Tulis harga produkmu saat durasi sewa mingguan.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='weeklyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='10.000.000'
                  className='rounded-l-none'
                  {...register("rentalOptions.weeklyPrice", { required: watchRentalOptions.weekly, min: 1, valueAsNumber: true })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {errors.rentalOptions?.weeklyPrice && <p className='text-red-500 text-sm mt-1'>Harga mingguan tidak boleh 0 atau kosong</p>}
            </div>
          )}

          {watchRentalOptions?.monthly && (
            <div className='mb-6'>
              <Label
                htmlFor='monthlyPrice'
                className='font-medium'
              >
                Harga Bulanan
              </Label>
              <div className='text-sm text-gray-500 mb-2'>Tulis harga produkmu saat durasi sewa bulanan.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='monthlyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='10.000.000'
                  className='rounded-l-none'
                  {...register("rentalOptions.monthlyPrice", { required: watchRentalOptions.monthly, min: 1, valueAsNumber: true })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {errors.rentalOptions?.monthlyPrice && <p className='text-red-500 text-sm mt-1'>Harga bulanan tidak boleh 0 atau kosong</p>}
            </div>
          )}

          <div className='mb-6'>
            <Label
              htmlFor='deposit'
              className='font-medium'
            >
              Uang Jaminan (Deposit)
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Masukkan jumlah deposit jika diperlukan. Isi 0 jika tidak ada.</div>
            <div className='flex items-center'>
              <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
              <Input
                id='deposit'
                type='text'
                inputMode='numeric'
                placeholder='10.000.000'
                className='rounded-l-none'
                {...register("rentalOptions.deposit", {
                  valueAsNumber: true,
                  min: { value: 0, message: "Deposit tidak boleh negatif" },
                })}
                onKeyDown={(e) => {
                  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                  if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                    e.preventDefault()
                  }
                }}
              />
            </div>
            {errors.rentalOptions?.deposit && <p className='text-red-500 text-sm mt-1'>{errors.rentalOptions.deposit.message}</p>}
          </div>

          <div>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='minimumRentalDuration'
                className='font-medium'
              >
                Jumlah Minimum Sewa
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Masukkan jumlah minimum sewa produkmu</div>
            <Controller
              name='minimumRentalDuration'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value.toString()}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='3' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1</SelectItem>
                    <SelectItem value='2'>2</SelectItem>
                    <SelectItem value='3'>3</SelectItem>
                    <SelectItem value='4'>4</SelectItem>
                    <SelectItem value='5'>5</SelectItem>
                    <SelectItem value='7'>7</SelectItem>
                    <SelectItem value='14'>14</SelectItem>
                    <SelectItem value='30'>30</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Fitur Spesial</h2>
          <div>
            <div className='flex justify-between items-center mb-1'>
              <Label
                htmlFor='rentToBuy'
                className='font-medium'
              >
                Rent to Buy
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Rent to Buy adalah fitur unik pinjaman yang bisa digunakan oleh para seller.</div>

            <Controller
              name='rentToBuy.is_rnb'
              control={control}
              render={({ field }) => (
                <div className='flex items-center space-x-4 mt-2'>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='radio'
                      id='rentToBuy_ya'
                      value='true'
                      checked={field.value === true}
                      onChange={() => field.onChange(true)}
                      className='w-4 h-4 text-blue-600'
                    />
                    <Label htmlFor='rentToBuy_ya'>Ya</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <input
                      type='radio'
                      id='rentToBuy_tidak'
                      value='false'
                      checked={field.value === false}
                      onChange={() => field.onChange(false)}
                      className='w-4 h-4 text-blue-600'
                    />
                    <Label htmlFor='rentToBuy_tidak'>Tidak</Label>
                  </div>
                </div>
              )}
            />
          </div>

          {watchRentToBuy && (
            <div className='mt-6'>
              <Label
                htmlFor='buy_price'
                className='font-medium'
              >
                Harga Beli Produk (Rent to Buy)
              </Label>
              <div className='text-sm text-gray-500 mb-2'>Masukkan harga jika penyewa ingin membeli produk ini.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='buy_price'
                  type='text'
                  inputMode='numeric'
                  placeholder='10.000.000'
                  className='rounded-l-none'
                  {...register("rentToBuy.buy_price", {
                    required: "Harga beli wajib diisi jika Rent to Buy aktif",
                    valueAsNumber: true,
                    min: { value: 1, message: "Harga beli harus lebih dari 0" },
                  })}
                  onKeyDown={(e) => {
                    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"]
                    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault()
                    }
                  }}
                />
              </div>
              {errors.rentToBuy?.buy_price && <p className='text-red-500 text-sm mt-1'>{errors.rentToBuy.buy_price.message}</p>}
            </div>
          )}
        </Card>

        <Button
          type='submit'
          className='bg-custom-gradient-tr hover:bg-blue-900 text-white px-8 py-2'
          disabled={!isValid || isSubmitting || uploadedImages.length === 0 || (!watchRentalOptions?.daily && !watchRentalOptions?.weekly && !watchRentalOptions?.monthly)}
        >
          {isSubmitting ? "Menambahkan..." : "Tambahkan Produk"}
        </Button>
      </form>
    </main>
  )
}
