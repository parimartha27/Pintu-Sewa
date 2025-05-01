import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { StatusBadge } from "./StatusBadge"
import { formatCurrency } from "@/lib/utils"

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
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <TableRow key={transaction.refference_no || index}>
                <TableCell className='font-medium pl-8'>{transaction.refference_no}</TableCell>
                <TableCell>{new Date(transaction.create_at).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.customer_name}</TableCell>
                <TableCell>{transaction.start_date}</TableCell>
                <TableCell>{transaction.end_date}</TableCell>
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
                Tidak ada transaksi berlangsung
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
