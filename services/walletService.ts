import axios from "axios"
import { walletBaseUrl } from "@/types/globalVar"

export const fetchWalletBalance = async (shopId: string) => {
  try {
    const response = await axios.get(`${walletBaseUrl}/amount?id=${shopId}&role=shop`)
    return response.data.output_schema.balance
  } catch (error) {
    console.error("Error fetching wallet balance:", error)
    throw error
  }
}

export const fetchWalletHistory = async (shopId: string) => {
  try {
    const response = await axios.get(`${walletBaseUrl}/history?id=${shopId}&role=shop`)
    return response.data.output_schema.wallet_history
  } catch (error) {
    console.error("Error fetching wallet history:", error)
    throw error
  }
}
