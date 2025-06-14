import axios from "axios"
import { transactionBaseUrl } from "@/types/globalVar"

export const fetchShopTransactions = async (shopId: string) => {
  try {
    const response = await axios.get(`${transactionBaseUrl}/shop/${shopId}`)
    console.log("Hasil Fetching : ", response.data.output_schema)
    return response.data.output_schema
  } catch (error) {
    console.error("Error fetching shop transactions:", error)
    throw error
  }
}
