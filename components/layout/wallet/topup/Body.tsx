"use client"

import { Card, CardTitle, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileSidebarLayout from "../../ProfileSidebar"
import axios from "axios"
import { walletBaseUrl } from "@/types/globalVar"
import LabelledInput from "@/components/fragments/editProfile/LabelledInput"
import BCA from "@/public/BCA.svg"
import BRI from "@/public/BRI.svg"
import BNI from "@/public/BNI.svg"
import Money from "@/public/money.svg"
import MetodePembayaranFragments from "@/components/fragments/checkout/MetodePembayaran"
import Image from "next/image"

const TopupBody = () => {
  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
      <ProfileSidebarLayout />
      <div className='w-full p-2 md:p-0 max-h-auto'>
        <TopupInput />
        <MetodeTopup />
      </div>
    </div>
  )
}

export default TopupBody

function TopupInput() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const customerId = localStorage.getItem("customerId")

  return (
    <main className='w-full py-8'>
      <div className='flex flex-col gap-8 w-full h-full'>
        <div className='space-y-2 w-full'>
          <Card className='w-full'>
            <CardHeader className='items-center justify-between  px-4 md:px-6'>
              <CardTitle className='text-md w-full font-semibold text-color-primary pb-6 border-b-[1px] border-b-[#D9D9D9]'>Topup Saldo Wallet</CardTitle>
            </CardHeader>

            <CardContent>
              <div className='flex flex-col w-full'>
                <form
                  //   onSubmit={handleSubmit}
                  className='flex flex-col space-y-5'
                >
                  <LabelledInput
                    label='Nominal'
                    htmlFor='nominal'
                    id='nominal'
                    type='text'
                    maxLength={15}
                    value={0}
                    // onChange={(e) => setUsername(e.target.value)}
                  />
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

function MetodeTopup() {
  return (
    <Card className='px-2 md:px-6 mb-[224px]'>
      <CardHeader className='flex flex-col items-center md:flex-row md:justify-between px-0'>
        <h2 className='text-md font-semibold text-color-primary'>Metode Topup</h2>
        <h3 className='text-sm font-medium text-color-secondary hover:opacity-70 hover:cursor-pointer'>Lihat Semua</h3>
      </CardHeader>
      <CardContent className='flex flex-col md:flex-row md:space-x-12 lg:space-x-[147px] p-0 pb-7 pt-[18px] md:pt-0 border-t-[1px] border-t-[#D9D9D9]'>
        <div className='flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3'>
          <MetodePembayaranFragments
            nama='BCA Virtual Account'
            gambar={BCA}
          />
          <MetodePembayaranFragments
            nama='BRI Virtual Account'
            gambar={BRI}
          />
          <MetodePembayaranFragments
            nama='BNI Virtual Account'
            gambar={BNI}
          />
        </div>

        <div className='hidden md:flex flex-col space-y-[18px] lg:space-y-0 w-full lg:w-1/3 lg:ml-[147px]'>
          <MetodePembayaranFragments
            nama='BCA Virtual Account'
            gambar={BCA}
          />
          <MetodePembayaranFragments
            nama='BRI Virtual Account'
            gambar={BRI}
          />
          <MetodePembayaranFragments
            nama='BNI Virtual Account'
            gambar={BNI}
          />
        </div>
      </CardContent>
      <CardFooter className='p-0 pt-[18px] pb-7 border-t-[1px] border-t-[#D9D9D9]'>
        <Button className='w-full max-w-[200px] xl:h-[48px] rounded-xl hover:opacity-80 bg-custom-gradient-tr'>
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
