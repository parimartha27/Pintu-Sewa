"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import Location from "@/public/location.svg"
import Chat from "@/public/chat.svg"
import { Button } from "@/components/ui/button"
import Star from "@/public/star.svg"
import { useRouter } from "next/navigation"
import { ShopHeaderProps } from "@/types/shopDetail"
import { chatBaseUrl } from "@/types/globalVar"
import axios from "axios"
import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/auth/useAuth"

const ShopHeader = ({ data }: { data: ShopHeaderProps }) => {
  const { customerId } = useAuth()
  const [shopId, setShopId] = useState<string | null>("")
  const router = useRouter()

  const storeImageDefault = "https://res.cloudinary.com/dtizgexle/image/upload/v1749995104/logoTOko_fshgim.jpg"

  console.log(data)

  const createRoomChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget
    e.preventDefault()

    setShopId(target.getAttribute("data-shopid"))

    try {
      const response = await axios.post(`${chatBaseUrl}/create-roomchat?customerId=${customerId}&shopId=${shopId}`)
      router.push("/chat")
    } catch (err: any) {
      if (err.response.data.error_schema.error_code == "PS-10-001") {
        router.push("/chat")
      } else {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    setShopId(data.id)
  }, [])

  return (
    <Card className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 w-full items-center lg:justify-between py-4 px-4 lg:py-6 lg:px-8 border-none shadow-md'>
      <div className='flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 w-full sm:w-auto'>
        <Image
          className='w-16 h-16 sm:w-[100px] sm:h-[100px] self-center rounded-full object-cover'
          width={100}
          height={100}
          src={data.image ?? storeImageDefault}
          alt='guest'
        />
        <div className='flex flex-col items-center sm:items-start'>
          <h2 className='text-xl sm:text-2xl font-semibold text-color-primary mb-1 text-center sm:text-left'>{data.name || "No Name"}</h2>
          <div className='flex items-center space-x-1 mb-2'>
            <Image
              className='w-3 h-3'
              src={Location}
              alt='location'
            />
            <h3 className='text-xs sm:text-sm text-color-primary'>{data.province || "ALASKA"}</h3>
          </div>
          <Button
            data-shopid={data.id}
            onClick={createRoomChat}
            className='w-full max-w-[200px] sm:w-[200px] h-8 py-2 px-1 bg-transparent text-color-primaryDark border-[1px] text-sm sm:text-[16px] border-color-primaryDark hover:bg-slate-200'
          >
            <Image
              className='w-5 h-5 sm:w-6 sm:h-6'
              src={Chat}
              alt='chat'
            />
            <h3>Chat Penyedia Jasa</h3>
          </Button>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row sm:space-x-7 space-y-4 sm:space-y-0 w-full sm:w-auto'>
        <div className='flex flex-col items-center space-y-1'>
          <div className='flex items-center space-x-1'>
            <Image
              className='w-4 h-4 sm:w-5 sm:h-5'
              src={Star}
              alt='star'
            />
            <h3 className='text-lg sm:text-xl text-color-primary font-semibold'>{data.rating || "Belum Ada Penilaian"}</h3>
          </div>
          <h3 className='text-xs sm:text-sm text-color-primary text-center'>Rating dan Ulasan</h3>
        </div>

        <div className='sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block'></div>

        {/* <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-1">
            <h3 className="text-lg sm:text-xl text-color-primary font-semibold">
              {}
            </h3>
          </div>
          <h3 className="text-xs sm:text-sm text-color-primary text-center">
            Pesanan Diproses
          </h3>
        </div> */}

        {/* <div className="sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block"></div> */}

        <div className='flex flex-col items-center space-y-1'>
          <div className='flex items-center space-x-1'>
            <h3 className='text-lg sm:text-xl text-color-primary font-semibold'>{data.work_hours || "08:00-17:00"}</h3>
          </div>
          <h3 className='text-xs sm:text-sm text-color-primary text-center'>Jam Operasional Toko</h3>
        </div>
      </div>
    </Card>
  )
}

export default ShopHeader
