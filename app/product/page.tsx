"use client"

import { Suspense } from "react"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import ProductBody from "@/components/layout/product/Body"
import Loading from "@/components/fragments/Loading"

const ProductPage = () => {
  return (
    <>
      <Navbar type='product' />
      <Suspense fallback={<Loading />}>
        <ProductBody />
      </Suspense>
      <Footer />
    </>
  )
}

export default ProductPage
