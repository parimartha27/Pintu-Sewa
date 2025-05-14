"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { TransactionsTable } from "@/components/fragments/dashboard-seller/TransactionTable"
import { useState, useEffect } from "react"
import { fetchShopTransactions } from "@/services/transactionService"
import { Button } from "@/components/ui/button"
import { Filter, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
  refference_no: string
  create_at: string
  customer_name: string
  start_date: string
  end_date: string
  duration: number
  status: string
  deposit_status: boolean
}

// Define possible status values
const STATUS_OPTIONS = [
  { value: "all", label: "Semua Status" },
  { value: "Belum Dibayar", label: "Belum Dibayar" },
  { value: "Diproses", label: "Diproses" },
  { value: "Dikirim", label: "Dikirim" },
  { value: "Sedang Disewa", label: "Sedang Disewa" },
  { value: "Dibatalkan", label: "Dibatalkan" },
  { value: "Dikembalikan", label: "Dikembalikan" },
  { value: "Selesai", label: "Selesai" },
]

const TransactionHistorySeller = () => {
  const [transactions, setTransactions] = useState<ShopTransaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<ShopTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null

        if (!shopId) {
          throw new Error("Shop ID not found")
        }

        const transactionsData = await fetchShopTransactions(shopId)
        setTransactions(transactionsData)
        setFilteredTransactions(transactionsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError(error instanceof Error ? error.message : "Failed to fetch transactions")
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredTransactions(transactions)
    } else {
      const filtered = transactions.filter((transaction) => transaction.status.toLowerCase() === statusFilter.toLowerCase())
      setFilteredTransactions(filtered)
    }
  }, [statusFilter, transactions])

  const mapToTableData = (transactions: ShopTransaction[]): TransactionsTableProps[] => {
    return transactions.map((t) => ({
      refference_no: t.reference_number,
      create_at: t.transaction_date,
      customer_name: t.shop.name,
      start_date: t.products[0]?.startDate || "",
      end_date: t.products[0]?.endDate || "",
      duration: calculateDuration(t.products[0]?.startDate, t.products[0]?.endDate),
      status: t.status,
      deposit_status: t.total_deposit > 0,
    }))
  }

  if (error) {
    return (
      <SellerLayout>
        <div className='p-4 text-red-500'>{error}</div>
      </SellerLayout>
    )
  }

  return (
    <SellerLayout>
      <div className='flex justify-between pb-2'>
        <p className='font-semibold text-color-primary text-xl pb-2'>Transaksi Berlangsung</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='sm'
              className='gap-1'
            >
              <Filter className='h-4 w-4' />
              Filter Status
              <ChevronDown className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {STATUS_OPTIONS.map((option) => (
              <DropdownMenuCheckboxItem
                key={option.value}
                checked={statusFilter === option.value}
                onCheckedChange={() => setStatusFilter(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex w-full h-full shadow-sm rounded-xl border items-center'>
        <TransactionsTable
          transactions={mapToTableData(filteredTransactions)}
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
