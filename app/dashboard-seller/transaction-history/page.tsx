"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { TransactionsTable } from "@/components/fragments/dashboard-seller/TransactionTable"
import { useState, useEffect } from "react"
import { Transaction } from "@/types/mockApi"
import { fetchActiveTransactions } from "@/services/mockApiService"

const TransactionHistorySeller = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchActiveTransactions = () => {
    return [
      {
        id: "1",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Belum Dibayar",
        deposit: "-",
      },
      {
        id: "2",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Diproses",
        deposit: "Ditahan",
      },
      {
        id: "3",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dikirm",
        deposit: "Ditahan",
      },
      {
        id: "4",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Sedang Disewa",
        deposit: "Ditahan",
      },
      {
        id: "5",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dikembalikan",
        deposit: "Ditahan",
      },
      {
        id: "6",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dibatalkan",
        deposit: "Ditahan",
      },
      {
        id: "7",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Selesai",
        deposit: "Ditahan",
      },
      {
        id: "8",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Belum Dibayar",
        deposit: "-",
      },
      {
        id: "9",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Diproses",
        deposit: "Ditahan",
      },
      {
        id: "10",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dikirm",
        deposit: "Ditahan",
      },
      {
        id: "11",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Sedang Disewa",
        deposit: "Ditahan",
      },
      {
        id: "12",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dikembalikan",
        deposit: "Ditahan",
      },
      {
        id: "13",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Dibatalkan",
        deposit: "Ditahan",
      },
      {
        id: "14",
        reference: "PS20230317141010123",
        transactionDate: "22 Apr 2025",
        customer: "Parimartha",
        startDate: "21 Apr 2025",
        endDate: "24 Apr 2025",
        duration: "4 Hari",
        status: "Selesai",
        deposit: "Ditahan",
      },
    ]
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        const transactionsData = fetchActiveTransactions()

        setTransactions(transactionsData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])
  return (
    <SellerLayout>
      <p className="font-semibold text-color-primary text-xl pb-2">Transaksi Berlangsung</p>
      <div className='flex w-full h-full shadow-sm rounded-xl border'>
        <TransactionsTable
          transactions={transactions}
          loading={loading}
        />
      </div>
    </SellerLayout>
  )
}

export default TransactionHistorySeller
