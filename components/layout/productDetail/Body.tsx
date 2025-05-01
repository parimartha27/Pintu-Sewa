"use client"

import ProductDescription from "./ProductDescription"
import RentForm from "./RentForm"
import Review from "./Review"
import ShopAndLocation from "./ShopAndLocation"
import ProductList from "../ProductList"
import { useParams } from "next/navigation"
import { ProductDetailProps, ProductDetailResponse } from "@/types/productDetail"
import { useEffect, useState } from "react"
import axios from "axios"
import { ErrorSchema } from "@/types/errorSchema"
import { ProductCardProps } from "@/types/productCard"
import { ProductDetailShopProps } from "@/types/shop"
import { productBaseUrl, shopProductBaseUrl } from "@/types/globalVar"
import NoProduct from "@/components/fragments/NoProduct"
import ProductDetailSkeleton from "./ProductDetailSkeleton"

interface ProductDitokoProps {
  error_schema: ErrorSchema
  output_schema: ProductCardProps[]
}

interface ShopDetailResProps {
  error_schema: ErrorSchema
  output_schema: ProductDetailShopProps
}

const ProductDetailBody = () => {
  const { id } = useParams()
  const [productDetail, setProductDetail] = useState<ProductDetailProps>()
  const [loading, setLoading] = useState(true)
  const [shopProducts, setShopProducts] = useState<ProductCardProps[]>([])
  const [shopDetail, setShopDetail] = useState<ProductDetailShopProps>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ProductDetailResponse>(`${productBaseUrl}/${id}`)
        setProductDetail(res.data.output_schema)

        const shopDetailRes = await axios.get<ShopDetailResProps>(`${shopProductBaseUrl}/${id}`)
        setShopDetail(shopDetailRes.data.output_schema)

        const res2 = await axios.get<ProductDitokoProps>(`${productBaseUrl}/top?shopId=${shopDetailRes?.data?.output_schema?.id}`)
        setShopProducts(res2.data?.output_schema)

        console.log("Product Detail:", res.data.output_schema)
        console.log("Another Shop Product Detail:", res2.data.output_schema)
      } catch (error) {
        console.error("Failed to fetch product detail:", error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchData()
  }, [id])

  if (loading) {
    return (
      <>
        <ProductDetailSkeleton />
        <div className='min-h-[1400px]'></div>
      </>
    )
  }

  if (!productDetail) {
    return (
      <div className='w-full flex items-center justify-center h-[50vh]'>
        <NoProduct message={"Tidak ada produk"} />
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col px-0 py-0 md:px-6 max-w-[1300px] min-h-screen mx-auto bg-color-layout pb-12 md:pb-[273px]'>
      <div className='flex flex-col md:flex-row'>
        {productDetail && shopDetail && (
          <ProductDescription
            productDetail={productDetail}
            shopDetail={shopDetail}
          />
        )}
        <RentForm productDetail={productDetail} />
      </div>

      <div className='flex flex-col space-y-3 w-full'>
        <div className='lg:hidden'>{shopDetail && <ShopAndLocation shopDetail={shopDetail} />}</div>

        <Review />

        <div className='flex flex-col pl-2 pt-8 xl:pt-[72px]'>
          <h2 className='text-lg md:text-xl xl:text-2xl sm:text-center xl:text-start pl-1 pb-3 font-medium xl:font-semibold text-color-primary'>Barang lainnya di toko ini</h2>
          {shopProducts && shopProducts.length > 0 ? <ProductList products={shopProducts} /> : <NoProduct message={"Tidak ada produk"} />}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailBody
