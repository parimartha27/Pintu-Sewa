"use client"
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
