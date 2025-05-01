"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import TransactionDetail from "@/components/fragments/orderHistory/detailTransaction/DetailTransaction"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

export default function TransactionDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referenceNumber = searchParams.get("ref") || ""

  useEffect(() => {
    if (referenceNumber) {
      localStorage.setItem("reference_number", referenceNumber)
    }
  }, [referenceNumber])

  return (
    <main className='min-h-screen bg-gray-50'>
      <Navbar />
      <TransactionDetail referenceNumber={referenceNumber} />
      <Footer />
    </main>
  )
}
