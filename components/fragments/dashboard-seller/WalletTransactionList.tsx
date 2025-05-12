import { Loader2 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

type WalletTransactionsListProps = {
  transactions: Array<{
    id: string
    description: string
    tanggal_transaksi: string
    waktu_transaksi: string
    amount: number
    debit: boolean
  }>
  loading: boolean
}

export const WalletTransactionsList = ({ transactions, loading }: WalletTransactionsListProps) => {
  if (loading) {
    return (
      <div className='p-8 flex justify-center'>
        <div className='flex flex-col items-center'>
          <Loader2 className='h-8 w-8 animate-spin text-color-secondary' />
          <span className='mt-2 text-gray-500'>Memuat data wallet...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-0'>
      {transactions.length > 0 ? (
        transactions.map((transaction) => (
          <div
            key={transaction.id}
            className='p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50'
          >
            <div>
              <p className='font-medium'>{transaction.description}</p>
              <p className='text-sm text-gray-500'>
                {transaction.tanggal_transaksi} - {transaction.waktu_transaksi}
              </p>
            </div>
            <div className={`font-medium ${transaction.debit ? "text-green-600" : "text-red-600"}`}>
              {transaction.debit ? "+ " : "- "}
              {formatCurrency(Math.abs(transaction.amount))}
            </div>
          </div>
        ))
      ) : (
        <div className='py-8 text-center text-gray-500'>Tidak ada riwayat transaksi</div>
      )}
    </div>
  )
}
