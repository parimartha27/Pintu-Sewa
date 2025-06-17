"use client"

import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import ProductBody from "@/components/layout/product/Body"

const ProductPage = () => {
  return (
    <>
      <Navbar type='product' />
      <ProductBody />
      <Footer />
    </>
  )
}

export default ProductPage
