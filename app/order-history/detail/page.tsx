"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import TransactionDetail from "@/components/fragments/orderHistory/detailTransaction/DetailTransaction"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function TransactionDetailPage() {
  
  return (
    <main className='min-h-screen bg-gray-50'>
      <Navbar />
      <TransactionDetail/>
      <Footer />
    </main>
  )
}
