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

const TransactionHistorySeller = () => {
  const [transactions, setTransactions] = useState<ShopTransaction[]>([])
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
      <div className='flex w-full h-full shadow-sm rounded-xl border'>
        <TransactionsTable
          transactions={transactions.map((t) => ({
            refference_no: t.reference_number,
            create_at: t.transaction_date,
            customer_name: t.products[0]?.productName || "N/A",
            start_date: t.products[0]?.startDate || "N/A",
            end_date: t.products[0]?.endDate || "N/A",
            duration: calculateDuration(t.products[0]?.startDate, t.products[0]?.endDate),
            status: t.status,
            deposit_status: t.total_deposit > 0,
          }))}
          loading={loading}
        />
      </div>
    </SellerLayout>
  )
}

// Helper function to calculate duration in days
function calculateDuration(startDate: string, endDate: string): number {
  if (!startDate || !endDate) return 0
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export default TransactionHistorySeller
