import axios from "axios"
import { ProductCardProps } from "@/types/productCard"
import { ErrorSchema } from "@/types/errorSchema"
import { productBaseUrl } from "@/types/globalVar"

export interface ResponseSchema {
  error_schema: ErrorSchema
  output_schema: ProductCardProps[]
}

export async function fetchMostRentedProducts(): Promise<ResponseSchema> {
  try {
    const response = await axios.get(`${productBaseUrl}/most-rented`)
    return response.data
  } catch (error) {
    console.error("Error fetching most rented products:", error)
    throw error
  }
}

export async function fetchNearCustomerProducts(customerId: string): Promise<ResponseSchema> {
  try {
    const response = await axios.get(`
      ${productBaseUrl}/near-customer?customerId=${customerId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function fetchRecommendedProducts(): Promise<ResponseSchema> {
  try {
    const response = await axios.get(`${productBaseUrl}/recommended`)
    return response.data
  } catch (error) {
    throw error
  }
}
