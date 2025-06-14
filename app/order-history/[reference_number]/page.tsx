"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { Loader2 } from "lucide-react"
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar"
import { TransactionDetailContent } from "@/components/layout/detail-transaction/detailTransaction"
import { transactionBaseUrl } from "@/types/globalVar"
import { useAuth } from "@/hooks/auth/useAuth"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

interface TransactionResponse {
  error_schema: { error_code: string; error_message: string }
  output_schema: any
}

interface Payload {
  reference_number: string
  customer_id: string
}

export default function CustomerTransactionDetailPage() {
  const params = useParams()
  const [transactionData, setTransactionData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { customerId } = useAuth()
  const reference_number = params.reference_number as string

  useEffect(() => {
    if (!reference_number || !customerId) return

    const fetchTransactionDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const payload: Payload = {
          reference_number: reference_number,
          customer_id: customerId,
        }
        const response = await axios.post<TransactionResponse>(`${transactionBaseUrl}/detail`, payload)

        if (response.data.error_schema.error_code !== "PS-00-000") {
          throw new Error(response.data.error_schema.error_message)
        }

        setTransactionData(response.data.output_schema)
      } catch (err: any) {
        setError(err.message || "Gagal memuat detail transaksi")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactionDetail()
  }, [reference_number, customerId])

  const renderContent = () => {
    if (loading) {
      return (
        <div className='p-8 flex justify-center'>
          <div className='flex flex-col items-center'>
            <Loader2 className='h-8 w-8 animate-spin text-color-secondary' />
            <span className='mt-2 text-gray-500'>Memuat data transaksi...</span>
          </div>
        </div>
      )
    }

    if (error) {
      return <div className='text-center p-8 text-red-500'>Error: {error}</div>
    }

    if (!transactionData) {
      return <div className='text-center p-8'>Tidak ada data ditemukan.</div>
    }

    return (
      <TransactionDetailContent
        transactionData={transactionData}
        role='customer'
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
