"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileSidebarLayout from "../ProfileSidebar"
import { FaPlus } from "react-icons/fa6"
import axios from "axios"
import { walletBaseUrl } from "@/types/globalVar"

type WalletAmountResponse = {
  balance: number
}

type HistoryReport = {
  id: string
  description: string
  tanggal_transaksi: string
  amount: number
  waktu_transaksi: string
  debit: boolean
}

type WalletReportResponse = {
  wallet_history: HistoryReport[]
}

const WalletBody = () => {
  return (
    <div className='flex flex-col md:flex-row w-full m-1 justify-self-center md:p-0 md:px-6 md:pt-12 max-w-[1400px] max-h-auto space-x-0 md:space-x-8 bg-color-layout'>
      <ProfileSidebarLayout />
      <div className='w-full p-2 md:p-0 max-h-auto'>
        <DefaultLayout />
      </div>
    </div>
  )
}

export default WalletBody

function DefaultLayout() {
  const router = useRouter()
  const [walletReport, setWalletReport] = useState<WalletReportResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [walletAmount, setWalletAmount] = useState<WalletAmountResponse | null>(null)
  const customerId = localStorage.getItem("customerId")

  useEffect(() => {
    if (!customerId) {
      setError("User ID tidak ditemukan di localStorage.")
      setLoading(false)
      return
    }

    axios
      .get(`${walletBaseUrl}/amount?customerId=${customerId}`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setWalletAmount(res.data.output_schema)
          console.log("AMOUNT", res.data.output_schema)
        } else {
          setError("Gagal fetch customer balance.")
        }
      })
      .catch((err) => {
        console.error(err)
        setError("Terjadi kesalahan saat fetching.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // get wallet report
  useEffect(() => {
    axios
      .get(`${walletBaseUrl}/history?id=${customerId}&role=customer`)
      .then((res) => {
        if (res.data.error_schema?.error_code === "PS-00-000") {
          setWalletReport(res.data.output_schema)
          console.log("HISTORY", res.data.output_schema)
        } else {
          setError("Gagal fetch customer wallet report.")
        }
      })
      .catch((err) => {
        console.error(err)
        setError("Terjadi kesalahan saat fetching.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
  if (error) return <div className='min-h-screen flex items-center justify-center text-red-500'>{error}</div>
  if (!walletAmount) return <div className='min-h-screen flex items-center justify-center'>No data available</div>

  return (
    <main className='w-full py-8 px-4 md:px-6'>
      <div className='flex flex-col gap-8 w-full h-full'>
        <div className='space-y-2 w-full'>
          <Card className='w-full'>
            <CardHeader className='items-center justify-between'>
              <CardTitle className='text-xl font-bold text-color-primary'>Saldo Anda</CardTitle>
              <Button
                onClick={() => router.push("/wallet/topup")}
                className='w-28 bg-custom-gradient-tr '
              >
                <div className='flex justify-center items-center gap-4'>
                  <FaPlus />
                  <p>Top Up</p>
                </div>
              </Button>
            </CardHeader>

            <CardContent>
              <p className='text-3xl font-bold text-color-secondary'>Rp {walletAmount?.balance.toLocaleString("id-ID")}</p>
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
                  {walletReport?.wallet_history.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{transaction.description}</span>
                          <span className='text-sm text-gray-500'>
                            {transaction.tanggal_transaksi} - {transaction.waktu_transaksi}{" "}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${transaction.debit ? "text-color-secondary" : "text-red-700"}`}>
                        {transaction.debit ? "+" : "-"} Rp {transaction.amount.toLocaleString("id-ID")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
