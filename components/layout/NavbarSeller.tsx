"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import PintuSewaSeller from "@/public/pintuSewaSeler.png"

interface ShopInformation {
  shopName: string | null
  shopImage: string | null
}

const NavigationBarSeller: React.FC = () => {
  const [shopInformation, setShopInformation] = useState<ShopInformation>({
    shopName: null,
    shopImage: null,
  })

  const getLocalStorageItem = (key: string): string | null => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        return localStorage.getItem(key)
      } catch (error) {
        console.error(`Error accessing localStorage for key ${key}:`, error)
        return null
      }
    }
    return null
  }

  useEffect(() => {
    setShopInformation({
      shopName: getLocalStorageItem("shopName"),
      shopImage: getLocalStorageItem("shopImage"),
    })
  }, [])

  // Default fallback values
  const shopName = shopInformation.shopName || "Shop Name"
  const shopImage = shopInformation.shopImage || "/default-shop-image.png"
  return (
    <div className='sticky top-0 z-50 w-full bg-white border-b border-gray-200'>
      <div className='h-[24px] bg-color-primaryDark w-full'></div>
      <div className='flex h-24 items-center justify-between px-4 md:px-10'>
        <div className='flex items-center'>
          <Link href='/dashboard-seller'>
            <Image
              src={PintuSewaSeller}
              alt='siap-sewa'
              width={150}
              height={50}
              className='ml-8 lg:ml-8 md:w-[200px] h-[50px] object-contain'
            />
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='hidden md:block text-right'>
              <p className='text-sm font-medium'>{shopName}</p>
            </div>
            <div className='flex items-center justify-center rounded-full bg-gray-100'>
              {shopImage && shopImage !== "/default-shop-image.png" ? (
                <Image
                  src={shopImage}
                  alt={shopName}
                  width={60}
                  height={60}
                  className='w-[50px] h-[50px] rounded-full object-cover'
                  onError={(e) => {
                    console.error("Failed to load shop image")
                  }}
                />
              ) : (
                <div className='w-[50px] h-[50px] rounded-full bg-gray-300 flex items-center justify-center'>
                  <span className='text-gray-600 text-sm font-medium'>{shopName.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarSeller
