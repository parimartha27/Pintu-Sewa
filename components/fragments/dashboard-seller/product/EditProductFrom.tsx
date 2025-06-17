"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm, Controller, useWatch } from "react-hook-form"
import axios, { AxiosError } from "axios"

import { productBaseUrl } from "@/types/globalVar"
import { AlertProps } from "@/types/alert"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import Alert from "@/components/layout/Alert"
import { X, Upload } from "lucide-react"

interface EditProductFormData {
  name: string
  category: string
  stock: number
  description: string
  conditionDescription: string
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
    dailyPrice?: number
    weeklyPrice?: number
    monthlyPrice?: number
    deposit: number
  }
  minRented: number
  isRnb: boolean
  buyPrice?: number
  status: string
}

interface ProductDetailApiResponse {
  id: string
  name: string
  category: string
  rent_category: number
  is_rnb: boolean
  weight: number
  height: number
  width: number
  length: number
  daily_price: number | null
  weekly_price: number | null
  monthly_price: number | null
  description: string
  condition_description: string
  stock: number
  min_rented: number
  status: string
  image: string
  buy_price?: number
  deposit?: number
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.productId as string

  const [shopId, setShopId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<EditProductFormData>({
    mode: "onChange",
  })

  const watchRentalOptions = useWatch({ control, name: "rentalOptions" })
  const watchIsRnb = useWatch({ control, name: "isRnb" })

  const fetchProductData = useCallback(async () => {
    if (!productId) return
    setIsLoading(true)
    try {
      const response = await axios.get<{ output_schema: ProductDetailApiResponse }>(`${productBaseUrl}/${productId}`)
      const product = response.data.output_schema

      const defaultValues: EditProductFormData = {
        name: product.name,
        category: product.category,
        stock: product.stock,
        description: product.description,
        conditionDescription: product.condition_description,
        dimensions: {
          length: product.length,
          width: product.width,
          height: product.height,
          weight: product.weight,
        },
        rentalOptions: {
          daily: (product.rent_category & 1) === 1,
          weekly: (product.rent_category & 2) === 2,
          monthly: (product.rent_category & 4) === 4,
          dailyPrice: product.daily_price ?? undefined,
          weeklyPrice: product.weekly_price ?? undefined,
          monthlyPrice: product.monthly_price ?? undefined,
          deposit: product.deposit ?? 0,
        },
        minRented: product.min_rented,
        isRnb: product.is_rnb,
        buyPrice: product.buy_price ?? undefined,
        status: product.status,
      }

      reset(defaultValues)
      if (product.image && product.image.length > 0) {
        setImagePreviews(product.image.split(";"))
      }
    } catch (error) {
      console.error("Gagal mengambil data produk:", error)
      setAlertState({ isOpen: true, message: "Gagal mengambil data produk. Coba lagi nanti.", isWrong: true })
    } finally {
      setIsLoading(false)
    }
  }, [productId, reset])

  useEffect(() => {
    const storedShopId = localStorage.getItem("shopId")
    if (storedShopId) {
      setShopId(storedShopId)
      fetchProductData()
    } else {
      setAlertState({ isOpen: true, message: "ID Toko tidak ditemukan. Harap login kembali.", isWrong: true })
    }
  }, [fetchProductData])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImageFiles = Array.from(files)
    setImageFiles(newImageFiles.slice(0, 5))
    const newPreviews = newImageFiles.map((file) => URL.createObjectURL(file))
    setImagePreviews(newPreviews.slice(0, 5))
  }

  const removeImage = (indexToRemove: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove))
    setImageFiles((prev) => prev.filter((_, i) => i !== indexToRemove))
  }

  const onSubmit = async (data: EditProductFormData) => {
    if (!shopId) {
      setAlertState({ isOpen: true, message: "Tidak dapat mengirim, ID Toko tidak valid.", isWrong: true })
      return
    }
    if (imageFiles.length === 0 && imagePreviews.length === 0) {
      setAlertState({ isOpen: true, message: "Produk harus memiliki setidaknya satu gambar.", isWrong: true })
      return
    }

    setIsSubmitting(true)
    const formData = new FormData()

    const appendIfDefined = (key: string, value: any) => {
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        formData.append(key, String(value))
      }
    }

    formData.append("shopId", shopId)
    appendIfDefined("name", data.name)
    appendIfDefined("category", data.category)
    appendIfDefined("stock", data.stock)
    appendIfDefined("description", data.description)
    appendIfDefined("conditionDescription", data.conditionDescription)
    appendIfDefined("length", data.dimensions.length)
    appendIfDefined("width", data.dimensions.width)
    appendIfDefined("height", data.dimensions.height)
    appendIfDefined("weight", data.dimensions.weight)
    appendIfDefined("minRented", data.minRented)
    appendIfDefined("status", data.status)
    appendIfDefined("isRnb", data.isRnb)

    let rentCategory = 0
    if (data.rentalOptions.daily) rentCategory += 1
    if (data.rentalOptions.weekly) rentCategory += 2
    if (data.rentalOptions.monthly) rentCategory += 4
    formData.append("rentCategory", String(rentCategory))

    if (data.rentalOptions.daily) appendIfDefined("dailyPrice", data.rentalOptions.dailyPrice)
    if (data.rentalOptions.weekly) appendIfDefined("weeklyPrice", data.rentalOptions.weeklyPrice)
    if (data.rentalOptions.monthly) appendIfDefined("monthlyPrice", data.rentalOptions.monthlyPrice)

    appendIfDefined("deposit", data.rentalOptions.deposit)
    if (data.isRnb) appendIfDefined("buyPrice", data.buyPrice)

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    try {
      await axios.put(`${productBaseUrl}/edit/${productId}`, formData)

      setAlertState({
        isOpen: true,
        message: "Sukses Memperbarui Produk!",
        isWrong: false,
        onClose: () => router.push("/dashboard-seller/product"),
      })
    } catch (error) {
      console.error("Error updating product:", error)
      const err = error as AxiosError<{ error_schema: { error_message: string } }>
      const errorMessage = err.response?.data?.error_schema?.error_message || "Terjadi kesalahan"
      setAlertState({ isOpen: true, message: `Gagal Memperbarui Produk: ${errorMessage}`, isWrong: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <main className='container py-10'>
        <h1 className='text-2xl font-semibold mb-6'>Memuat Data Produk...</h1>
        <div className='space-y-6'>
          <div className='h-48 bg-gray-200 rounded-lg w-full animate-pulse'></div>
          <div className='h-96 bg-gray-200 rounded-lg w-full animate-pulse'></div>
          <div className='h-72 bg-gray-200 rounded-lg w-full animate-pulse'></div>
        </div>
      </main>
    )
  }

  return (
    <main className='container py-10'>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={alertState.onClose || (() => setAlertState((prev) => ({ ...prev, isOpen: false })))}
          isWrong={alertState.isWrong}
        />
      )}
      <h1 className='text-2xl font-semibold mb-6'>Edit Produk</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Informasi Produk</h2>
          <div className='mb-6'>
            <Label
              htmlFor='name'
              className='font-medium'
            >
              Nama Produk <span className='text-red-500'>*</span>
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Nama produk maksimal 100 karakter.</div>
            <Input
              id='name'
              placeholder='Contoh: Mobil Toyota Innova Hitam Tahun 2024'
              {...register("name", {
                required: "Nama produk tidak boleh kosong",
                maxLength: { value: 100, message: "Nama produk maksimal 100 karakter" },
              })}
            />
            {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name.message}</p>}
          </div>
          <div>
            <Label
              htmlFor='category'
              className='font-medium'
            >
              Kategori Produk <span className='text-red-500'>*</span>
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Pilih kategori yang sesuai dengan produk.</div>
            <Controller
              name='category'
              control={control}
              rules={{ required: "Kategori produk harus dipilih" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih Kategori' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Papan Permainan'>Papan Permainan</SelectItem>
                    <SelectItem value='Alat Kesehatan'>Alat Kesehatan</SelectItem>
                    <SelectItem value='Motor'>Motor</SelectItem>
                    <SelectItem value='Mobil'>Mobil</SelectItem>
                    <SelectItem value='Elektronik'>Elektronik</SelectItem>
                    {/* Tambahkan kategori lainnya */}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category.message}</p>}
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Detail Produk</h2>
          <div className='mb-6'>
            <Label className='font-medium'>
              Foto Produk <span className='text-red-500'>*</span>
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Ganti gambar dengan memilih file baru. Gambar lama akan digantikan.</div>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-4'>
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className='border rounded h-24 relative'
                >
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className='h-full w-full object-cover rounded'
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 leading-none hover:bg-red-700'
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {imagePreviews.length < 5 && (
                <label className='border-dashed border-2 rounded flex items-center justify-center h-24 cursor-pointer hover:border-blue-500'>
                  <div className='text-center'>
                    <Upload
                      size={24}
                      className='text-gray-400 mx-auto'
                    />
                    <span className='text-xs text-gray-500'>Ganti/Tambah</span>
                  </div>
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/jpg'
                    className='hidden'
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>

          <div className='mb-6'>
            <Label
              htmlFor='stock'
              className='font-medium'
            >
              Stok Produk <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='stock'
              type='number'
              placeholder='0'
              {...register("stock", {
                required: "Stok tidak boleh kosong",
                min: { value: 1, message: "Stok minimal 1" },
                valueAsNumber: true,
              })}
            />
            {errors.stock && <p className='text-red-500 text-sm mt-1'>{errors.stock.message}</p>}
          </div>

          <div className='mb-6'>
            <Label className='font-medium'>
              Dimensi Produk (cm) & Berat (gr) <span className='text-red-500'>*</span>
            </Label>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mt-2'>
              <div>
                <Label htmlFor='length'>Panjang (cm)</Label>
                <Input
                  id='length'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.length", { required: true, min: 0.1, valueAsNumber: true })}
                />
                {errors.dimensions?.length && <p className='text-red-500 text-sm mt-1'>Wajib diisi</p>}
              </div>
              <div>
                <Label htmlFor='width'>Lebar (cm)</Label>
                <Input
                  id='width'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.width", { required: true, min: 0.1, valueAsNumber: true })}
                />
                {errors.dimensions?.width && <p className='text-red-500 text-sm mt-1'>Wajib diisi</p>}
              </div>
              <div>
                <Label htmlFor='height'>Tinggi (cm)</Label>
                <Input
                  id='height'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.height", { required: true, min: 0.1, valueAsNumber: true })}
                />
                {errors.dimensions?.height && <p className='text-red-500 text-sm mt-1'>Wajib diisi</p>}
              </div>
              <div>
                <Label htmlFor='weight'>Berat (gr)</Label>
                <Input
                  id='weight'
                  type='number'
                  placeholder='0'
                  {...register("dimensions.weight", { required: true, min: 0.1, valueAsNumber: true })}
                />
                {errors.dimensions?.weight && <p className='text-red-500 text-sm mt-1'>Wajib diisi</p>}
              </div>
            </div>
          </div>

          <div className='mb-6'>
            <Label
              htmlFor='description'
              className='font-medium'
            >
              Deskripsi Produk <span className='text-red-500'>*</span>
            </Label>
            <Textarea
              id='description'
              className='w-full min-h-[120px]'
              placeholder='Deskripsikan lengkap tentang produk...'
              {...register("description", { required: "Deskripsi produk wajib diisi" })}
            />
            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
          </div>
          <div>
            <Label
              htmlFor='conditionDescription'
              className='font-medium'
            >
              Deskripsi Kondisi Produk <span className='text-red-500'>*</span>
            </Label>
            <Textarea
              id='conditionDescription'
              className='w-full min-h-[120px]'
              placeholder='Deskripsikan kondisi terkini produk...'
              {...register("conditionDescription", { required: "Deskripsi kondisi produk wajib diisi" })}
            />
            {errors.conditionDescription && <p className='text-red-500 text-sm mt-1'>{errors.conditionDescription.message}</p>}
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Penyewaan</h2>
          <div className='mb-6'>
            <Label className='font-medium'>
              Durasi Penyewaan <span className='text-red-500'>*</span>
            </Label>
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
          </div>

          {watchRentalOptions?.daily && (
            <div className='mb-6'>
              <Label
                htmlFor='dailyPrice'
                className='font-medium'
              >
                Harga Harian
              </Label>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='dailyPrice'
                  type='number'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.dailyPrice", { valueAsNumber: true, required: "Harga harian wajib diisi" })}
                />
              </div>
              {errors.rentalOptions?.dailyPrice && <p className='text-red-500 text-sm mt-1'>{errors.rentalOptions.dailyPrice.message}</p>}
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
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='weeklyPrice'
                  type='number'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.weeklyPrice", { valueAsNumber: true, required: "Harga mingguan wajib diisi" })}
                />
              </div>
              {errors.rentalOptions?.weeklyPrice && <p className='text-red-500 text-sm mt-1'>{errors.rentalOptions.weeklyPrice.message}</p>}
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
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='monthlyPrice'
                  type='number'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.monthlyPrice", { valueAsNumber: true, required: "Harga bulanan wajib diisi" })}
                />
              </div>
              {errors.rentalOptions?.monthlyPrice && <p className='text-red-500 text-sm mt-1'>{errors.rentalOptions.monthlyPrice.message}</p>}
            </div>
          )}

          <div className='mb-6'>
            <Label
              htmlFor='deposit'
              className='font-medium'
            >
              Uang Jaminan (Deposit)
            </Label>
            <div className='flex items-center'>
              <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
              <Input
                id='deposit'
                type='number'
                placeholder='0'
                className='rounded-l-none'
                {...register("rentalOptions.deposit", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor='minRented'
              className='font-medium'
            >
              Jumlah Minimum Sewa (hari) <span className='text-red-500'>*</span>
            </Label>
            <Controller
              name='minRented'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={String(field.value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Pilih durasi' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1</SelectItem>
                    <SelectItem value='3'>3</SelectItem>
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
          <div className='flex items-center space-x-2'>
            <Controller
              name='isRnb'
              control={control}
              render={({ field }) => (
                <Checkbox
                  id='isRnb'
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor='isRnb'
              className='font-medium'
            >
              Aktifkan Fitur Rent-to-Buy
            </Label>
          </div>

          {watchIsRnb && (
            <div className='mt-4'>
              <Label
                htmlFor='buyPrice'
                className='font-medium'
              >
                Harga Beli Produk
              </Label>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='buyPrice'
                  type='number'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("buyPrice", { valueAsNumber: true, required: "Harga beli wajib diisi jika fitur aktif" })}
                />
              </div>
              {errors.buyPrice && <p className='text-red-500 text-sm mt-1'>{errors.buyPrice.message}</p>}
            </div>
          )}
        </Card>

        <Button
          type='submit'
          className='bg-custom-gradient-tr hover:bg-blue-900 text-white px-8 py-2'
          disabled={!isValid || isSubmitting || isLoading}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </form>
    </main>
  )
}
