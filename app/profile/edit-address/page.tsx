"use client"

import { Suspense } from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import EditAddressBody from "@/components/layout/profile/Body"

const EditAddressPage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className='flex justify-center items-center min-h-screen'>Loading...</div>}>
        <EditAddressBody />
      </Suspense>
      <Footer />
    </>
  )
}

export default EditAddressPage
