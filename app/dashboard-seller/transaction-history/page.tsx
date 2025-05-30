"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { TransactionsTable } from "@/components/fragments/dashboard-seller/TransactionTable"
import { useState, useEffect } from "react"
import { fetchShopTransactions } from "@/services/transactionService"

interface ShopTransaction {
  reference_number: string
  status: string
  transaction_date: string
  shop: {
    id: string
    name: string
  }
  products: Array<{
    productName: string
    quantity: number
    startDate: string
    endDate: string
  }>
  total_price: number
  total_deposit: number
  shipping_partner: string
  shipping_price: number
}

type TransactionsTableProps = {
  transactions: Array<{
    refference_no: string
    create_at: string
    customer_name: string
    start_date: string
    end_date: string
    duration: number
    status: string
    deposit_status: boolean
  }>
  loading: boolean
}

const TransactionHistorySeller = () => {
  const [transactions, setTransactions] = useState<TransactionsTableProps[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null

        if (!shopId) {
          throw new Error("Shop ID not found")
        }

        const transactionsData = await fetchShopTransactions(shopId)
        setTransactions(transactionsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch transactions")
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (error) {
    return (
      <SellerLayout>
        <div className='p-4 text-red-500'>{error}</div>
      </SellerLayout>
    )
  }

  return (
    <SellerLayout>
      <p className='font-semibold text-color-primary text-xl pb-2'>Transaksi Berlangsung</p>
      <div className='flex w-full h-full shadow-sm rounded-xl border items-center'>
        <TransactionsTable
          transactions={transactions || []}
          loading={loading}
        />
      </div>
    </SellerLayout>
  )
}

function calculateDuration(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default TransactionHistorySeller
