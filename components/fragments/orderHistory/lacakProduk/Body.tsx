"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, PackageSearch, Check, Truck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Types for tracking data
interface TrackingEvent {
  timestamp: string
  status: string
  location: string
  courier: string
}

interface TrackingInfo {
  trackingNumber: string
  estimatedDelivery: string
  currentStatus: string
  recipientName: string
  recipientAddress: string
  events: TrackingEvent[]
}

export default function TrackPackage() {
  const [trackingData, setTrackingData] = useState<TrackingInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        setLoading(true)
        // In a real app, you would fetch this data from an API
        // For this example, we'll simulate a response

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        const mockTrackingData: TrackingInfo = {
          trackingNumber: "JNE12345",
          estimatedDelivery: "10-12 Mei 2025",
          currentStatus: "Barang Diterima",
          recipientName: "Steven Matthew",
          recipientAddress: "Jalan Surya Kebon Sirih b6, Kecamatan Denpasar Barat, Kabupaten Denpasar Barat, Provinsi Bali, 80112",
          events: [
            {
              timestamp: "11 Mei 2025 14:30",
              status: "Pesanan telah diterima",
              location: "Distribution Center",
              courier: "JNE",
            },
            {
              timestamp: "10 Mei 2025 08:15",
              status: "Pesanan transit di DC Cakung",
              location: "Sorting Hub",
              courier: "JNE",
            },
            {
              timestamp: "9 Mei 2025 16:45",
              status: "Pesanan Diambil dari Toko",
              location: "Local Facility",
              courier: "JNE",
            },
          ],
        }

        setTrackingData(mockTrackingData)
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
        <div className='text-center'>
          <p className='text-lg font-medium'>Loading tracking details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium text-red-500'>Error: {error}</p>
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

  if (!trackingData) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <p className='text-lg font-medium'>No tracking data found</p>
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

  return (
    <div className='flex flex-col md:flex-row w-full justify-self-center p-4 md:p-6 max-w-4xl mx-auto bg-background'>
      <div className='w-full'>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold'>Lacak Barang</h1>
          <Link
            href='/order-history'
            className='flex items-center text-slate-600 mb-4'
            color='06468a'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            <span className='text-color-secondary'>Kembali</span>
          </Link>
        </div>

        {/* Basic Tracking Info */}
        <Card className='mb-6'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-semibold border-b border-color-[#D9D9D9] w-full pb-4 text-color-primary'>Info Pengiriman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col space-y-4 py-4'>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Opsi Pengiriman</h3>
                <p className='font-semibold text-color-primary text-base pr-[338px]'>JNE</p>
              </div>

              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Estimasi Tiba</h3>
                <p className='font-semibold text-color-primary text-base pr-[250px]'>{trackingData.estimatedDelivery}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Nomor Resi</h3>
                <p className='font-semibold text-color-primary text-base pr-[290px]'>{trackingData.trackingNumber}</p>
              </div>
              <div className='flex justify-between'>
                <h3 className='text-sm font-medium text-color-grayPrimary'>Detail Penerima</h3>
                <div>
                  <p className='font-semibold text-color-primary text-base'>{trackingData.recipientName}</p>
                  <p className='text-sm text-color-grayPrimary'>
                    Jalan Surya Kebon Sirih b6, <br />
                    Kecamatan Denpasar Barat, Kabupaten Denpasar Barat, <br />
                    Provinsi Bali, 80112
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tracking Timeline */}
        <Card>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl font-semibold border-b border-color-[#D9D9D9] w-full pb-4 text-color-primary'>Detail Pengiriman</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-6 py-4'>
              {trackingData.events.map((event, index) => (
                <div
                  key={index}
                  className='relative'
                >
                  {/* Timeline connector */}
                  {index < trackingData.events.length - 1 && <div className='absolute left-4 top-8 w-0.5 h-16 bg-slate-200'></div>}

                  <div className='flex items-start gap-4'>
                    <div className='mt-1'>
                      {index === 0 ? (
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
                        <div className='text-sm text-color-grayPrimary'>{event.timestamp}</div>
                        <div className='font-medium'>{event.status}</div>
                      </div>
                      <div className='text-sm text-color-grayPrimary'>Kurir: {event.courier}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current status alert */}
        <div className='mt-6'>
          <Alert className='bg-blue-50 border-blue-200'>
            <div className='flex items-center gap-2'>
              <PackageSearch className='h-5 w-5 text-color-secondary' />
              <div className='font-medium text-color-secondary'>Status: {trackingData.currentStatus}</div>
            </div>
            <AlertDescription className='mt-2 text-color-secondary'>Paket Anda sedang dalam perjalanan dan akan diterima sesuai estimasi.</AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
