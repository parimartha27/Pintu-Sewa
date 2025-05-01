"use client"

import { Suspense } from "react"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import OrderHistoryBody from "@/components/layout/orderHistory/Body"
import Loading from "@/components/fragments/orderHistory/Loading"

const OrderHistoryPage = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <OrderHistoryBody />
      </Suspense>
      <Footer />
    </>
  )
}

export default OrderHistoryPage
