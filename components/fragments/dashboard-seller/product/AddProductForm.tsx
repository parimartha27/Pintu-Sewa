"use client"

// src/types/product.ts
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
  price: number
  description: string
  rentalOptions: {
    types: number // 1-7 based on combinations
    dailyPrice: number
    weeklyPrice: number
    monthlyPrice: number
  }
  minimumRentalDuration: number
  rentToBuy: boolean
  shippingService: string
}

// src/pages/add-product.tsx
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
import { Check, X, Search, Upload, Plus } from "lucide-react"
// import { Product } from "@/types/product"

export default function AddProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [rentalOptions, setRentalOptions] = useState({
    daily: false,
    weekly: false,
    monthly: false,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
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
    },
  })

  // Calculate rental type based on checkboxes
  const calculateRentalType = () => {
    let type = 0
    if (rentalOptions.daily) type += 1
    if (rentalOptions.weekly) type += 2
    if (rentalOptions.monthly) type += 4

    // Map to required values
    const mapping: Record<number, number> = {
      0: 0, // None selected
      1: 1, // Daily
      2: 2, // Weekly
      3: 4, // Daily + Weekly
      4: 3, // Monthly
      5: 5, // Daily + Monthly
      6: 6, // Weekly + Monthly
      7: 7, // All three
    }

    return mapping[type]
  }

  const handleRentalChange = (type: "daily" | "weekly" | "monthly", checked: boolean) => {
    setRentalOptions((prev) => ({ ...prev, [type]: checked }))
  }

  const onSubmit = async (data: Product) => {
    try {
      setIsSubmitting(true)

      // Add the calculated rental type
      data.rentalOptions.types = calculateRentalType()

      // Add images from state
      data.photos = uploadedImages

      // Mock API call
      console.log("Submitting data:", data)
      const response = await axios.post("/api/products", data)
      console.log("Response:", response.data)

      // Success handling
      alert("Product added successfully")
    } catch (error) {
      console.error("Error adding product:", error)
      alert("Failed to add product")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Mock image upload - in a real app you'd upload to a server or cloud storage
    const newImages = [...uploadedImages]
    for (let i = 0; i < files.length; i++) {
      if (newImages.length < 5) {
        // Max 5 images
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
                    <SelectValue placeholder='Kendaraan' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='kendaraan'>Kendaraan</SelectItem>
                    <SelectItem value='elektronik'>Elektronik</SelectItem>
                    <SelectItem value='properti'>Properti</SelectItem>
                    <SelectItem value='fashion'>Fashion</SelectItem>
                    <SelectItem value='alat_musik'>Alat Musik</SelectItem>
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
              placeholder='Deskripsikan lengkap tentang produk untuk Transformasi pengemasan informasi dalam bentuk yang jelas dan terstruktur [Masukkan penjelasan singkat tentang produk, fungsinya, dan keunggulannya yang ditawarkan]'
              {...register("description", { required: true })}
            />
            {errors.description && <p className='text-red-500 text-sm mt-1'>Deskripsi produk tidak boleh kosong</p>}
          </div>
        </Card>

        {/* Layanan Pengiriman */}
        <Card className='p-6 mb-6'>
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
                  <SelectValue placeholder='JNE Reguler' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='jne_reg'>JNE Reguler</SelectItem>
                  <SelectItem value='jne_yes'>JNE YES</SelectItem>
                  <SelectItem value='j&t'>J&T Express</SelectItem>
                  <SelectItem value='sicepat'>SiCepat</SelectItem>
                  <SelectItem value='anteraja'>AnterAja</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Card>

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
      </form>
      <Button
        type='submit'
        className='bg-custom-gradient-tr hover:bg-blue-900 text-white px-8 py-2'
        disabled={!isValid || isSubmitting || uploadedImages.length === 0 || (!rentalOptions.daily && !rentalOptions.weekly && !rentalOptions.monthly)}
      >
        Tambahkan Produk
      </Button>
    </main>
  )
}
