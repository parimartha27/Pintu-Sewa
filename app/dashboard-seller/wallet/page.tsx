"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { StatsCard } from "@/components/fragments/dashboard-seller/StatsCard"
import { WalletTransactionsList } from "@/components/fragments/dashboard-seller/WalletTransactionList"
import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

const TransactionHistorySeller = () => {
  const [walletData, setWalletData] = useState({
    balance: 0,
    history: [] as Array<{
      id: string
      description: string
      tanggal_transaksi: string
      waktu_transaksi: string
      amount: number
      debit: boolean
    }>,
    totalIncome: 0,
    totalDepositReturns: 0,
  })
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

  useEffect(() => {
    const loadData = async () => {
      try {
        const shopId = typeof window !== "undefined" ? localStorage.getItem("shopId") : null

        if (!shopId) {
          throw new Error("Shop ID not found")
        }

        const [balance, history] = await Promise.all([fetchWalletBalance(shopId), fetchWalletHistory(shopId)])

        const income = history.filter((t) => t.debit).reduce((sum, t) => sum + t.amount, 0)

        const depositReturns = history
          .filter(
            (t) => !t.debit && /pengembalian dana deposit/i.test(t.description) // pencocokan lebih akurat
          )
          .reduce((sum, t) => sum + t.amount, 0)

        setWalletData({
          balance,
          history,
          totalIncome: income,
          totalDepositReturns: Math.abs(depositReturns),
        })

        setLoading({ balance: false, history: false })
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
        setLoading({ balance: false, history: false })
        setAlertState({
          isOpen: true,
          message: err instanceof Error ? err.message : "Failed to fetch data",
          isWrong: true,
        })
      }
    }

    loadData()
  }, [])

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
          />
          <StatsCard
            title='Total Pemasukkan'
            value={formatCurrency(walletData.totalIncome)}
            loading={loading.history}
          />
          <StatsCard
            title='Pengembalian Deposit'
            value={formatCurrency(walletData.totalDepositReturns)}
            loading={loading.history}
          />
        </div>
        <div className='space-y-4'>
          <p className='font-semibold text-color-primary text-xl'>Riwayat Transaksi</p>
          <div className='bg-white rounded-md shadow overflow-hidden'>
            <WalletTransactionsList
              transactions={walletData.history}
              loading={loading.history}
            />
          </div>
        </div>
        <WithdrawSection />
      </div>
    </SellerLayout>
  )
}

export default TransactionHistorySeller

function WithdrawSection() {
  const router = useRouter()
  const [amount, setAmount] = useState<string>("")
  const [account, setAccount] = useState<string>("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleMethodSelect = (methodName: string) => {
    setSelectedMethod(methodName)
    localStorage.setItem("withdrawMethod", methodName)
  }

  const handlePayment = () => {
    if (!selectedMethod) return

    localStorage.setItem("amountWithdraw", amount)
    localStorage.setItem("accountNumberWithdraw", account)
    router.push("/dashboard-seller/wallet/withdraw")
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // Cegah jika input bukan angka sama sekali
    const value = e.target.value
    if (/^\d{0,16}$/.test(value)) {
      setAmount(value)
    }

    setAmount(rawValue)
  }

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    // Cegah jika input bukan angka sama sekali
    if (!/^\d*$/.test(rawValue)) return

    setAccount(rawValue)
  }

  return (
    <>
      <Card className='w-full px-2  mb-[224px]'>
        <CardHeader className='items-center justify-between'>
          <CardTitle className='text-md w-full font-semibold  border-b-[#D9D9D9]'>Metode Penarikan Saldo</CardTitle>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col w-full'>
            <p className='text-color-primary pb-4'>Nominal</p>
            <form className='w-auto'>
              <div className='relative h-[40px]'>
                <input
                  type='text'
                  className='bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                        placeholder:text-color-primary text-[12px] rounded-lg 
                        focus:ring-1 focus:ring-color-primaryDark focus:outline-none
                        focus:border-color-primaryDark block w-full p-2.5 h-full'
                  placeholder='0'
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
              {/* {error && <p className="text-red-500 text-xs mt-2">{error}</p>} */}
            </form>
          </div>
        </CardContent>
        <CardContent>
          <div className='flex flex-col w-full'>
            <p className='text-color-primary pb-4'>Nomor Rekening</p>
            <form className='w-auto'>
              <div className='relative h-[40px]'>
                <input
                  type='text'
                  className='bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                        placeholder:text-color-primary text-[12px] rounded-lg 
                        focus:ring-1 focus:ring-color-primaryDark focus:outline-none
                        focus:border-color-primaryDark block w-full p-2.5 h-full'
                  placeholder='0'
                  value={account}
                  onChange={handleAccountNumber}
                />
              </div>
              {/* {error && <p className="text-red-500 text-xs mt-2">{error}</p>} */}
            </form>
          </div>
        </CardContent>
        <CardContent className='flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-7 pb-7 pt-[18px] md:pt-0'>
          <div className='flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3'>
            <div
              className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "Bank BCA" ? "bg-blue-50 border border-blue-300" : ""}`}
              onClick={() => handleMethodSelect("Bank BCA")}
            >
              <MetodePembayaranFragments
                nama='Bank BCA'
                gambar={BCA}
              />
            </div>
            <div
              className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "Bank BRI" ? "bg-blue-50 border border-blue-300" : ""}`}
              onClick={() => handleMethodSelect("Bank BRI")}
            >
              <MetodePembayaranFragments
                nama='Bank BRI'
                gambar={BRI}
              />
            </div>
          </div>

          <div className='hidden md:flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]'>
            <div
              className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "Bank BNI" ? "bg-blue-50 border border-blue-300" : ""}`}
              onClick={() => handleMethodSelect("Bank BNI")}
            >
              <MetodePembayaranFragments
                nama='Bank BNI'
                gambar={BNI}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='p-0 pt-[18px] px-7 pb-7 '>
          <Button
            className='w-full max-w-[200px] xl:h-[48px] rounded-xl hover:opacity-80 bg-custom-gradient-tr disabled:opacity-50'
            onClick={handlePayment}
            disabled={!selectedMethod || !amount || parseInt(amount) === 0 || !account}
          >
            <Image
              src={Money}
              alt='money'
              className='w-5 h-3 xl:w-5 xl:h-5'
            />
            <h4 className='text-[12px] xl:text-md font-medium '>Tarik Saldo</h4>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
