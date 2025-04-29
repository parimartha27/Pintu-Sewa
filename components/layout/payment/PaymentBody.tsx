"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { walletBaseUrl } from "@/types/globalVar"
import axios from "axios"

const PaymentBody = () => {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string>("")
  const [paymentData, setPaymentData] = useState({
    deadline: "",
    method: "Unknown Method",
    accountNumber: "",
    totalAmount: "0",
  })

  // Generate random VA number based on method
  const generateAccountNumber = (method: string) => {
    const prefixes: Record<string, string> = {
      "BCA Virtual Account": "1234",
      "BRI Virtual Account": "5678",
      "BNI Virtual Account": "9012",
    }
    const randomSuffix = Math.floor(Math.random() * 1000000000)
      .toString()
      .padStart(9, "0")
    return prefixes[method] ? prefixes[method] + randomSuffix : "1234" + randomSuffix
  }

  // Initialize payment data with 3 hour deadline
  useEffect(() => {
    const storedAmount = localStorage.getItem("grandTotalPayment") || "0"
    const storedMethod = localStorage.getItem("paymentMethod") || "Unknown Method"

    const formattedDeadline =
      new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
      }) + " WIB"

    setPaymentData({
      deadline: formattedDeadline,
      method: storedMethod,
      accountNumber: generateAccountNumber(storedMethod),
      totalAmount: new Intl.NumberFormat("id-ID").format(parseInt(storedAmount)),
    })

    // Save to localStorage for persistence
    localStorage.setItem(
      "paymentData",
      JSON.stringify({
        deadline: formattedDeadline,
        method: storedMethod,
        accountNumber: generateAccountNumber(storedMethod),
        totalAmount: storedAmount,
        generatedAt: new Date().toISOString(),
      })
    )
  }, [])

  const handleCheckStatus = async () => {
    setIsLoading(true)
    try {
      const customerId = localStorage.getItem("customerId")
      const response = await axios.patch(`${walletBaseUrl}/topup?customerId=${customerId}&amount=${paymentData.totalAmount.replace(/\./g, "")}`)

      localStorage.removeItem("grandTotalPayment")
      localStorage.removeItem("paymentMethod")
      localStorage.removeItem("paymentData")
      router.push("/order-history")
    } catch (error) {
      console.error("Payment failed:", error)
      alert("Pembayaran gagal, silakan coba lagi")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getBankLogo = (method: string) => {
    const logos: Record<string, string> = {
      "BCA Virtual Account": "/BCA.svg",
      "BRI Virtual Account": "/BRI.svg",
      "BNI Virtual Account": "/BNI.svg",
    }
    return logos[method] || "/BCA.svg"
  }

  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
      <div className='w-full p-2 md:p-0 max-h-auto'>
        <h1 className='font-semibold text-color-primary text-[28px]'>Pembayaran</h1>

        <main className='w-full py-8'>
          <div className='flex flex-col gap-8 w-full h-full'>
            <Card className='w-full'>
              <CardHeader>
                <div className='border-b pb-4 min-w-full'>
                  <CardTitle className='text-xl font-semibold text-color-primary'>Batas akhir pembayaran</CardTitle>
                </div>
              </CardHeader>

              <CardContent className='space-y-2'>
                <div className='flex items-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-gray-500 mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <p className='text-lg text-color-primary'>{paymentData.deadline}</p>
                </div>
              </CardContent>
            </Card>

            <Card className='w-full'>
              <CardHeader className='flex flex-row items-center justify-between '>
                <CardTitle className='text-xl font-semibold text-color-primary border-b pb-4 min-w-full'>{paymentData.method}</CardTitle>
                <div className='flex items-center justify-center w-12 h-8'>
                  <Image
                    src={getBankLogo(paymentData.method)}
                    alt={`${paymentData.method} Logo`}
                    width={48}
                    height={24}
                  />
                </div>
              </CardHeader>

              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <p className='text-lg text-gray-500'>Nomor Virtual Account</p>
                  <div className='flex justify-between items-center'>
                    <p className='text-xl font-medium text-color-primary'>{paymentData.accountNumber}</p>
                    <button
                      onClick={handleCopy}
                      className='text-color-secondary font-medium hover:underline'
                    >
                      {copied ? "Disalin" : "Salin"}
                    </button>
                  </div>
                </div>

                <div className='space-y-2'>
                  <p className='text-md text-gray-500'>Total Pembayaran</p>
                  <p className='text-[24px] font-semibold text-color-secondary'>Rp{paymentData.totalAmount}</p>
                </div>

                <div className='pt-4 text-center border-t min-w-full'>
                  <p className='font-medium text-color-secondary hover:underline cursor-pointer'>Lihat Cara Pembayaran</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className='space-y-6 py-6'>
                <p className='text-lg text-gray-600'>Silakan lakukan pembayaran segera agar proses sewa dapat dilakukan</p>
                <Button
                  onClick={handleCheckStatus}
                  className='bg-custom-gradient-tr text-white p-6 rounded-lg hover:bg-color-secondary transition-colors w-full'
                  disabled={isLoading || timeLeft === "Waktu pembayaran telah habis"}
                >
                  {isLoading ? "Memproses..." : "Cek Status Pembayaran"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PaymentBody
