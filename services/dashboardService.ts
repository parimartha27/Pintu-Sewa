import axios from "axios"
import { shopBaseUrl, walletBaseUrl } from "@/types/globalVar"

export const fetchShopDashboard = async (shopId: string) => {
  try {
    const response = await axios.get(`${shopBaseUrl}/dashboard/${shopId}`)
    return response.data.output_schema
  } catch (error) {
    throw error
  }
}

export const fetchWalletHistory = async (shopId: string) => {
  try {
    const response = await axios.get(`${walletBaseUrl}/history?id=${shopId}&role=shop`)
    return response.data.output_schema.wallet_history
  } catch (error) {
    throw error
  }
}
