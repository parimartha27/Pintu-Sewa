"use client"

import { Card, CardTitle, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ProfileSidebarLayout from "../../ProfileSidebar"
import BCA from "@/public/BCA.svg"
import BRI from "@/public/BRI.svg"
import BNI from "@/public/BNI.svg"
import Money from "@/public/money.svg"
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran"
import Image from "next/image"
import Link from "next/link"
import { IoIosArrowRoundBack } from "react-icons/io"

const TopupBody = () => {
  const [amount, setAmount] = useState<string>("")

  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
      <ProfileSidebarLayout />
      <div className='w-full p-2 md:p-0 max-h-auto'>
        <h1 className='font-semibold text-color-primary text-[28px] pb-2'>My Wallet</h1>

        <Link href='/wallet'>
          <span className='flex items-center text-color-secondary hover:cursor-pointer hover:opacity-70'>
            <IoIosArrowRoundBack
              className='mr-1'
              size={28}
            />
            Kembali
          </span>
        </Link>

        <TopupInput
          amount={amount}
          setAmount={setAmount}
        />
        <MetodeTopup amount={amount} />
      </div>
    </div>
  )
}

export default TopupBody

interface TopupInputProps {
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
}

function TopupInput({ amount, setAmount }: TopupInputProps) {
  const [error, setError] = useState<string>("")

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    setAmount(value)

    if (value && parseInt(value) < 10000) {
      setError("Minimal topup adalah 10 Ribu")
    } else {
      setError("")
    }
  }

  const formatAmount = (value: string) => {
    if (!value) return ""
    return new Intl.NumberFormat("id-ID").format(parseInt(value))
  }

  return (
    <main className='w-full py-6'>
      <div className='flex flex-col gap-8 w-full h-full'>
        <div className='space-y-2 w-full'>
          <Card className='w-full'>
            <CardHeader className='items-center justify-between px-4 md:px-6'>
              <CardTitle className='text-md w-full font-semibold  border-b-[#D9D9D9]'>Topup Saldo Wallet</CardTitle>
            </CardHeader>

            <CardContent>
              <div className='flex flex-col w-full'>
                <p className='text-color-primary pb-4'>Nominal</p>
                <form className='w-auto'>
                  <div className='relative h-[40px]'>
                    <div className='absolute inset-y-0 start-0 flex items-center pl-3 h-full'>
                      <p className='text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]'>Rp</p>
                    </div>
                    <input
                      type='text'
                      className='bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                        placeholder:text-color-primary text-[12px] rounded-lg 
                        focus:ring-1 focus:ring-color-primaryDark focus:outline-none
                        focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full'
                      placeholder='0'
                      value={formatAmount(amount)}
                      onChange={handleAmountChange}
                    />
                  </div>
                  {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

interface MetodeTopupProps {
  amount: string
}

function MetodeTopup({ amount }: MetodeTopupProps) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)

  const handleMethodSelect = (methodName: string) => {
    setSelectedMethod(methodName)
    localStorage.setItem("paymentMethod", methodName)
  }

  const handlePayment = () => {
    if (!amount || !selectedMethod) return

    // Simpan amount ke localStorage
    localStorage.setItem("topupAmount", amount)
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
          <h4 className='text-[12px] xl:text-md font-medium '>Bayar</h4>
        </Button>
      </CardFooter>
    </Card>
  )
}
