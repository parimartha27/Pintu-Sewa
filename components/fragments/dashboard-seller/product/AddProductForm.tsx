"use client"

// Interface untuk data form di Frontend
export interface Product {
  name: string
  category: string
  photos: string[]
  stock: number
  dimensions: {
    length: number
    width: number
    height: number
    weight: number
  }
  price: number // Tetap ada di form, tapi diabaikan saat submit
  description: string
  rentalOptions: {
    types: number
    dailyPrice: number
    weeklyPrice: number
    monthlyPrice: number
  }
  minimumRentalDuration: number
  rentToBuy: boolean
  shippingService: string // Tetap ada di form, tapi diabaikan saat submit
}

// Interface untuk payload yang dikirim ke Backend (sesuai DTO)
export interface AddProductRequest {
  shop_id: string | null
  name: string
  category: string
  rent_category: number
  is_rnb: boolean
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

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
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

export default function AddProductForm() {
  const shopId = localStorage.getItem("shopId")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [rentalOptions, setRentalOptions] = useState({
    daily: false,
    weekly: false,
    monthly: false,
  })

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      name: "",
      category: "",
      stock: 0,
      price: 0,
      description: "",
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
      },
      rentalOptions: {
        types: 0,
        dailyPrice: 0,
        weeklyPrice: 0,
        monthlyPrice: 0,
      },
      minimumRentalDuration: 0,
      rentToBuy: false,
      shippingService: "",
    },
  })

  // =================================================================
  // == LOGIKA BARU / YANG DIUBAH ADA DI BAWAH INI ==
  // =================================================================

  const calculateRentalType = () => {
    let type = 0
    if (rentalOptions.daily) type += 1 // Harian = 1
    if (rentalOptions.weekly) type += 2 // Mingguan = 2
    if (rentalOptions.monthly) type += 4 // Bulanan = 4
    return type
  }

  const onSubmit = async (data: Product) => {
    setIsSubmitting(true)
    try {
      const payload: AddProductRequest = {
        name: data.name,
        category: data.category,
        stock: data.stock,
        description: data.description,
        rent_category: calculateRentalType(),
        is_rnb: data.rentToBuy,
        min_rented: data.minimumRentalDuration,
        length: data.dimensions.length,
        width: data.dimensions.width,
        height: data.dimensions.height,
        weight: data.dimensions.weight,
        daily_price: rentalOptions.daily ? data.rentalOptions.dailyPrice : undefined,
        weekly_price: rentalOptions.weekly ? data.rentalOptions.weeklyPrice : undefined,
        monthly_price: rentalOptions.monthly ? data.rentalOptions.monthlyPrice : undefined,
        shop_id: "d5c0eace-078c-4eee-8ef8-f4306d055367",
        status: "ACTIVE",
        condition_description: "erwerwerwer",
        image: uploadedImages.length > 0 ? uploadedImages[0] : "",
      }

      console.log("Data Asli dari Form:", data)
      console.log("Payload yang Dikirim ke Backend:", payload)

      const response = await axios.post(`${productBaseUrl}/add`, payload)
      console.log("Response:", response.data)

      setAlertState({
        isOpen: true,
        message: "Sukses Menambahkan Produk",
        isWrong: false,
      })
    } catch (error) {
      console.error("Error adding product:", error)
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || String(error.message) : String(error)
      setAlertState({
        isOpen: true,
        message: `Gagal Menambahkan Produk: ${errorMessage}`,
        isWrong: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // =================================================================
  // == AKHIR DARI LOGIKA BARU. FUNGSI DI BAWAH INI TETAP SAMA ==
  // =================================================================

  const handleRentalChange = (type: "daily" | "weekly" | "monthly", checked: boolean) => {
    setRentalOptions((prev) => ({ ...prev, [type]: checked }))
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
    // =============================================================
    // == TAMPILAN (JSX) DI BAWAH INI TIDAK DIUBAH SAMA SEKALI ==
    // =============================================================
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
        {/* Informasi Produk */}
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

        {/* Detail Produk */}
        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Detail Produk</h2>

          {/* Foto Produk */}
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

          {/* Stok Produk */}
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
              type='number'
              className='w-full'
              placeholder='0'
              {...register("stock", {
                required: true,
                min: 1,
                valueAsNumber: true,
              })}
            />
            {errors.stock && <p className='text-red-500 text-sm mt-1'>Stok produk tidak boleh 0 atau kosong</p>}
          </div>

          {/* Dimensi Produk */}
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
                  type='number'
                  placeholder='0'
                  {...register("dimensions.length", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.dimensions?.length && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='width'>Lebar (cm)</Label>
                <Input
                  id='width'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.width", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.dimensions?.width && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='height'>Tinggi (cm)</Label>
                <Input
                  id='height'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.height", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.dimensions?.height && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
              <div>
                <Label htmlFor='weight'>Berat (gr)</Label>
                <Input
                  id='weight'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.weight", {
                    required: true,
                    min: 1,
                    valueAsNumber: true,
                  })}
                />
                {errors.dimensions?.weight && <p className='text-red-500 text-sm mt-1'>Nilai harus lebih dari 0</p>}
              </div>
            </div>
          </div>

          {/* Harga Produk */}
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
                type='number'
                className='rounded-l-none'
                placeholder='10.000.000'
                {...register("price", {
                  required: true,
                  min: 1,
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.price && <p className='text-red-500 text-sm mt-1'>Harga produk tidak boleh 0 atau kosong</p>}
          </div>

          {/* Deskripsi Produk */}
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

        {/* Layanan Pengiriman */}
        {/* <Card className='p-6 mb-6'>
          <div className='flex justify-between items-center mb-4 text-color-primary pb-4 border-b-[1px]'>
            <Label className='font-medium'>
              Layanan Pengiriman <span className='text-red-500 '>*</span>
            </Label>
          </div>
          <div className='text-sm text-gray-500 mb-2'>Pilih jasa pengiriman yang sesuai dengan jenis produkmu</div>
          <Controller
            name='shippingService'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Pilih Layanan Pengiriman' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='1'>JNE</SelectItem>
                  <SelectItem value='2'>TIKI</SelectItem>
                  <SelectItem value='3'>SiCepat</SelectItem>
                  <SelectItem value='4'>J&T</SelectItem>
                  <SelectItem value='5'>GoSend</SelectItem>
                  <SelectItem value='6'>GrabExpress</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Card> */}

        {/* Penyewaan */}
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
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='daily'
                  checked={rentalOptions.daily}
                  onCheckedChange={(checked) => handleRentalChange("daily", checked === true)}
                />
                <Label htmlFor='daily'>Harian</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='weekly'
                  checked={rentalOptions.weekly}
                  onCheckedChange={(checked) => handleRentalChange("weekly", checked === true)}
                />
                <Label htmlFor='weekly'>Mingguan</Label>
              </div>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='monthly'
                  checked={rentalOptions.monthly}
                  onCheckedChange={(checked) => handleRentalChange("monthly", checked === true)}
                />
                <Label htmlFor='monthly'>Bulanan</Label>
              </div>
            </div>
            {!rentalOptions.daily && !rentalOptions.weekly && !rentalOptions.monthly && <p className='text-red-500 text-sm mt-1'>Pilih minimal satu durasi penyewaan</p>}
          </div>

          {/* Harga Harian */}
          {rentalOptions.daily && (
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
                  type='number'
                  className='rounded-l-none'
                  placeholder='100.000'
                  {...register("rentalOptions.dailyPrice", {
                    required: rentalOptions.daily,
                    min: rentalOptions.daily ? 1 : 0,
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.rentalOptions?.dailyPrice && <p className='text-red-500 text-sm mt-1'>Harga harian tidak boleh 0 atau kosong</p>}
            </div>
          )}

          {/* Harga Mingguan */}
          {rentalOptions.weekly && (
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
                  type='number'
                  className='rounded-l-none'
                  placeholder='2.000.000'
                  {...register("rentalOptions.weeklyPrice", {
                    required: rentalOptions.weekly,
                    min: rentalOptions.weekly ? 1 : 0,
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.rentalOptions?.weeklyPrice && <p className='text-red-500 text-sm mt-1'>Harga mingguan tidak boleh 0 atau kosong</p>}
            </div>
          )}

          {/* Harga Bulanan */}
          {rentalOptions.monthly && (
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
                  type='number'
                  className='rounded-l-none'
                  placeholder='10.000.000'
                  {...register("rentalOptions.monthlyPrice", {
                    required: rentalOptions.monthly,
                    min: rentalOptions.monthly ? 1 : 0,
                    valueAsNumber: true,
                  })}
                />
              </div>
              {errors.rentalOptions?.monthlyPrice && <p className='text-red-500 text-sm mt-1'>Harga bulanan tidak boleh 0 atau kosong</p>}
            </div>
          )}

          {/* Jumlah Minimum Sewa */}
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

        {/* Fitur Spesial */}
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

            <div className='flex items-center space-x-4 mt-2'>
              <div className='flex items-center space-x-2'>
                <Controller
                  name='rentToBuy'
                  control={control}
                  render={({ field }) => (
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
                  )}
                />
              </div>
              <div className='flex items-center space-x-2'>
                <Controller
                  name='rentToBuy'
                  control={control}
                  render={({ field }) => (
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
                  )}
                />
              </div>
            </div>
          </div>
        </Card>
        <Button
          type='submit'
          className='bg-custom-gradient-tr hover:bg-blue-900 text-white px-8 py-2'
          disabled={!isValid || isSubmitting || uploadedImages.length === 0 || (!rentalOptions.daily && !rentalOptions.weekly && !rentalOptions.monthly)}
        >
          Tambahkan Produk
        </Button>
      </form>
    </main>
  )
}
