"use client"

import Image from "next/image"
import RegisterImage from "@/public/register.svg"
import Star from "@/public/star.svg"
import Chat from "@/public/chat.svg"
import Truck from "@/public/truck.svg"
import Location from "@/public/location.svg"
import { Button } from "@/components/ui/button"
import { ProductDetailShopProps } from "@/types/shop"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { chatBaseUrl, ekspedisiUrl } from "@/types/globalVar"
import axios from "axios"
import { useAuth } from "@/hooks/auth/useAuth"

const ShopAndLocation = ({ shopDetail }: { shopDetail: ProductDetailShopProps }) => {
  const { customerId } = useAuth()
  const router = useRouter()

  const [shippingPrice, setShippingPrice] = useState<number | null>(null)

  // Create room chat
  const createRoomChat = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${chatBaseUrl}/create-roomchat?customerId=${customerId}&shopId=${shopDetail.id}`)
      router.push("/chat")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.data?.error_schema?.error_code === "PS-10-001") {
        router.push("/chat")
      } else {
        console.log(err)
      }
    }
  }

  // Fetch shipping price
  useEffect(() => {
    const fetchShippingPrice = async () => {
      if (!customerId || !shopDetail.id) return

      try {
        const res = await axios.get(`${ekspedisiUrl}/price/${customerId}/${shopDetail.id}`)
        const price = res.data.output_schema
        setShippingPrice(price)
      } catch (error) {
        console.error("Gagal fetch ongkir:", error)
      }
    }

    fetchShippingPrice()
  }, [customerId, shopDetail.id])

  return (
    <div className='w-full mt-7 flex flex-col px-2'>
      <div className='flex justify-between border-y-[1px] border-[#D9D9D9]'>
        <div className='flex space-x-3 py-[14px]'>
          <Image
            src={shopDetail.image || RegisterImage.src}
            alt='register'
            width={40}
            height={40}
            className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-md'
          />
          <div className='flex flex-col'>
            <h2
              onClick={() => router.push(`/shop/${shopDetail.id}`)}
              className='text-[14px] lg:text-sm text-color-primary font-medium hover:opacity-70 hover:cursor-pointer'
            >
              {shopDetail.name || "Shop Name"}
            </h2>
            <div className='flex space-x-[6px] items-center'>
              <Image
                src={Star}
                alt='star'
                className='w-[12px] h-[11px] lg:w-[15.4px] lg:h-[14px]'
              />
              <h4 className='font-normal text-[10px] lg:text-sm text-color-primary'>{shopDetail.rating}</h4>
              <h4 className='font-normal text-[10px] lg:text-sm text-color-grayPrimary'>review: {shopDetail.total_review} kali</h4>
            </div>
          </div>
        </div>
        <Button
          className='flex max-w-[72px] max-h-[28px] lg:max-h-8 h-full gap-x-1 mt-3 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark'
          onClick={createRoomChat}
        >
          <Image
            src={Chat}
            alt='edit'
            className='mt-1 w-[18px] h-[18px] lg:w-[20px] lg:h-[20px]'
          />
          <h4 className='text-color-primaryDark text-[12px] lg:text-sm lg:font-medium'>Chat</h4>
        </Button>
      </div>

      <div className='flex flex-col pt-3 space-y-2'>
        <h2 className='text-[12px] lg:text-[16px] font-semibold text-color-primary'>Pengiriman</h2>
        <div className='flex space-x-[6px] items-center'>
          <Image
            src={Location}
            alt='location'
            className='w-[14px] h-[10px] lg:w-[16px] lg:h-[16px]'
          />
          <h4 className='text-[10px] lg:text-sm lg:font-medium text-color-primary'>
            Dikirim dari <span className='font-bold'>{shopDetail.regency}</span>
          </h4>
        </div>
        <div className='flex space-x-[6px] items-center'>
          <Image
            src={Truck}
            alt='truck'
            className='w-[14px] h-[10px] lg:w-[16px] lg:h-[16px]'
          />
          <h4 className='text-[10px] lg:text-sm lg:font-medium text-color-primary'>{shippingPrice !== null ? `Ongkir mulai Rp ${shippingPrice.toLocaleString("id-ID")}` : "Menghitung ongkir..."}</h4>
        </div>
      </div>
    </div>
  )
}

export default ShopAndLocation
