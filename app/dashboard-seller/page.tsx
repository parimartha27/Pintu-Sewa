"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter, Users, ShoppingCart, AlertCircle, Star, Loader2 } from "lucide-react"
import { fetchDashboardStats, fetchActiveTransactions, fetchWalletTransactions } from "@/services/mockApiService"
import { DashboardStats, Transaction, WalletTransaction } from "@/types/mockApi"
import { StatsCard } from "@/components/fragments/dashboard-seller/StatsCard"
import { TransactionsTable } from "@/components/fragments/dashboard-seller/TransactionTable"
import { WalletTransactionsList } from "@/components/fragments/dashboard-seller/WalletTransactionList"
import { formatCurrency } from "@/lib/utils"
import SellerLayout from "@/components/layout/dashboard-seller/Layout"

const WalletSeller = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState({
    stats: true,
    transactions: true,
    wallet: true,
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, transactionsData, walletData] = await Promise.all([fetchDashboardStats(), fetchActiveTransactions(), fetchWalletTransactions()])

        setStats(statsData)
        setTransactions(transactionsData)
        setWalletTransactions(walletData)
        setLoading({ stats: false, transactions: false, wallet: false })
      } catch (error) {
        console.error("Error fetching data:", error)
        setLoading({ stats: false, transactions: false, wallet: false })
      }
    }

    loadData()
  }, [])

  return (
    <SellerLayout>
      {" "}
      {/* Stats Overview */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
        <StatsCard
          title='Saldo Wallet'
          value={stats ? formatCurrency(stats.walletBalance) : "Rp 0"}
          loading={loading.stats}
        />

        <StatsCard
          title='Keranjang Customer'
          value={stats?.customerCount || 0}
          icon={<Users className='h-5 w-5 text-blue-500' />}
          loading={loading.stats}
        />

        <StatsCard
          title='Jumlah Transaksi'
          value={stats?.transactionCount || 0}
          icon={<ShoppingCart className='h-5 w-5 text-blue-500' />}
          loading={loading.stats}
        />

        <StatsCard
          title='Jumlah Komplain'
          value={stats?.complaintCount || 0}
          icon={<AlertCircle className='h-5 w-5 text-red-500' />}
          loading={loading.stats}
          className='text-red-500'
        />

        <StatsCard
          title='Status Toko'
          value={
            <div className='flex flex-col'>
              <div className='flex items-center gap-1'>
                <span>{stats?.storeStatus || "Inactive"}</span>
                <span className='bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded'>{stats?.storeStatus || "Inactive"}</span>
              </div>
              <div className='flex items-center'>
                <span className='text-xl font-bold'>{stats?.storeRating.toFixed(1) || "0.0"}</span>
                <Star className='h-4 w-4 fill-yellow-400 text-yellow-400 ml-1' />
              </div>
            </div>
          }
          loading={loading.stats}
        />
      </div>
      {/* Current Transactions */}
      <div className='mb-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>Transaksi Berlangsung</h2>
          <Button
            variant='outline'
            size='sm'
            className='gap-1'
          >
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </div>

        <div className='bg-white rounded-md shadow overflow-hidden'>
          <TransactionsTable
            transactions={transactions}
            loading={loading.transactions}
          />
        </div>
      </div>
      {/* Transaction History */}
      <div>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>Daftar Transaksi</h2>
          <Button
            variant='outline'
            size='sm'
            className='gap-1'
          >
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </div>

        <div className='bg-white rounded-md shadow overflow-hidden'>
          <WalletTransactionsList
            transactions={walletTransactions}
            loading={loading.wallet}
          />
        </div>
      </div>
    </SellerLayout>
  )
}

export default WalletSeller
