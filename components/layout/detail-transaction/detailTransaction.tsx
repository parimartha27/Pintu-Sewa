"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import TextedCheckbox from "@/components/fragments/TextedCheckbox"
import Star from "@/public/star.svg"
import { useAuth } from "@/hooks/auth/useAuth"

interface Shop {
  id: string
  name: string
}

interface ProductDetail {
  order_id: string
  product_id: string
  product_name: string
  image: string
  start_rent_date: string
  end_rent_date: string
  quantity: number
  price: number
  sub_total: number
  deposit: number
  shop: Shop | null
}

interface TransactionDetailData {
  reference_number: string
  status: string
  transaction_date: string
  shipping_address: string
  shipping_partner: string
  shipping_code: string | null
}

interface PaymentDetail {
  payment_method: string
  sub_total: number
  shipping_price: number
  service_fee: number
  total_deposit: number
  grand_total: number
}

interface TransactionData {
  transaction_detail: TransactionDetailData
  product_details: ProductDetail[]
  payment_detail: PaymentDetail
  shop_detail: Shop
}

type TransactionDetailContentProps = {
  transactionData: TransactionData
  role: "customer" | "seller"
}

export const TransactionDetailContent = ({ transactionData, role }: TransactionDetailContentProps) => {
  const [showReturnForm, setShowReturnForm] = useState<boolean>(false)
  const [showRentToBuyForm, setShowRentToBuyForm] = useState<boolean>(false)
  const [resiBuying, setResiBuying] = useState<string>("")
  const [nominalAmount, setNominalAmount] = useState<string>("")
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false)
  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null
  const { transaction_detail, product_details, payment_detail, shop_detail } = transactionData
  const status = transaction_detail.status

  const isUnpaid = status === "Belum Dibayar"
  const isProcessed = status === "Diproses" || status === "Dikirim"
  const isRented = status === "Sedang Disewa"
  const isFinished = status === "Selesai"

  const handlePayment = () => {
    localStorage.setItem("paymentAmount", payment_detail.grand_total.toString())
    localStorage.setItem("paymentMethod", payment_detail.payment_method)
    window.location.href = `/payment`
  }

  const handleTrackProduct = () => {
    window.location.href = `/lacak-produk`
  }

  const handleReturnProduct = () => {
    setShowReturnForm(true)
    setShowRentToBuyForm(false)
  }

  const handleBuyProduct = () => {
    setShowRentToBuyForm(true)
    setShowReturnForm(false)
  }

  const handleShowRatingForm = () => {
    setShowRatingForm(true)
  }

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form pengembalian dikirim dengan nomor resi: ${resiBuying}`)
    setShowReturnForm(false)
  }

  const handleSubmitRentToBuy = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Form Rent to Buy dikirim dengan nominal: ${nominalAmount}`)
    setShowRentToBuyForm(false)
  }

  return (
    <div className='w-full'>
      <Card className='mb-6'>
        <CardContent className='pt-6'>
          <div className='flex-col gap-4'>
            <h1 className='text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9]'>Detail Transaksi</h1>
            <div className='flex-col pt-6 space-y-3 '>
              <div className='flex justify-between'>
                <p className='text-sm text-primary'>Nomor Referensi</p>
                <p className='font-semibold text-lg'>{transaction_detail.reference_number}</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm text-primary'>Status Transaksi</p>
                <Badge
                  className={`p-2 ${status === "Belum Dibayar" ? " bg-[#D9D9D9] text-color-primary" : ""} ${status === "Diproses" ? "bg-[#FDCC0D] text-[#590505]" : ""} ${
                    status === "Dikirim" ? "bg-color-third text-color-primaryDark" : ""
                  } ${status === "Sedang Disewa" ? "bg-color-secondary text-white" : ""} ${status === "Dibatalkan" ? "bg-[#BB0909] text-white" : ""} ${status === "Dikembalikan" ? "bg-[#05593E] text-white" : ""} ${
                    status === "Selesai" ? "bg-custom-gradient-tr text-white" : ""
                  }`}
                >
                  {transaction_detail.status}
                </Badge>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm text-primary'>Tanggal Penyewaan</p>
                <p className='font-medium'>{transaction_detail.transaction_date}</p>
              </div>
              {transaction_detail.shipping_address && (
                <div className='flex justify-between'>
                  <p className='text-sm text-primary'>Alamat Pengiriman</p>
                  <p className='font-medium'>{transaction_detail.shipping_address}</p>
                </div>
              )}
              {transaction_detail.shipping_code && (
                <div className='flex justify-between'>
                  <p className='text-sm text-primary'>Kode Pengiriman</p>
                  <p className='font-medium'>{transaction_detail.shipping_code}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader className=''>
          <div className='flex border-b-[1px] border-[#D9D9D9] w-full justify-between pb-4'>
            <h1 className='text-xl font-bold'>Detail Barang</h1>
            {!shopId && (
              <div className='flex space-x-2 items-center justify-between'>
                <p>{shop_detail.name}</p>
                <Link href={`/chat`}>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    Chat Toko
                  </Button>
                </Link>
                <Link href={`/shop/${shop_detail.id}`}>
                  <Button
                    variant='outline'
                    size='sm'
                  >
                    Kunjungi Toko
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {product_details.map((product, index) => (
            <div
              key={product.order_id}
              className='my-4'
            >
              <div className='flex items-start gap-4'>
                <div className='relative w-20 h-20 rounded-md overflow-hidden bg-gray-100'>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.product_name}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full'>
                      <ShoppingBag className='w-8 h-8 text-gray-400' />
                    </div>
                  )}
                </div>
                <div className='flex-1'>
                  <div className='flex justify-between'>
                    <div className='space-y-2'>
                      <h3 className='font-medium'>{product.product_name}</h3>
                      <p className='text-sm text-gray-500'>
                        {product.start_rent_date} - {product.end_rent_date}
                      </p>
                      <p className='text-sm text-gray-500'>
                        {product.quantity} barang x {formatCurrency(product.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {index < product_details.length - 1 && <Separator className='my-4' />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className='mb-6'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9] w-full'>Rincian Pembayaran</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Metode Pembayaran</span>
              <span className='font-medium'>{payment_detail.payment_method}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Subtotal Harga Barang</span>
              <span>{formatCurrency(payment_detail.sub_total)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Total Ongkos Kirim</span>
              <span>{formatCurrency(payment_detail.shipping_price)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Biaya Layanan</span>
              <span>{formatCurrency(payment_detail.service_fee)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Total Deposit</span>
              <span>{formatCurrency(payment_detail.total_deposit)}</span>
            </div>
            <Separator className='my-2' />
            <div className='flex justify-between font-medium'>
              <span>Total Transaksi</span>
              <span>{formatCurrency(payment_detail.grand_total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons hanya untuk customer */}
      {role === "customer" && (
        <div className='flex gap-4 justify-start'>
          {isUnpaid && !showReturnForm && !showRentToBuyForm && (
            <Button
              onClick={handlePayment}
              className='bg-custom-gradient-tr text-white text-lg h-18 hover:text-white hover:opacity-70'
            >
              Bayar
            </Button>
          )}
          {isProcessed && !showReturnForm && !showRentToBuyForm && (
            <Button
              onClick={handleTrackProduct}
              className='bg-custom-gradient-tr text-white text-lg h-18 hover:text-white hover:opacity-70'
            >
              Lacak Pengiriman
            </Button>
          )}
          {isRented && !showReturnForm && !showRentToBuyForm && (
            <>
              <Button
                variant='outline'
                className='bg-custom-gradient-tr text-white text-lg h-18 hover:text-white hover:opacity-70'
                onClick={handleReturnProduct}
              >
                Kembalikan Barang
              </Button>
              <Button
                className='bg-white text-color-primaryDark text-lg h-18 border border-color-primaryDark hover:text-white hover:bg-color-primaryDark'
                onClick={handleBuyProduct}
              >
                Beli Barang
              </Button>
            </>
          )}
          {isFinished && !showReturnForm && !showRentToBuyForm && !showRatingForm && (
            <Button
              onClick={handleShowRatingForm}
              className='bg-custom-gradient-tr text-white text-lg h-18 hover:text-white hover:opacity-70'
            >
              Rating
            </Button>
          )}
        </div>
      )}

      {/* Forms hanya untuk customer */}
      {role === "customer" && showReturnForm && (
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Formulir Pengembalian Barang</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitReturn}>
              <div className='mb-4'>
                <label
                  htmlFor='resi'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Nomor Resi
                </label>
                <Input
                  id='resi'
                  value={resiBuying}
                  onChange={(e) => setResiBuying(e.target.value)}
                  placeholder='Masukkan nomor resi'
                  required
                />
              </div>
              <div className='flex gap-4 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowReturnForm(false)}
                  className='border border-red-800 h-10 hover:text-white hover:bg-red-800'
                >
                  Batal
                </Button>
                <Button
                  className='bg-white text-color-primaryDark text-sm h-10 border border-color-primaryDark hover:bg-color-primaryDark hover:text-white'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {role === "customer" && showRentToBuyForm && (
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle>Formulir Rent to Buy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-4'>
              <p className='text-sm text-gray-500 mb-2'>Rent to Buy memungkinkan Anda untuk membeli barang yang sudah pernah disewa. Nominal yang dibayarkan adalah total harga barang dikurangi total deposit Anda.</p>
            </div>
            <form onSubmit={handleSubmitRentToBuy}>
              <div className='mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Input Nominal</label>
                <div className='flex'>
                  <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500'>Rp</span>
                  <Input
                    type='text'
                    value={nominalAmount}
                    onChange={(e) => setNominalAmount(e.target.value)}
                    className='rounded-l-none'
                    placeholder='10.000.000'
                    required
                  />
                </div>
              </div>
              <div className='flex gap-4 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowRentToBuyForm(false)}
                  className='border border-red-800 h-10 hover:text-white hover:bg-red-800'
                >
                  Batal
                </Button>
                <Button
                  className='bg-white text-color-primaryDark text-sm h-10 border border-color-primaryDark hover:bg-color-primaryDark hover:text-white'
                  type='submit'
                >
                  Bayar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {role === "customer" && showRatingForm && (
        <Card className='mb-6'>
          <CardHeader>
            <CardTitle className='text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9] w-full'>Survey Kepuasaan Penyewaan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='mb-4'>
                <label
                  htmlFor='review'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Ulasan
                </label>
                <Input
                  id='review'
                  placeholder='Barang yang disewa sangat baik dan luar biasa'
                  className='w-full'
                />
              </div>
              <label
                htmlFor='review'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Review
              </label>
              <div className='mx-2 space-y-4'>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <TextedCheckbox key={rating}>
                    <div className='flex space-x-3 items-center'>
                      <Image
                        width={14}
                        height={12}
                        src={Star}
                        alt={`Star ${rating}`}
                      />
                      <p className='text-[12px] text-color-primary'>{rating}</p>
                    </div>
                  </TextedCheckbox>
                ))}
              </div>
              <div className='flex gap-4 justify-end'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setShowRatingForm(false)}
                  className='border border-red-800 h-10 hover:text-white hover:bg-red-800'
                >
                  Batal
                </Button>
                <Button
                  className='bg-white text-color-primaryDark text-sm h-10 border border-color-primaryDark hover:bg-color-primaryDark hover:text-white'
                  type='submit'
                >
                  Submit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
