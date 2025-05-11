"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import ProfileSidebarLayout from "@/components/layout/ProfileSidebar"
import TrackPackage from "@/components/fragments/orderHistory/lacakProduk/Body"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function LacakProdukPage() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-background mb-48'>
        <ProfileSidebarLayout />
        <TrackPackage />
      </div>
      <Footer />
    </>
  )
}
