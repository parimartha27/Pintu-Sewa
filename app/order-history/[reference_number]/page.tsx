"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar"
import { TransactionDetailContent } from "@/components/layout/detail-transaction/detailTransaction"
import { transactionBaseUrl } from "@/types/globalVar"
import { useAuth } from "@/hooks/auth/useAuth"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

interface TransactionResponse {
  transaction_detail: {
    reference_number: string
    status: string
    transaction_date: string
    shipping_address: string
    shipping_partner: string
    shipping_code: string | null
  }
  product_details: Array<{
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
  }>
  payment_detail: {
    payment_method: string
    sub_total: number
    shipping_price: number
    service_fee: number
    total_deposit: number
    grand_total: number
  }
  shop_detail: {
    id: string
    name: string
  }
}

export default function CustomerTransactionDetailPage() {
  const params = useParams()
  const [transactionData, setTransactionData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { customerId } = useAuth()
  const reference_number = params.reference_number as string

  const fetchTransactionDetail = useCallback(async () => {
    if (!reference_number || !customerId) return
    setLoading(true)
    setError(null)
    try {
      const payload = { reference_number, customer_id: customerId }
      const response = await axios.post(`${transactionBaseUrl}/detail`, payload)

      if (response.data.error_schema.error_code !== "PS-00-000") {
        throw new Error(response.data.error_schema.error_message)
      }
      setTransactionData(response.data.output_schema)
    } catch (err: any) {
      setError(err.message || "Gagal memuat detail transaksi")
    } finally {
      setLoading(false)
    }
  }, [reference_number, customerId])

  useEffect(() => {
    fetchTransactionDetail()
  }, [fetchTransactionDetail])

  const renderContent = () => {
    if (loading && !transactionData) {
      // Tampilkan loader hanya pada fetch awal
      return (
        <div className='p-8 flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      )
    }
    if (error) return <div className='text-center p-8 text-red-500'>Error: {error}</div>
    if (!transactionData) return <div className='text-center p-8'>Tidak ada data ditemukan.</div>

    return (
      <TransactionDetailContent
        transactionData={transactionData}
        role='customer'
        reFetchData={fetchTransactionDetail} 
      />
    )
  }

  return (
    <>
      <Navbar />
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
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  )
}
