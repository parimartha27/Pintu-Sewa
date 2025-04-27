import { Loader2 } from "lucide-react"
import { WalletTransaction } from "@/types/mockApi"
import { formatCurrency } from "@/lib/utils"

type WalletTransactionsListProps = {
  transactions: WalletTransaction[]
  loading: boolean
}

export const WalletTransactionsList = ({ transactions, loading }: WalletTransactionsListProps) => {
  if (loading) {
    return (
      <div className='p-8 flex justify-center'>
        <div className='flex flex-col items-center'>
          <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
          <span className='mt-2 text-gray-500'>Memuat data wallet...</span>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-0'>
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => (
          <div
            key={transaction.id || index}
            className='p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50'
          >
            <div>
              <p className='font-medium'>{transaction.type}</p>
              <p className='text-sm text-gray-500'>
                {transaction.date} - {transaction.time}
              </p>
            </div>
            <div className={`font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
              {transaction.amount > 0 ? "+ " : "- "}
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
