"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import Image from "next/image"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { transactionBaseUrl } from "@/types/globalVar"
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar"
import { useAuth } from "@/hooks/auth/useAuth"
import FilterSection from "@/components/fragments/shop/ProductFilter"
import TextedCheckbox from "@/components/fragments/TextedCheckbox"
import Star from "@/public/star.svg"

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

interface TransactionDetail {
  reference_number: string
  status: string
  transaction_date: string
  shipping_address: string
  shipping_partner: string
  shipping_code: string | null
  return_code: string
}

interface PaymentDetail {
  payment_method: string
  sub_total: number
  shipping_price: number
  service_fee: number
  total_deposit: number
  grand_total: number
}

interface TransactionResponse {
  error_schema: {
    error_code: string
    error_message: string
  }
  output_schema: {
    transaction_detail: TransactionDetail
    product_details: ProductDetail[]
    payment_detail: PaymentDetail
    shop_detail: Shop
  }
}

interface Payload {
  reference_number: string
  customer_id: string
}

export default function TransactionDetail() {
  const [transactionData, setTransactionData] = useState<TransactionResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showReturnForm, setShowReturnForm] = useState<boolean>(false)
  const [showRentToBuyForm, setShowRentToBuyForm] = useState<boolean>(false)
  const [resiBuying, setResiBuying] = useState<string>("")
  const [nominalAmount, setNominalAmount] = useState<string>("")
  const { customerId } = useAuth()
  const [showRatingForm, setShowRatingForm] = useState<boolean>(false)
  const [rating, setRating] = useState<string>("")
  const [review, setReview] = useState<string>("")

  useEffect(() => {
    const fetchTransactionDetail = async () => {
      try {
        setLoading(true)
        const refNumber = localStorage.getItem("reference_number") || ""

        if (!refNumber || !customerId) {
          throw new Error("Reference number or customer ID not found")
        }
        const payload: Payload = {
          reference_number: refNumber,
          customer_id: customerId,
        }

        const response = await axios.post(`${transactionBaseUrl}/detail`, payload)
        setTransactionData(response.data)
      } catch (err: any) {
        setError(err.message || "Failed to fetch transaction details")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionDetail()
  }, [])

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

  const handlePayment = () => {
    if (!transactionData) return
    const { payment_detail } = transactionData.output_schema
    localStorage.setItem("paymentAmount", payment_detail.grand_total.toString())
    localStorage.setItem("paymentMethod", payment_detail.payment_method)
    window.location.href = `/payment`
  }

  const handleTrackProduct = () => {
    window.location.href = `/lacak-produk`
  }

  const handleSubmitReturn = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Return form submitted with resi number: ${resiBuying}`)
    setShowReturnForm(false)
  }

  const handleSubmitRentToBuy = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Rent to Buy form submitted with amount: ${nominalAmount}`)
    setShowRentToBuyForm(false)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium'>Loading transaction details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium text-red-500'>Error: {error}</p>
          <Button
            className='mt-4'
            variant='outline'
            asChild
          >
            <Link href='/order-history'>Back to Transactions</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (!transactionData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium'>No transaction data found</p>
          <Button
            className='mt-4'
            variant='outline'
            asChild
          >
            <Link href='/order-history'>Back to Transactions</Link>
          </Button>
        </div>
      </div>
    )
  }

  const { transaction_detail, product_details, payment_detail, shop_detail } = transactionData.output_schema
  const status = transaction_detail.status

  const isUnpaid = status === "Belum Dibayar"
  const isProcessed = status === "Diproses" || status === "Dikirim"
  const isRented = status === "Sedang Disewa"
  const isFinished = status === "Selesai"

  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout mb-48'>
      <ProfileSidebarLayout />
      <div className='w-full'>
        <div className='mb-6'>
          <Link
            href='/order-history'
            className='flex items-center text-color-secondary mb-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            <span>Kembali</span>
          </Link>
        </div>

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
                    className={`p-2
                        ${status === "Belum Dibayar" ? " bg-[#D9D9D9] text-color-primary" : ""}
                        ${status === "Diproses" ? "bg-[#FDCC0D] text-[#590505]" : ""}
                        ${status === "Dikirim" ? "bg-color-third text-color-primaryDark" : ""}
                        ${status === "Sedang Disewa" ? "bg-color-secondary text-white" : ""}
                        ${status === "Dibatalkan" ? "bg-[#BB0909] text-white" : ""}
                        ${status === "Dikembalikan" ? "bg-[#05593E] text-white" : ""}
                        ${status === "Selesai" ? "bg-custom-gradient-tr text-white" : ""}
                      `}
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

                {transaction_detail.return_code && (
                  <div className='flex justify-between'>
                    <p className='text-sm text-primary'>Kode Pengembalian</p>
                    <p className='font-medium'>{transaction_detail.return_code}</p>
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

        {/* Action buttons based on status */}
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
                className='bg-white text-color-primaryDark text-lg h-18 border
                 border-color-primaryDark hover:text-white hover:bg-color-primaryDark'
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

        {/* Return Product Form */}
        {showReturnForm && (
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

        {/* Rent to Buy Form */}
        {showRentToBuyForm && (
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

        {showRatingForm && (
          <Card className='mb-6'>
            <CardHeader>
              <CardTitle className='text-xl font-bold pb-4 border-b-[1px] border-[#D9D9D9] w-full'>Survey Kepuasaan Penyewaan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {/* Review Text Input */}
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

                {/* Rating Input */}
                <div className='mx-2 space-y-4'>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <TextedCheckbox
                      key={rating}
                      // checked={isCheckboxSelected("minRatings", rating.toString())}
                      // onCheckedChange={() => handleCheckboxFilter("minRatings", rating.toString(), !isCheckboxSelected("minRatings", rating.toString()))}
                    >
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
    </div>
  )
}
