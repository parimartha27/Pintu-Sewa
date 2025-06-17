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
import { AlertProps } from "@/types/alert" // Pastikan path ini benar
import Alert from "@/components/layout/Alert" // Pastikan path ini benar
import { productBaseUrl } from "@/types/globalVar" // Pastikan path ini benar

// Interface untuk data dari react-hook-form
interface ProductFormData {
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
    dailyPrice: number
    weeklyPrice: number
    monthlyPrice: number
    deposit: number
  }
  minimumRentalDuration: number
  rentToBuy: {
    isRnb: boolean
    buy_price: number
  }
}

export default function AddProductForm() {
  const [shopId, setShopId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // State untuk menyimpan objek File asli yang akan di-upload.
  const [imageFile, setImageFile] = useState<File | null>(null)
  // State untuk menyimpan URL pratinjau gambar yang akan ditampilkan di UI.
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
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
      stock: 1,
      description: "",
      conditionDescription: "",
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
        isRnb: false,
        buy_price: 0,
      },
    },
  })

  const watchRentalOptions = useWatch({ control, name: "rentalOptions" })
  const watchRentToBuy = useWatch({ control, name: "rentToBuy.isRnb" })

  const calculateRentalType = () => {
    let type = 0
    if (watchRentalOptions.daily) type += 1
    if (watchRentalOptions.weekly) type += 2
    if (watchRentalOptions.monthly) type += 4
    return type
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImageFile(null)
    setImagePreview(null)
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!shopId) {
      setAlertState({ isOpen: true, message: "Tidak dapat mengirim, ID Toko tidak valid.", isWrong: true })
      return
    }
    if (!imageFile) {
      setAlertState({ isOpen: true, message: "Foto produk wajib diunggah.", isWrong: true })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()

    formData.append("shopId", shopId)
    formData.append("name", data.name)
    formData.append("category", data.category)
    formData.append("rentCategory", String(calculateRentalType()))
    formData.append("isRnb", String(data.rentToBuy.isRnb))
    formData.append("weight", String(data.dimensions.weight))
    formData.append("height", String(data.dimensions.height))
    formData.append("width", String(data.dimensions.width))
    formData.append("length", String(data.dimensions.length))
    formData.append("deposit", String(data.rentalOptions.deposit))
    formData.append("description", data.description)
    formData.append("conditionDescription", data.conditionDescription || "")
    formData.append("stock", String(data.stock))
    formData.append("minRented", String(data.minimumRentalDuration))
    formData.append("status", "AVAILABLE")

    if (watchRentalOptions.daily) formData.append("dailyPrice", String(data.rentalOptions.dailyPrice))
    if (watchRentalOptions.weekly) formData.append("weeklyPrice", String(data.rentalOptions.weeklyPrice))
    if (watchRentalOptions.monthly) formData.append("monthlyPrice", String(data.rentalOptions.monthlyPrice))
    if (data.rentToBuy.isRnb) formData.append("buyPrice", String(data.rentToBuy.buy_price))

    formData.append("image", imageFile)

    try {
      console.log("Melihat isi FormData satu per satu:")
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": ", pair[1])
      }
      await axios.post(`${productBaseUrl}/add`, formData)

      setAlertState({
        isOpen: true,
        message: "Sukses Menambahkan Produk",
        isWrong: false,
        onClose: () => window.location.reload(),
      })
    } catch (error) {
      const errorMessage = axios.isAxiosError(error) ? error.response?.data?.message || String(error.message) : String(error)
      setAlertState({ isOpen: true, message: `Gagal Menambahkan Produk: ${errorMessage}`, isWrong: true })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fungsi untuk membatasi input hanya angka
  const allowOnlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete", "Enter"]
    if (!/^[0-9]$/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault()
    }
  }

  return (
    <main className='container'>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => {
            setAlertState({ ...alertState, isOpen: false })
            if (alertState.onClose) alertState.onClose()
          }}
          isWrong={alertState.isWrong}
        />
      )}
      <h1 className='text-2xl font-semibold mb-6'>Tambah Produk</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Informasi Produk</h2>
          <div className='mb-6'>
            <Label
              htmlFor='name'
              className='font-medium'
            >
              Nama Produk <span className='text-red-500'>*</span>
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Nama produk min 3, maks 100 karakter.</div>
            <Input
              id='name'
              placeholder='Contoh: Mobil Toyota Innova Hitam Tahun 2024'
              {...register("name", { required: "Nama produk wajib diisi", minLength: { value: 3, message: "Nama minimal 3 karakter" }, maxLength: { value: 100, message: "Nama maksimal 100 karakter" } })}
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
            <div className='text-sm text-gray-500 mb-2'>Pilih kategori yang sesuai.</div>
            <Controller
              name='category'
              control={control}
              rules={{ required: "Kategori wajib dipilih" }}
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
            {errors.category && <p className='text-red-500 text-sm mt-1'>{errors.category.message}</p>}
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Detail Produk</h2>

          <div className='mb-6'>
            <Label
              htmlFor='photos'
              className='font-medium'
            >
              Foto Produk <span className='text-red-500'>*</span>
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Format: JPG, PNG. Ukuran Maks: 1MB.</div>
            <div className='mt-2'>
              <div className='border border-dashed border-gray-300 rounded-lg flex items-center justify-center h-48 w-48 relative bg-gray-50'>
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt='Pratinjau Produk'
                      className='h-full w-full object-cover rounded-lg'
                    />
                    <button
                      type='button'
                      onClick={removeImage}
                      className='absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 shadow-md hover:bg-red-700 transition-colors'
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <label className='cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-500 hover:text-blue-600 transition-colors'>
                    <Upload size={32} />
                    <span className='mt-2 text-sm font-medium'>Unggah Gambar</span>
                    <input
                      type='file'
                      accept='image/jpeg,image/png,image/jpg'
                      className='hidden'
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
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
              type='numeric'
              placeholder='1'
              {...register("stock", { required: "Stok wajib diisi", valueAsNumber: true, min: { value: 1, message: "Stok minimal 1" } })}
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
                  type='numeric'
                  placeholder='0'
                  {...register("dimensions.length", { required: "Wajib diisi", valueAsNumber: true, min: { value: 1, message: "Min 1" } })}
                />
                {errors.dimensions?.length && <p className='text-red-500 text-sm mt-1'>{errors.dimensions.length.message}</p>}
              </div>
              <div>
                <Label htmlFor='width'>Lebar (cm)</Label>
                <Input
                  id='width'
                  type='numeric'
                  placeholder='0'
                  {...register("dimensions.width", { required: "Wajib diisi", valueAsNumber: true, min: { value: 1, message: "Min 1" } })}
                />
                {errors.dimensions?.width && <p className='text-red-500 text-sm mt-1'>{errors.dimensions.width.message}</p>}
              </div>
              <div>
                <Label htmlFor='height'>Tinggi (cm)</Label>
                <Input
                  id='height'
                  type='numeric'
                  placeholder='0'
                  {...register("dimensions.height", { required: "Wajib diisi", valueAsNumber: true, min: { value: 1, message: "Min 1" } })}
                />
                {errors.dimensions?.height && <p className='text-red-500 text-sm mt-1'>{errors.dimensions.height.message}</p>}
              </div>
              <div>
                <Label htmlFor='weight'>Berat (gr)</Label>
                <Input
                  id='weight'
                  type='numeric'
                  placeholder='0'
                  {...register("dimensions.weight", { required: "Wajib diisi", valueAsNumber: true, min: { value: 1, message: "Min 1" } })}
                />
                {errors.dimensions?.weight && <p className='text-red-500 text-sm mt-1'>{errors.dimensions.weight.message}</p>}
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
              {...register("description", { required: "Deskripsi wajib diisi" })}
            />
            {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>}
          </div>
          <div>
            <Label
              htmlFor='conditionDescription'
              className='font-medium'
            >
              Deskripsi Kondisi (Opsional)
            </Label>
            <Textarea
              id='conditionDescription'
              className='w-full min-h-[80px]'
              placeholder='Contoh: Ada goresan halus di bodi, fungsi 100% normal.'
              {...register("conditionDescription")}
            />
          </div>
        </Card>

        {/* BAGIAN YANG SEBELUMNYA HILANG - KINI DITAMPILKAN LENGKAP */}
        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Penyewaan</h2>

          <div className='mb-6'>
            <div className='flex justify-between items-center mb-1'>
              <Label className='font-medium'>
                Durasi Penyewaan <span className='text-red-500'>*</span>
              </Label>
            </div>
            <div className='text-sm text-gray-500 mb-2'>Pilih minimal satu durasi sewa yang tersedia.</div>
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
              <div className='text-sm text-gray-500 mb-2'>Tulis harga sewa harian.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='dailyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.dailyPrice", { required: watchRentalOptions.daily, valueAsNumber: true, min: 1 })}
                  onKeyDown={allowOnlyNumbers}
                />
              </div>
              {errors.rentalOptions?.dailyPrice && <p className='text-red-500 text-sm mt-1'>Harga harian wajib diisi</p>}
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
              <div className='text-sm text-gray-500 mb-2'>Tulis harga sewa mingguan.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='weeklyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.weeklyPrice", { required: watchRentalOptions.weekly, valueAsNumber: true, min: 1 })}
                  onKeyDown={allowOnlyNumbers}
                />
              </div>
              {errors.rentalOptions?.weeklyPrice && <p className='text-red-500 text-sm mt-1'>Harga mingguan wajib diisi</p>}
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
              <div className='text-sm text-gray-500 mb-2'>Tulis harga sewa bulanan.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='monthlyPrice'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentalOptions.monthlyPrice", { required: watchRentalOptions.monthly, valueAsNumber: true, min: 1 })}
                  onKeyDown={allowOnlyNumbers}
                />
              </div>
              {errors.rentalOptions?.monthlyPrice && <p className='text-red-500 text-sm mt-1'>Harga bulanan wajib diisi</p>}
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
                placeholder='0'
                className='rounded-l-none'
                {...register("rentalOptions.deposit", { valueAsNumber: true, min: { value: 0, message: "Deposit tidak boleh negatif" } })}
                onKeyDown={allowOnlyNumbers}
              />
            </div>
            {errors.rentalOptions?.deposit && <p className='text-red-500 text-sm mt-1'>{errors.rentalOptions.deposit.message}</p>}
          </div>

          <div>
            <Label
              htmlFor='minimumRentalDuration'
              className='font-medium'
            >
              Jumlah Minimum Sewa (hari)
            </Label>
            <div className='text-sm text-gray-500 mb-2'>Masukkan jumlah minimum hari penyewaan.</div>
            <Controller
              name='minimumRentalDuration'
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={String(field.value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Pilih jumlah hari' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>1 Hari</SelectItem>
                    <SelectItem value='2'>2 Hari</SelectItem>
                    <SelectItem value='3'>3 Hari</SelectItem>
                    <SelectItem value='5'>5 Hari</SelectItem>
                    <SelectItem value='7'>7 Hari (1 Minggu)</SelectItem>
                    <SelectItem value='14'>14 Hari (2 Minggu)</SelectItem>
                    <SelectItem value='30'>30 Hari (1 Bulan)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </Card>

        <Card className='p-6 mb-6'>
          <h2 className='text-lg font-semibold mb-4 text-color-primary pb-4 border-b-[1px]'>Fitur Spesial</h2>
          <div>
            <Label className='font-medium'>Rent to Buy</Label>
            <div className='text-sm text-gray-500 mb-2'>Aktifkan jika penyewa boleh membeli produk ini setelah masa sewa.</div>
            <Controller
              name='rentToBuy.isRnb'
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
                    <Label htmlFor='rentToBuy_ya'>Ya, Aktifkan</Label>
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
              <div className='text-sm text-gray-500 mb-2'>Masukkan harga jika penyewa ingin membeli produk.</div>
              <div className='flex items-center'>
                <span className='bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l'>Rp</span>
                <Input
                  id='buy_price'
                  type='text'
                  inputMode='numeric'
                  placeholder='0'
                  className='rounded-l-none'
                  {...register("rentToBuy.buy_price", { required: "Harga beli wajib diisi jika Rent to Buy aktif", valueAsNumber: true, min: { value: 1, message: "Harga beli harus lebih dari 0" } })}
                  onKeyDown={allowOnlyNumbers}
                />
              </div>
              {errors.rentToBuy?.buy_price && <p className='text-red-500 text-sm mt-1'>{errors.rentToBuy.buy_price.message}</p>}
            </div>
          )}
        </Card>
        {/* AKHIR DARI BAGIAN YANG SEBELUMNYA HILANG */}

        <Button
          type='submit'
          className='w-full md:w-auto bg-custom-gradient-tr text-white px-8 py-2'
          disabled={!isValid || isSubmitting || !imageFile || (!watchRentalOptions?.daily && !watchRentalOptions?.weekly && !watchRentalOptions?.monthly)}
        >
          {isSubmitting ? "Menyimpan..." : "Tambahkan Produk"}
        </Button>
      </form>
    </main>
  )
}
