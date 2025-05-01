// types.ts
export interface Transaction {
  id: string
  reference: string
  transactionDate: string
  customer: string
  startDate: string
  endDate: string
  duration: string
  status: string
  deposit: string
}

export interface WalletTransaction {
  id: string
  type: string
  date: string
  time: string
  amount: number
  description: string
}

export interface DashboardStats {
  walletBalance: number
  customerCount: number
  transactionCount: number
  complaintCount: number
  storeRating: number
  storeStatus: string
}
