"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Success from "@/public/success.svg"
import { useRouter } from "next/navigation"

const SuccessPaymentModals = () => {
  const router = useRouter()
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4'>
      <Card className='w-full max-w-[400px] sm:max-w-[480px] lg:max-w-[540px] h-auto p-4 shadow-xl rounded-2xl bg-white pt-10'>
        <CardContent className='flex flex-col items-center justify-between h-full gap-4'>
          <h3 className='text-base sm:text-xl lg:text-2xl font-bold text-color-primaryDark text-center'>SELAMAT PEMBAYARAN BERHASIL</h3>
          <Image
            width={198}
            height={198}
            src={Success}
            alt='success'
            className='w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] lg:w-[150px] lg:h-[150px]'
          />
          <p
            // onClick={() => router.push("/dev/end-flow")}
            onClick={() => router.push("/")}
            className='text-sm text-color-primaryDark hover:opacity-70 hover:cursor-pointer'
          >
            Selanjutnya
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPaymentModals
