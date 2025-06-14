"use client"

import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { StatusBadge } from "./StatusBadge"

type TransactionsTableProps = {
  transactions: Array<{
    reference_number: string
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

export const TransactionsTable = ({ transactions, loading }: TransactionsTableProps) => {
  const router = useRouter()

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

  const handleRowClick = (referenceNumber: string) => {
    // Arahkan ke halaman detail dinamis milik SELLER
    router.push(`/dashboard-seller/transaction-history/${referenceNumber}`)
  }

  return (
    <div className='overflow-x-auto w-full h-full'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='pl-8 py-4'>No Referensi</TableHead>
            <TableHead>Tgl Transaksi</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Tgl Mulai</TableHead>
            <TableHead>Tgl Selesai</TableHead>
            <TableHead>Durasi Sewa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deposit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='h-60 items-center align-middle'>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.reference_number}
                onClick={() => handleRowClick(transaction.reference_number)}
                className='cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800'
              >
                <TableCell className='font-medium pl-8'>{transaction.reference_number}</TableCell>
                <TableCell>{new Date(transaction.create_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                <TableCell>{transaction.customer_name}</TableCell>
                <TableCell>{new Date(transaction.start_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                <TableCell>{new Date(transaction.end_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                <TableCell>{transaction.duration} hari</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell>{transaction.deposit_status ? "Sudah" : "Belum"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-center py-4 text-gray-500'
              >
                Tidak ada transaksi ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
