"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileSidebarLayout from "../ProfileSidebar"
import { FaPlus } from "react-icons/fa6"

// Types for our data
type Transaction = {
  id: string
  type: string
  amount: number
  date: string
  isCredit: boolean
}

type WalletData = {
  balance: number
  transactions: Transaction[]
}

const WalletService = {
  async getWalletData(): Promise<WalletData> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      balance: 300000000,
      transactions: [
        { id: "1", type: "Topup", amount: 900000, date: "21 April 2023 - Q&A1 WB", isCredit: true },
        { id: "2", type: "Pembayaran Barang X", amount: 900000, date: "21 April 2023 - Q&A1 WB", isCredit: false },
        { id: "3", type: "Topup", amount: 900000, date: "21 April 2023 - Q&A1 WB", isCredit: true },
        { id: "4", type: "Pembayaran Barang X", amount: 900000, date: "21 April 2023 - Q&A1 WB", isCredit: false },
      ],
    }
  },
}

const WalletBody = () => {
  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
      <ProfileSidebarLayout />
      <div className='w-full p-2 md:p-0 max-h-auto'>
        <DefaultLayout></DefaultLayout>
      </div>
    </div>
  )
}

export default WalletBody

function DefaultLayout() {
  const router = useRouter()
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await WalletService.getWalletData()
        setWalletData(data)
      } catch (err) {
        setError("Failed to load wallet data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  if (error) return <div className='min-h-screen flex items-center justify-center text-red-500'>{error}</div>
  if (!walletData) return <div className='min-h-screen flex items-center justify-center'>No data available</div>

  return (
    <main className='w-full py-8 px-4 md:px-6'>
      <div className='flex flex-col gap-8 w-full h-full'>
        <div className='space-y-2 w-full'>
          <Card className='w-full'>
            <CardHeader className='items-center justify-between'>
              <CardTitle className='text-xl font-bold text-color-primary'>Saldo Anda</CardTitle>
              <Button
                onClick={() => router.push("/topup")}
                className='w-28 bg-custom-gradient-tr '
              >
                <div className='flex justify-center items-center gap-4'>
                  <FaPlus />
                  <p>Top Up</p>
                </div>
              </Button>
            </CardHeader>

            <CardContent>
              <p className='text-3xl font-bold text-color-secondary'>Rp {walletData.balance.toLocaleString("id-ID")}</p>
            </CardContent>
          </Card>
        </div>
        <div className='lg:col-span-2 w-full'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle className='text-xl font-bold text-color-primary'>Data Transaksi</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walletData.transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{transaction.type}</span>
                          <span className='text-sm text-gray-500'>{transaction.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${transaction.isCredit ? "text-color-secondary" : "text-red-700"}`}>
                        {transaction.isCredit ? "+" : "-"} Rp {transaction.amount.toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Transaction history */}
      </div>
    </main>
  )
}
