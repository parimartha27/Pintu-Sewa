"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import { StatsCard } from "@/components/fragments/dashboard-seller/StatsCard"
import { WalletTransactionsList } from "@/components/fragments/dashboard-seller/WalletTransactionList"
import { WalletTransaction } from "@/types/mockApi"
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

const TransactionHistorySeller = () => {
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const walletData = fetchWalletTransactions()

        setWalletTransactions(walletData)
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
      <div className='space-y-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6'>
          <StatsCard
            title='Saldo Wallet'
            value={"Rp 0"}
          />
          <StatsCard
            title='Total Pemasukkan'
            value={"Rp 0"}
          />

          <StatsCard
            title='Pengembalian Deposit'
            value={"Rp 0"}
          />
        </div>
        <div className="space-y-4">
          <p className='font-semibold text-color-primary text-xl'>Transaksi Berlangsung</p>
          <div className='bg-white rounded-md shadow overflow-hidden'>
            <WalletTransactionsList
              transactions={walletTransactions}
              loading={false}
            />
          </div>
        </div>
        <PaymentMethod />
      </div>
    </SellerLayout>
  )
}

export default TransactionHistorySeller

const fetchWalletTransactions = (): WalletTransaction[] => {
  return [
    {
      id: "w1",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w2",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
    {
      id: "w3",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w4",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
    {
      id: "w5",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w6",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
  ]
}

function PaymentMethod() {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleMethodSelect = (methodName: string) => {
    setSelectedMethod(methodName)
    localStorage.setItem("paymentMethod", methodName)
  }

  const handlePayment = () => {
    if (!selectedMethod) return

    router.push("/wallet/topup/confirmation")
  }
  return (
    <Card className='px-2 md:px-6 mb-[224px]'>
      <CardHeader className='flex flex-col items-center md:flex-row md:justify-between px-0'>
        <h2 className='text-md font-semibold text-color-primary'>Metode Topup</h2>
        <h3 className='text-sm font-medium text-color-secondary hover:opacity-70 hover:cursor-pointer'>Lihat Semua</h3>
      </CardHeader>
      <CardContent className='flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-0 pb-7 pt-[18px] md:pt-0 border-t-[1px] border-t-[#D9D9D9]'>
        <div className='flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3'>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BCA Virtual Account" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BCA Virtual Account")}
          >
            <MetodePembayaranFragments
              nama='BCA Virtual Account'
              gambar={BCA}
            />
          </div>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BRI Virtual Account" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BRI Virtual Account")}
          >
            <MetodePembayaranFragments
              nama='BRI Virtual Account'
              gambar={BRI}
            />
          </div>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BNI Virtual Account" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BNI Virtual Account")}
          >
            <MetodePembayaranFragments
              nama='BNI Virtual Account'
              gambar={BNI}
            />
          </div>
        </div>

        <div className='hidden md:flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]'>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BCA Virtual Account (2)" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BCA Virtual Account (2)")}
          >
            <MetodePembayaranFragments
              nama='BCA Virtual Account'
              gambar={BCA}
            />
          </div>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BRI Virtual Account (2)" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BRI Virtual Account (2)")}
          >
            <MetodePembayaranFragments
              nama='BRI Virtual Account'
              gambar={BRI}
            />
          </div>
          <div
            className={`cursor-pointer p-2 rounded-lg ${selectedMethod === "BNI Virtual Account (2)" ? "bg-blue-50 border border-blue-300" : ""}`}
            onClick={() => handleMethodSelect("BNI Virtual Account (2)")}
          >
            <MetodePembayaranFragments
              nama='BNI Virtual Account'
              gambar={BNI}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-0 pt-[18px] pb-7 '>
        <Button
          className='w-full max-w-[200px] xl:h-[48px] rounded-xl hover:opacity-80 bg-custom-gradient-tr disabled:opacity-50'
          onClick={handlePayment}
          disabled={!selectedMethod}
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
  )
}
