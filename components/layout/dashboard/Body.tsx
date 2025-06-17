"use client"

import ProductList from "../ProductList"
import Category from "./Category"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { ProductCardProps } from "@/types/productCard"
import NoProduct from "@/components/fragments/NoProduct"
import { fetchMostRentedProducts, fetchNearCustomerProducts, fetchRecommendedProducts } from "@/services/productService"
import { useAuth } from "@/hooks/auth/useAuth"

const DashboardBody = () => {

  const [isClient, setIsClient] = useState(false);

  const [mostRentedProducts, setMostRentedProducts] = useState<ProductCardProps[]>([])
  const [nearCustomerProducts, setNearCustomerProducts] = useState<ProductCardProps[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<ProductCardProps[]>([])

  const [mostRentedLoading, setMostRentedLoading] = useState(true)
  const [recommendedLoading, setRecommendedLoading] = useState(true)
  const [nearCustomerLoading, setNearCustomerLoading] = useState(true)
  const [errorRecommended, setErrorRecommended] = useState("")
  const [errorNear, setErrorNear] = useState("")
  const [errorMost, setErrorMost] = useState("")

  const { customerId, token } = useAuth()

  const isLoggedIn = isClient && (customerId && token);

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchMostRented = async () => {
      try {
        const data = await fetchMostRentedProducts()
        if (data.error_schema.error_message === "SUCCESS") {
          setMostRentedProducts(data.output_schema)
        }
      } catch (err) {
        setErrorMost("Gagal memuat produk populer: " + err)
      } finally {
        setMostRentedLoading(false)
      }
    }

    fetchMostRented()
  }, [])

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const data = await fetchRecommendedProducts()
        if (data.error_schema.error_message === "SUCCESS") {
          setRecommendedProducts(data.output_schema)
        }
      } catch (err) {
        setErrorRecommended("Gagal memuat rekomendasi: " + err)
      } finally {
        setRecommendedLoading(false)
      }
    }

    fetchRecommended()
  }, [])

  useEffect(() => {
    if (!token || !customerId) return

    const fetchNearby = async () => {
      try {
        const data = await fetchNearCustomerProducts(customerId)
        if (data.error_schema.error_message === "SUCCESS") {
          setNearCustomerProducts(data.output_schema)
        }
      } catch (err) {
        setErrorNear("Gagal memuat produk terdekat: " + err)
      } finally {
        setNearCustomerLoading(false)
      }
    }

    fetchNearby()
  }, [])

  return (
    <div className='flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto bg-color-layout pb-12 md:pb-[273px]'>
      <Category />

      <div>
        <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 mb-4'>Banyak Orang Menyewa Ini</h4>
        {/* {errorMost && <div className="text-red-500">{errorMost}</div>} */}
        {mostRentedLoading ? (
          <ProductList
            products={[]}
            loading={true}
            numberCard={10}
          />
        ) : mostRentedProducts.length > 0 ? (
          <ProductList
            products={mostRentedProducts}
            loading={false}
            numberCard={10}
          />
        ) : (
          <NoProduct message={"Tidak Ada Produk"} />
        )}
      </div>

      <div className='mt-5 md:mt-20 lg:mt-32'>
        {isLoggedIn ? (
          <>
            <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4'>Dekat Lokasi Kamu</h4>
            {/* {errorNear && <div className="text-red-500">{errorNear}</div>} */}
            {nearCustomerLoading ? (
              <ProductList
                products={[]}
                loading={true}
                numberCard={10}
              />
            ) : nearCustomerProducts.length > 0 ? (
              <ProductList
                products={nearCustomerProducts}
                loading={false}
                numberCard={10}
              />
            ) : (
              <NoProduct message={"Tidak ada produk dekat lokasi kamu"} />
            )}
          </>
        ) : (
          <>
            <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4'>Rekomendasi Untuk Kamu</h4>
            {/* {errorRecommended && (
              <div className="text-red-500">{errorRecommended}</div>
            )} */}
            {recommendedLoading ? (
              <ProductList
                products={[]}
                loading={true}
                numberCard={10}
              />
            ) : recommendedProducts.length > 0 ? (
              <ProductList
                products={recommendedProducts}
                loading={false}
                numberCard={10}
              />
            ) : (
              <NoProduct message={"Tidak ada Produk"} />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardBody
