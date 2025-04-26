"use client"

import React from "react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import TopupBody from "@/components/layout/wallet/topup/Body"

const TopupPage = () => {
  return (
    <>
      <Navbar />
      <TopupBody />
      <Footer />
    </>
  )
}

export default TopupPage
