"use client"

import SellerLayout from "@/components/layout/dashboard-seller/Layout"
import SellerProfileBody from "@/components/layout/dashboard-seller/setting/Body"

const SettingSeller = () => {
  return (
    <SellerLayout>
      <p className='font-semibold text-color-primary text-xl pb-2'>Halaman Edit Profile</p>
      <SellerProfileBody />
    </SellerLayout>
  )
}

export default SettingSeller
