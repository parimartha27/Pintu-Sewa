
// mockApiService.ts
import { Transaction, WalletTransaction, DashboardStats } from "@/types/mockApi"

// Mock function to simulate fetching dashboard stats
export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    walletBalance: 400000000,
    customerCount: 7,
    transactionCount: 120,
    complaintCount: 5,
    storeRating: 4.7,
    storeStatus: "Active",
  }
}

// Mock function to simulate fetching active transactions
export const fetchActiveTransactions = async (): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  return [
    {
      id: "1",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Belum Dibayar",
      deposit: "-",
    },
    {
      id: "2",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Diproses",
      deposit: "Ditahan",
    },
    {
      id: "3",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Dikirm",
      deposit: "Ditahan",
    },
    {
      id: "4",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Sedang Disewa",
      deposit: "Ditahan",
    },
    {
      id: "5",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Dikembalikan",
      deposit: "Ditahan",
    },
    {
      id: "6",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Dibatalkan",
      deposit: "Ditahan",
    },
    {
      id: "7",
      reference: "PS20230317141010123",
      transactionDate: "22 Apr 2025",
      customer: "Parimartha",
      startDate: "21 Apr 2025",
      endDate: "24 Apr 2025",
      duration: "4 Hari",
      status: "Selesai",
      deposit: "Ditahan",
    },
  ]
}

// Mock function to simulate fetching wallet transactions
export const fetchWalletTransactions = async (): Promise<WalletTransaction[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: "w1",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w2",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
    {
      id: "w3",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w4",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
    {
      id: "w5",
      type: "Topup",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: 900000,
      description: "Topup via Bank Transfer",
    },
    {
      id: "w6",
      type: "Pembayaran Barang X",
      date: "21 April 2025",
      time: "09:41 WIB",
      amount: -900000,
      description: "Pembayaran untuk produk X",
    },
  ]
}
