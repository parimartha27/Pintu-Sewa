"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { walletBaseUrl } from "@/types/globalVar"
import axios from "axios"
import Alert from "@/components/layout/Alert"
import { AlertProps } from "@/types/alert"
import { useAuth } from "@/hooks/auth/useAuth"
import PaymentStepModals from "@/components/layout/payment/PaymentStepModals"

const TopupConfirmationPage = () => {
  const router = useRouter()
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPaymentStepOpen, setIsPaymentStepOpen] = useState(false)
  const [amount, setAmount] = useState("0")
  const [method, setMethod] = useState("Unknown Method")
  const { customerId } = useAuth()

  const [alertState, setAlertState] = useState<AlertProps>({
    isOpen: false,
    message: "",
    isWrong: true,
  })
  useEffect(() => {
    const storedAmount = localStorage.getItem("topupAmount") || "0"
    const storedMethod = localStorage.getItem("paymentMethod") || "Unknown Method"

    setAmount(storedAmount)
    setMethod(storedMethod)
  }, [])

  // Format data
  const paymentData = {
    deadline:
      new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
        hour12: false,
      }) + " WIB",
    method: method,
    accountNumber: "123401081529518909", // Ini bisa digenerate atau dari API
    totalAmount: new Intl.NumberFormat("id-ID").format(parseInt(amount)),
  }

  const handleCheckStatus = async () => {
    setIsLoading(true)
    try {
      const response = await axios.patch(`${walletBaseUrl}/topup?customerId=${customerId}&amount=${amount}`)

      localStorage.removeItem("topupAmount")
      localStorage.removeItem("paymentMethod")
      router.push("/wallet")
    } catch (error) {
      console.error("Payment failed:", error)
      setAlertState({ isOpen: true, message: "Pembayaran Gagal, Silahkan Coba Lagi" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentData.accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {alertState.isOpen && (
        <Alert
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={() => setAlertState({ isOpen: false, message: "", isWrong: true })}
          isWrong={alertState.isWrong}
        />
      )}
      <Navbar />
      <PaymentStepModals
        isOpen={isPaymentStepOpen}
        onClose={() => setIsPaymentStepOpen(false)}
      />
      <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
        <ProfileSidebarLayout />
        <div className='w-full p-2 md:p-0 max-h-auto'>
          <h1 className='font-semibold text-color-primary text-[28px]'>My Wallet</h1>

          <main className='w-full py-8'>
            <div className='flex flex-col gap-8 w-full h-full'>
              <Card className='w-full'>
                <CardHeader>
                  <div className='border-b pb-4 min-w-full'>
                    <CardTitle className='text-md font-semibold text-color-primary'>Batas akhir pembayaran</CardTitle>
                  </div>
                </CardHeader>

                <CardContent>
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
                    <p className='text-md font-medium'>{paymentData.deadline}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className='w-full'>
                <CardHeader className='flex flex-row items-center justify-between '>
                  <CardTitle className='text-md font-semibold text-color-primary border-b pb-4 min-w-full'>{paymentData.method}</CardTitle>
                  <div className='flex items-center justify-center w-12 h-8'>
                    <Image
                      src='/BCA.svg'
                      alt='BCA Logo'
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
                      <p
                        onClick={handleCopy}
                        className='text-color-secondary font-medium'
                      >
                        {" "}
                        {copied ? "Disalin" : "Salin"}
                      </p>
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-md text-gray-500'>Total Pembayaran</p>
                    <p className='text-[24px] font-semibold text-color-secondary'>Rp{paymentData.totalAmount}</p>
                  </div>

                  <div
                    className='pt-4 text-center border-t pt-4 min-w-full'
                    onClick={() => setIsPaymentStepOpen(true)}
                  >
                    <p className='font-medium text-color-secondary '>Lihat Cara Pembayaran</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                {" "}
                <CardContent className='space-y-6 py-6'>
                  <p className='text-lg text-gray-600'>Silakan lakukan pembayaran segera agar proses sewa dalam dilakukan</p>
                  <Button
                    onClick={handleCheckStatus}
                    className='bg-custom-gradient-tr text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors'
                    disabled={isLoading}
                  >
                    {isLoading ? "Memproses..." : "Cek Status Pembayaran"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default TopupConfirmationPage
