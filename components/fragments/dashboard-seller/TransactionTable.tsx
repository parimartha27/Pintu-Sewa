import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { Transaction } from "@/types/mockApi"
import { StatusBadge } from "./StatusBadge"
import { formatCurrency } from "@/lib/utils"

type TransactionsTableProps = {
  transactions: Transaction[]
  loading: boolean
}

export const TransactionsTable = ({ transactions, loading }: TransactionsTableProps) => {
  if (loading) {
    return (
      <div className='p-8 flex justify-center'>
        <div className='flex flex-col items-center'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
          <span className='mt-2 text-gray-500'>Memuat data transaksi...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No Referensi</TableHead>
            <TableHead>Tgl Transaksi</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Tgl Mulai</TableHead>
            <TableHead>Tgl Selesai</TableHead>
            <TableHead>Durasi Sewa</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Deposit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={transaction.id || index}>
                <TableCell className='font-medium'>{transaction.reference}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.startDate}</TableCell>
                <TableCell>{transaction.endDate}</TableCell>
                <TableCell>{transaction.duration}</TableCell>
                <TableCell>
                  <StatusBadge status={transaction.status} />
                </TableCell>
                <TableCell>{formatCurrency(transaction.deposit)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
                className='text-center py-4 text-gray-500'
              >
                Tidak ada transaksi berlangsung
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
