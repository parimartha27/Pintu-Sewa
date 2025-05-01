"use client"

import ProductList from "../ProductList"
import Category from "./Category"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { ErrorSchema } from "@/types/errorSchema"
import { productBaseUrl } from "@/types/globalVar"
import { ProductCardProps } from "@/types/productCard"
import NoProduct from "@/components/fragments/NoProduct"

interface ResponseSchema {
  error_schema: ErrorSchema
  output_schema: ProductCardProps[]
}

const fetchMostRentedProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${productBaseUrl}/most-rented`)
    return response.data
  } catch (error) {
    console.error("Error fetching most rented products:", error)
    throw error
  }
}

const fetchNearCustomerProducts = async (customerId: string): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${productBaseUrl}/near-customer?customerId=${customerId}`)
    return response.data
  } catch (error) {
    console.error("Error fetching near customer products:", error)
    throw error
  }
}

const fetchRecommendedProducts = async (): Promise<ResponseSchema> => {
  try {
    const response = await axios.get(`${productBaseUrl}/recommended`)
    return response.data
  } catch (error) {
    console.error("Error fetching near customer products:", error)
    throw error
  }
}

const DashboardBody = () => {
  const { data: session } = useSession()

  const [mostRentedProducts, setMostRentedProducts] = useState<ProductCardProps[]>([])
  const [nearCustomerProducts, setNearCustomerProducts] = useState<ProductCardProps[]>([])
  const [recommendedProducts, setRecommendedProducts] = useState<ProductCardProps[]>([])
  const [loading, setLoading] = useState(true)
  const [recommendedProductsLoading, setRecommendedProductsLoading] = useState(true)
  const [nearCustomerProductsLoading, setNearCustomerProductsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  // First, detect if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Then, only access localStorage when on the client
  useEffect(() => {
    if (isClient) {
      const storedCustomerId = localStorage.getItem("customerId")
      const storedToken = localStorage.getItem("token")

      setCustomerId(storedCustomerId)
      setToken(storedToken)
    }
  }, [isClient])

  useEffect(() => {
    if (!customerId || !token) return

    const fetchData = async () => {
      setError("")
      try {
        const mostRented = await fetchMostRentedProducts()
        if (mostRented.error_schema.error_message === "SUCCESS") {
          setMostRentedProducts(mostRented.output_schema)
        }
        setLoading(false)

        const recommended = await fetchRecommendedProducts()
        if (recommended.error_schema.error_message === "SUCCESS") {
          setRecommendedProducts(recommended.output_schema)
        }
        setRecommendedProductsLoading(false)

<<<<<<< HEAD
        if (customerId != null) {
          const nearCustomer = await fetchNearCustomerProducts(
            customerId || ""
          );
          console.log("near customer: ", nearCustomer);
          if (nearCustomer.error_schema.error_message === "SUCCESS") {
            setNearCustomerProducts(nearCustomer.output_schema);
          }
=======
        const nearCustomer = await fetchNearCustomerProducts(customerId || "")
        if (nearCustomer.error_schema.error_message === "SUCCESS") {
          setNearCustomerProducts(nearCustomer.output_schema)
>>>>>>> 52f50cc046619f55246271243b9fdfbf71fc2456
        }

        setTimeout(() => {
          setNearCustomerProductsLoading(false)
        }, 4000)
      } catch (err) {
        setError("Failed to fetch data: " + err)
        setLoading(false)
        setRecommendedProductsLoading(false)
        setNearCustomerProductsLoading(false)
      }
    }

    fetchData()
  }, [customerId, token])

  // Same issue in the render method - check for client side before accessing localStorage
  const isLoggedIn = isClient ? localStorage.getItem("token") || session : session

  return (
    <div className='flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto bg-color-layout pb-12 md:pb-[273px]'>
      <Category />
      <div>
        <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 mb-4'>Banyak Orang Menyewa Ini</h4>

        {error && <div>{error}</div>}
        {loading ? (
          <ProductList
            products={[]}
            loading={true}
            numberCard={10}
          />
        ) : mostRentedProducts && mostRentedProducts.length > 0 ? (
          <ProductList
            products={mostRentedProducts}
            loading={false}
            numberCard={10}
          />
        ) : (
          <NoProduct />
        )}
      </div>

      <div className='mt-5 md:mt-20 lg:mt-32'>
        {isLoggedIn ? (
          <>
            <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4'>Dekat Lokasi Kamu</h4>
            {error && <div>{error}</div>}
            {nearCustomerProductsLoading ? (
              <ProductList
                products={[]}
                loading={true}
                numberCard={10}
              />
            ) : nearCustomerProducts && nearCustomerProducts.length > 0 ? (
              <ProductList
                products={nearCustomerProducts}
                loading={false}
                numberCard={10}
              />
            ) : (
              <NoProduct />
            )}
          </>
        ) : (
          <>
            <h4 className='font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] md:text-[24px] mt-7 md:mt-0 lg:-mt-4 mb-4'>Rekomendasi Untuk Kamu</h4>
            {error && <div>{error}</div>}
            {recommendedProductsLoading ? (
              <ProductList
                products={[]}
                loading={true}
                numberCard={10}
              />
            ) : recommendedProducts && recommendedProducts.length > 0 ? (
              <ProductList
                products={recommendedProducts}
                loading={false}
                numberCard={10}
              />
            ) : (
              <NoProduct />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardBody
