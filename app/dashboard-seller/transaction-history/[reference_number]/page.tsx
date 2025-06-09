"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft } from "lucide-react"
import { Loader2 } from "lucide-react"
import { TransactionDetailContent } from "@/components/layout/detail-transaction/detailTransaction"
import { transactionBaseUrl } from "@/types/globalVar"
import SellerLayout from "@/components/layout/dashboard-seller/Layout"

interface TransactionResponse {
  error_schema: { error_code: string; error_message: string }
  output_schema: any
}

interface Payload {
  reference_number: string
  shop_id: string
}

export default function SellerTransactionDetailPage() {
  const params = useParams()
  const [transactionData, setTransactionData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null
  const reference_number = params.reference_number as string

  useEffect(() => {
    if (!reference_number || !shopId) return

    const fetchTransactionDetail = async () => {
      setLoading(true)
      setError(null)
      try {
        const payload: Payload = {
          reference_number: reference_number,
          shop_id: shopId,
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
  }, [reference_number, shopId])

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
        role='seller'
      />
    )
  }

  return (
    <SellerLayout>
      <div className='mb-6'>
        <Link
          href='/dashboard-seller/transaction-history'
          className='flex items-center text-color-secondary mb-4'
        >
          <ArrowLeft className='w-4 h-4 mr-2' />
          <span>Kembali ke Riwayat Transaksi</span>
        </Link>
      </div>
      {renderContent()}
    </SellerLayout>
  )
}
