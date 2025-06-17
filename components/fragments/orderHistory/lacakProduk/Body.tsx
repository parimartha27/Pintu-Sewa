"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, PackageSearch, Check, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/auth/useAuth"
import { transactionDetailBaseUrl } from "@/types/globalVar"
import { usePathname } from "next/navigation"

interface ShippingFlow {
  process_date: string
  status: string
  detail: string
  shipping_man: string
}

interface TrackingInfo {
  shipping_code: string
  shipping_partner: string
  estimated_time: string
  customer_name: string
  shipping_address: string
  shipping_flow: ShippingFlow[]
  return_code: string
}

export default function TrackPackage() {
  const pathname = usePathname()

  const isTransactionHistory = pathname.includes("transaction-history")

  const [refNumber, setRefNumber] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("reference_number") : null)

  const [refNumberSeller, setRefNumberSeller] = useState<string | null>(typeof window !== "undefined" ? localStorage.getItem("seller_refference_number") : null)

  const { customerId } = useAuth()
  const [trackingData, setTrackingData] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<string | null>("Customer")

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const refference_number = isTransactionHistory ? refNumberSeller : refNumber

        console.log("Ref Number : " + refference_number)
        if (!refference_number) {
          throw new Error("Reference number or customer ID not found")
        }
        setRole(isTransactionHistory ? "Seller" : "Customer")

        const response = await axios.get(`${transactionDetailBaseUrl}/shipping/${refference_number}/${role}`)
        console.log(response)
        const result = response.data.output_schema
        setTrackingData(result)
      } catch (err: any) {
        setError(err.message || "Failed to fetch tracking details")
      } finally {
        setLoading(false)
      }
    }

    fetchTrackingDetails()
  }, [])

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg font-medium'>Loading tracking details...</p>
      </div>
    )
  }

  if (error || !trackingData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium text-red-500'>Error: {error || "No tracking data found"}</p>
          <Button
            className='mt-4'
            variant='outline'
            asChild
          >
            <Link href='/order-history'>Back to Orders</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentStatus = trackingData.shipping_flow[trackingData.shipping_flow.length - 1]?.status

  return (
    <div className='flex flex-col md:flex-row w-full justify-self-center p-4 md:p-6 max-w-4xl mx-auto bg-background'>
      <div className='w-full'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Lacak Barang</h1>
          <Link
            href='/order-history'
            className='flex items-center text-slate-600 mb-4'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            <span className='text-color-secondary'>Kembali</span>
          </Link>
        </div>

        <Card className='mb-6'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-semibold border-b border-color-[#D9D9D9] w-full pb-4 text-color-primary'>Info Pengiriman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-4 py-4'>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Opsi Pengiriman</h3>
                <p className='font-semibold text-color-primary text-base'>{trackingData.shipping_partner}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Estimasi Tiba</h3>
                <p className='font-semibold text-color-primary text-base'>{trackingData.estimated_time}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Nomor Resi</h3>
                <p className='font-semibold text-color-primary text-base'>{trackingData.shipping_code || "Barang masih diproses"}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Nomor Resi Pengembalian</h3>
                <p className='font-semibold text-color-primary text-base'>{trackingData.return_code || "Dalam periode sewa"}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Detail Penerima</h3>
                <div>
                  <p className='font-semibold text-color-primary text-base text-right'>{trackingData.customer_name}</p>
                  <p className='text-sm text-color-grayPrimary whitespace-pre-line'>{trackingData.shipping_address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-semibold border-b border-color-[#D9D9D9] w-full pb-4 text-color-primary'>Detail Pengiriman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6 py-4'>
              {trackingData.shipping_flow.map((event, index) => (
                <div
                  key={index}
                  className='relative'
                >
                  {index < trackingData.shipping_flow.length - 1 && <div className='absolute left-4 top-8 w-0.5 h-16 bg-slate-200'></div>}
                  <div className='flex items-start gap-4'>
                    <div className='mt-1'>
                      {index === trackingData.shipping_flow.length - 1 ? (
                        <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center'>
                          <Check className='w-4 h-4 text-green-600' />
                        </div>
                      ) : (
                        <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center'>
                          <Truck className='w-4 h-4 text-color-secondary600' />
                        </div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <div className='flex flex-col md:flex-row md:justify-between mb-1'>
                        <div className='text-sm text-color-grayPrimary'>{event.process_date}</div>
                        <div className='font-medium'>{event.detail}</div>
                      </div>
                      <div className='text-sm text-color-grayPrimary'>Kurir: {event.shipping_man}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className='mt-6'>
          <Alert className='bg-blue-50 border-blue-200'>
            <div className='flex items-center gap-2'>
              <PackageSearch className='h-5 w-5 text-color-secondary' />
              <div className='font-medium text-color-secondary'>Status: {currentStatus}</div>
            </div>
            <AlertDescription className='mt-2 text-color-secondary'>Paket Anda sedang dalam perjalanan dan akan diterima sesuai estimasi.</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
