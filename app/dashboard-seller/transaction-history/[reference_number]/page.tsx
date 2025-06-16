"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { TransactionDetailContent } from "@/components/layout/detail-transaction/detailTransaction"
import { transactionBaseUrl } from "@/types/globalVar"
import SellerLayout from "@/components/layout/dashboard-seller/Layout"

export default function SellerTransactionDetailPage() {
  const params = useParams()
  const [transactionData, setTransactionData] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null
  const reference_number = params.reference_number as string

  const fetchTransactionDetail = useCallback(async () => {
    if (!reference_number || !shopId) return
    setLoading(true)
    setError(null)
    try {
      const payload = { reference_number, shop_id: shopId }
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
  }, [reference_number, shopId])

  useEffect(() => {
    fetchTransactionDetail()
  }, [fetchTransactionDetail])

  const renderContent = () => {
    if (loading && !transactionData) {
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
        role='seller'
        reFetchData={fetchTransactionDetail} 
      />
    )
  }

  return (
    <SellerLayout>
      <Link
        href='/dashboard-seller/transaction-history'
        className='flex items-center ...'
      >
        <ArrowLeft /> Kembali
      </Link>
      {renderContent()}
    </SellerLayout>
  )
}
