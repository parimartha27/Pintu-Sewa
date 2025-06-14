"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Edit from "@/public/edit.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface EditProfileProps {
  title: string
  iconName?: string
  children?: React.ReactNode
  link?: string
}

const EditShopProfileForm = ({ title, iconName, children, link }: EditProfileProps) => {
  const router = useRouter()
  return (
    <Card className='w-full  max-h-auto px-3 md:px-6 pb-6 shadow-lg border-none'>
      <CardHeader className='flex flex-col sm:flex-row items-start md:items-center justify-between w-full border-b-[1px] border-b-[#D9D9D9] px-0 pb-4'>
        <h2 className='text-[16px] md:text-[18px] font-semibold text-color-primary'>{title}</h2>
        {iconName && (
          <Button
            onClick={() => router.push(`/dashboard-seller/setting/${link}`)}
            className='flex items-center gap-x-2 bg-transparent hover:bg-slate-200 border-[1px] border-color-primaryDark'
          >
            <Image
              src={Edit}
              alt='edit'
              width={18}
              height={18}
              className='mt-1'
            />
            <h4 className='text-color-primaryDark text-[12px]'>{iconName}</h4>
          </Button>
        )}
      </CardHeader>
      <CardContent className='p-0'>{children}</CardContent>
    </Card>
  )
}

export default EditShopProfileForm
