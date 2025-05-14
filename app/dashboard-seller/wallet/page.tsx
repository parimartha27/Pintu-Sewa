"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { StatsCard } from "@/components/fragments/dashboard-seller/StatsCard"
import { WalletTransactionsList } from "@/components/fragments/dashboard-seller/WalletTransactionList"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import BCA from "@/public/BCA.svg"
import BRI from "@/public/BRI.svg"
import BNI from "@/public/BNI.svg"
import Money from "@/public/money.svg"
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran"
import Image from "next/image"
import { fetchWalletBalance, fetchWalletHistory } from "@/services/walletService"
import { formatCurrency } from "@/lib/utils"
import Alert from "@/components/layout/Alert"
import { AlertProps } from "@/types/alert"
import { Filter } from "lucide-react"
import { DateRange } from "react-day-picker"
import { format, parse } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const TransactionHistorySeller = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    history: [] as Array<{
      id: string
      description: string
      tanggal_transaksi: string // Format: "YYYY-MM-DD"
      waktu_transaksi: string
      amount: number
      debit: boolean
    }>,
    totalIncome: 0,
    totalDepositReturns: 0,
  })
  const [filteredHistory, setFilteredHistory] = useState(walletData.history)
  const [loading, setLoading] = useState({
    balance: true,
    history: true,
  })
  const [error, setError] = useState<string | null>(null)
  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 30)), // Default to last 30 days
    to: new Date(),
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null

        if (!shopId) {
          throw new Error("Shop ID not found")
        }

        const [balance, history] = await Promise.all([fetchWalletBalance(shopId), fetchWalletHistory(shopId)])

        const income = history.filter((t) => t.debit).reduce((sum, t) => sum + t.amount, 0)

        const depositReturns = history.filter((t) => !t.debit && t.description.includes("Deposit")).reduce((sum, t) => sum + t.amount, 0)

        setWalletData({
          balance,
          history,
          totalIncome: income,
          totalDepositReturns: Math.abs(depositReturns),
        })

        setFilteredHistory(history) // Initialize filtered history with all data
        setLoading({ balance: false, history: false })
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        setLoading({ balance: false, history: false })
        setAlertState({
          isOpen: true,
          message: err instanceof Error ? err.message : "Failed to fetch data",
        })
      }
    }

    loadData()
  }, [])

  // Apply date filter whenever dateRange or walletData changes
  useEffect(() => {
    if (!walletData.history.length) return

    const filtered = walletData.history.filter((transaction) => {
      if (!dateRange?.from && !dateRange?.to) return true

      // Parse tanggal_transaksi from "YYYY-MM-DD" to Date object
      const transactionDate = parse(transaction.tanggal_transaksi, "yyyy-MM-dd", new Date())

      // Adjust time for comparison
      const fromDate = dateRange?.from ? new Date(dateRange.from.setHours(0, 0, 0, 0)) : null
      const toDate = dateRange?.to ? new Date(dateRange.to.setHours(23, 59, 59, 999)) : null

      if (fromDate && toDate) {
        return transactionDate >= fromDate && transactionDate <= toDate
      } else if (fromDate) {
        return transactionDate >= fromDate
      } else if (toDate) {
        return transactionDate <= toDate
      }
      return true
    })

    setFilteredHistory(filtered)
  }, [dateRange, walletData.history])

  if (error) {
    return (
      <SellerLayout>
        <div className='p-4 text-red-500'>{error}</div>
      </SellerLayout>
    )
  }

  return (
    <SellerLayout>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "" })}
          isWrong={alertState.isWrong}
        />
      )}
      <div className='space-y-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
          <StatsCard
            title='Saldo Wallet'
            value={formatCurrency(walletData.balance)}
            loading={loading.balance}
            className='text-color-secondary'
          />
          <StatsCard
            title='Total Pemasukkan'
            value={formatCurrency(walletData.totalIncome)}
            loading={loading.history}
            className='text-green-800'
          />
          <StatsCard
            title='Pengembalian Deposit'
            value={formatCurrency(walletData.totalDepositReturns)}
            loading={loading.history}
            className='text-red-700'
          />
        </div>
        <div className='space-y-4'>
          <div className='flex justify-between items-center'>
            <p className='font-semibold text-color-primary text-xl'>Riwayat Transaksi</p>
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>
          <div className='bg-white rounded-md shadow overflow-hidden'>
            <WalletTransactionsList
              transactions={filteredHistory}
              loading={loading.history}
            />
          </div>
        </div>
        <PaymentMethod />
      </div>
    </SellerLayout>
  )
}

export default TransactionHistorySeller

function DateRangePicker({ dateRange, setDateRange }: { dateRange: DateRange | undefined; setDateRange: (range: DateRange | undefined) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn("gap-1", dateRange && "bg-blue-50")}
        >
          <Filter className='h-4 w-4' />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "dd MMM yyyy")} - {format(dateRange.to, "dd MMM yyyy")}
              </>
            ) : (
              format(dateRange.from, "dd MMM yyyy")
            )
          ) : (
            "Filter Tanggal"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-auto p-0'
        align='end'
      >
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}

function PaymentMethod() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [accountNumber, setAccountNumber] = useState("")
  const [accountName, setAccountName] = useState("")

  const handleMethodSelect = (methodName: string) => {
    setSelectedMethod(methodName)
    localStorage.setItem("paymentMethod", methodName)
  }

  const handlePayment = () => {
    if (!selectedMethod || !accountNumber) {
      // Show error if account number is not filled
      return
    }

    // Save account number to localStorage
    localStorage.setItem("accountNumber", accountNumber)
    localStorage.setItem("accountName", accountName)
    router.push("/payment")
  }

  return (
    <Card className='px-2 md:px-6 mb-[224px]'>
      <CardHeader className='flex flex-col items-center md:flex-row md:justify-between px-0 pb-4 border-b border-[#D9D9D9]'>
        <h2 className='text-md font-semibold text-color-primary'>Metode Penarikan Saldo</h2>
      </CardHeader>

      {/* Account Information Section */}
      <div className='py-6'>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-color-primary mb-1'>Nomor Rekening</label>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Masukkan nomor rekening'
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-color-primary mb-1'>Nama Pemilik Rekening</label>
            <input
              type='text'
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Masukkan nama pemilik rekening'
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <CardContent className='flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-0 pb-7 pt-[18px] md:pt-0'>
        <div className='flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3'>
          <div
            className={`cursor-pointer p-2 rounded-lg flex items-center ${selectedMethod === "BCA Virtual Account" ? "bg-blue-50 border " : ""}`}
            onClick={() => handleMethodSelect("BCA Virtual Account")}
          >
            {/* Lingkaran indikator */}
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center 
        ${selectedMethod === "BCA Virtual Account" ? "border-color-secondary" : "border-gray-300"}`}
            >
              {selectedMethod === "BCA Virtual Account" && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
            </div>
            <MetodePembayaranFragments
              nama='BCA Virtual Account'
              gambar={BCA}
            />
          </div>

          <div
            className={`cursor-pointer p-2 rounded-lg flex items-center ${selectedMethod === "BRI Virtual Account" ? "bg-blue-50 border " : ""}`}
            onClick={() => handleMethodSelect("BRI Virtual Account")}
          >
            {/* Lingkaran indikator */}
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center 
        ${selectedMethod === "BRI Virtual Account" ? "border-color-secondary" : "border-gray-300"}`}
            >
              {selectedMethod === "BRI Virtual Account" && <div className='w-3 h-3 rounded-full bg-blue-500'></div>}
            </div>
            <MetodePembayaranFragments
              nama='BRI Virtual Account'
              gambar={BRI}
            />
          </div>
        </div>

        <div className='hidden md:flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]'>
          <div
            className={`p-2 rounded-lg flex items-center ${selectedMethod === "BNI Virtual Account" ? "bg-blue-50 border " : ""}`}
            onClick={() => handleMethodSelect("BNI Virtual Account")}
          >
            {/* Lingkaran indikator */}
            <div
              className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center 
        ${selectedMethod === "BNI Virtual Account" ? "border-color-secondary" : "border-gray-300"}`}
            >
              {selectedMethod === "BNI Virtual Account" && <div className='w-3 h-3 rounded-full border-color-secondary'></div>}
            </div>
            <MetodePembayaranFragments
              nama='BNI Virtual Account'
              gambar={BNI}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-0 pt-[18px] pb-7'>
        <Button
          className='w-full max-w-[200px] xl:h-[48px] rounded-xl hover:opacity-80 bg-custom-gradient-tr disabled:opacity-50'
          onClick={handlePayment}
          disabled={!selectedMethod || !accountNumber || !accountName}
        >
          <Image
            src={Money}
            alt='money'
            className='w-5 h-3 xl:w-5 xl:h-5'
          />
          <h4 className='text-[12px] xl:text-md font-medium'>Tarik Saldo</h4>
        </Button>
      </CardFooter>
    </Card>
  )
}
