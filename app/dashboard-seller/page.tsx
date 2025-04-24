"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, Users, ShoppingCart, AlertCircle, Star, Store, Loader2 } from "lucide-react"
import NavbarSeller from "@/components/layout/NavbarSeller"
import SellerMenu from "@/components/layout/SellerMenu"
import { fetchDashboardStats, fetchActiveTransactions, fetchWalletTransactions } from "@/services/mockApiService"
import { DashboardStats, Transaction, WalletTransaction } from "@/types/mockApi"

const DashboardSeller = () => {
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
        const statsData = await fetchDashboardStats()
        setStats(statsData)
        setLoading((prev) => ({ ...prev, stats: false }))
      } catch (error) {
        console.error("Error fetching stats:", error)
        setLoading((prev) => ({ ...prev, stats: false }))
      }

      try {
        const transactionsData = await fetchActiveTransactions()
        setTransactions(transactionsData)
        setLoading((prev) => ({ ...prev, transactions: false }))
      } catch (error) {
        console.error("Error fetching transactions:", error)
        setLoading((prev) => ({ ...prev, transactions: false }))
      }

      try {
        const walletData = await fetchWalletTransactions()
        setWalletTransactions(walletData)
        setLoading((prev) => ({ ...prev, wallet: false }))
      } catch (error) {
        console.error("Error fetching wallet transactions:", error)
        setLoading((prev) => ({ ...prev, wallet: false }))
      }
    }

    loadData()
  }, [])

  // Status badge colors
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Belum Dibayar":
        return "bg-gray-200 text-gray-700"
      case "Diproses":
        return "bg-yellow-200 text-yellow-800"
      case "Dikirm":
        return "bg-blue-200 text-blue-800"
      case "Sedang Disewa":
        return "bg-navy-800 text-white"
      case "Dikembalikan":
        return "bg-green-200 text-green-800"
      case "Dibatalkan":
        return "bg-red-200 text-red-800"
      case "Selesai":
        return "bg-navy-700 text-white"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("IDR", "Rp")
  }

  return (
    <div className='flex min-h-screen flex-col'>
      <NavbarSeller />
      <div className='flex flex-1'>
        <SellerMenu  className='w-64 hidden md:block' />

        <main className='flex-1 p-4 md:p-6'>
          {/* Stats Overview */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
            <Card className='col-span-1'>
              <CardContent className='pt-4'>
                <p className='text-sm text-gray-500'>Saldo Wallet</p>
                {loading.stats ? (
                  <div className='flex items-center space-x-2 mt-1'>
                    <Loader2 className='h-4 w-4 animate-spin' />
                    <span className='text-gray-500'>Loading...</span>
                  </div>
                ) : (
                  <h3 className='text-xl font-bold'>{stats ? formatCurrency(stats.walletBalance) : "Rp 0"}</h3>
                )}
              </CardContent>
            </Card>

            <Card className='col-span-1 flex items-center'>
              <CardContent className='flex items-center p-4 gap-2'>
                <Users className='h-5 w-5 text-blue-500' />
                <div>
                  <p className='text-sm text-gray-500'>Keranjang Customer</p>
                  {loading.stats ? (
                    <div className='flex items-center space-x-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  ) : (
                    <h3 className='text-xl font-bold'>{stats?.customerCount || 0}</h3>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className='col-span-1 flex items-center'>
              <CardContent className='flex items-center p-4 gap-2'>
                <ShoppingCart className='h-5 w-5 text-blue-500' />
                <div>
                  <p className='text-sm text-gray-500'>Jumlah Transaksi</p>
                  {loading.stats ? (
                    <div className='flex items-center space-x-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  ) : (
                    <h3 className='text-xl font-bold'>{stats?.transactionCount || 0}</h3>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className='col-span-1 flex items-center'>
              <CardContent className='flex items-center p-4 gap-2'>
                <AlertCircle className='h-5 w-5 text-red-500' />
                <div>
                  <p className='text-sm text-gray-500'>Jumlah Komplain</p>
                  {loading.stats ? (
                    <div className='flex items-center space-x-2'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  ) : (
                    <h3 className='text-xl font-bold text-red-500'>{stats?.complaintCount || 0}</h3>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className='col-span-1 flex items-center'>
              <CardContent className='flex p-4 gap-2'>
                <div className='flex-grow'>
                  <div className='flex items-center gap-1'>
                    <p className='text-sm text-gray-500'>Status Toko</p>
                    {loading.stats ? (
                      <div className='flex items-center space-x-2'>
                        <Loader2 className='h-4 w-4 animate-spin' />
                      </div>
                    ) : (
                      <div className='bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded'>{stats?.storeStatus || "Inactive"}</div>
                    )}
                  </div>
                  {loading.stats ? (
                    <div className='flex items-center space-x-2 mt-1'>
                      <Loader2 className='h-4 w-4 animate-spin' />
                    </div>
                  ) : (
                    <div className='flex items-center'>
                      <h3 className='text-xl font-bold'>{stats?.storeRating.toFixed(1) || "0.0"}</h3>
                      <Star className='h-4 w-4 fill-yellow-400 text-yellow-400 ml-1' />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
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
              {loading.transactions ? (
                <div className='p-8 flex justify-center'>
                  <div className='flex flex-col items-center'>
                    <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
                    <span className='mt-2 text-gray-500'>Memuat data transaksi...</span>
                  </div>
                </div>
              ) : (
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
                              <span className={`px-2 py-1 rounded-md text-xs ${getStatusBadgeClass(transaction.status)}`}>{transaction.status}</span>
                            </TableCell>
                            <TableCell>{transaction.deposit}</TableCell>
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
              )}
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
              {loading.wallet ? (
                <div className='p-8 flex justify-center'>
                  <div className='flex flex-col items-center'>
                    <Loader2 className='h-8 w-8 animate-spin text-blue-500' />
                    <span className='mt-2 text-gray-500'>Memuat data wallet...</span>
                  </div>
                </div>
              ) : (
                <div className='space-y-0'>
                  {walletTransactions.length > 0 ? (
                    walletTransactions.map((transaction, index) => (
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
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardSeller
