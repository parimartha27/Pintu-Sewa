"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import ProductOrderHistoryCard from "./ProductOrderHistoryCard"
import axios from "axios"
import { useEffect, useState, Suspense } from "react"
import { transactionBaseUrl } from "@/types/globalVar"
import { OrderHistoryProps, OrderHistoryResponseProps } from "@/types/orderHistory"
import ProductOrderHistoryCardSkeleton from "./ProductOrderHistoryCardSkeleton"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/hooks/auth/useAuth"

const OrderCategory = [
  { value: "Semua", label: "Semua" },
  { value: "Belum Dibayar", label: "Belum Dibayar" },
  { value: "Diproses", label: "Diproses" },
  { value: "Dikirim", label: "Dikirim" },
  { value: "Sedang Disewa", label: "Sedang Disewa" },
  { value: "Dibatalkan", label: "Dibatalkan" },
  { value: "Dikembalikan", label: "Dikembalikan" },
  { value: "Selesai", label: "Selesai" },
]

const OrderHistoryContentBodyInner = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const statusParam = searchParams.get("status") || "Semua"
  const search = searchParams.get("search") || ""
  const startDate = searchParams.get("startDate") || ""
  const endDate = searchParams.get("endDate") || ""

  const [loading, setLoading] = useState(true)
  const [orderHistoryData, setOrderHistoryData] = useState<OrderHistoryProps[] | null>(null)
  const [isClient, setIsClient] = useState(false)
   const {customerId} = useAuth();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "Semua") {
      params.set("status", value)
    } else {
      params.delete("status")
    }
    router.push(`?${params.toString()}`)
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (!customerId) return

      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (statusParam && statusParam !== "Semua") params.set("status", statusParam)
        if (search) params.set("search", search)
        if (startDate) params.set("startDate", startDate)
        if (endDate) params.set("endDate", endDate)

        const url = `${transactionBaseUrl}/customer/${customerId}?${params.toString()}`
        const res = await axios.get<OrderHistoryResponseProps>(url)
        setOrderHistoryData(res.data.output_schema || [])
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setOrderHistoryData(null)
      } finally {
        setLoading(false)
      }
    }

    if (customerId) {
      fetchData()
    }
  }, [customerId, statusParam, search, startDate, endDate])

  if (!isClient) {
    return (
      <div className='w-full mt-[35px]'>
        <div className='space-y-3'>
          {[1, 2, 3, 4].map((idx) => (
            <ProductOrderHistoryCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='w-full mt-[35px]'>
      <Tabs
        value={statusParam}
        onValueChange={handleTabChange}
        className='w-full rounded-none'
      >
        <Carousel
          opts={{ dragFree: true, containScroll: "keepSnaps", align: "start" }}
          className='overflow-x-auto scrollbar-hide border-b-[1px] border-[#D9D9D9] border-opacity-50 max-w-[1070px]'
        >
          <CarouselContent>
            {OrderCategory.map((tab, index) => (
              <CarouselItem
                key={index}
                className='basis-auto flex-none'
              >
                <TabsList className='bg-white flex-nowrap whitespace-nowrap'>
                  <TabsTrigger
                    value={tab.value}
                    className='px-[17.5px] xl:text-[16px]'
                  >
                    {tab.label}
                  </TabsTrigger>
                </TabsList>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className='mt-3'>
          {OrderCategory.map((tab, index) => (
            <TabsContent
              key={index}
              value={tab.value}
            >
              <div className='space-y-3'>
                {loading ? (
                  [1, 2, 3, 4].map((idx) => <ProductOrderHistoryCardSkeleton key={idx} />)
                ) : orderHistoryData && orderHistoryData.length > 0 ? (
                  orderHistoryData.map((order, index) => (
                    <ProductOrderHistoryCard
                      key={index}
                      orderHistoryProps={order}
                    />
                  ))
                ) : (
                  <div className='flex items-center justify-center h-[300px]'>
                    <p className='text-2xl font-semibold text-color-secondary'>History Pesanan Tidak Ada</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}

const OrderHistoryContentBody = () => {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrderHistoryContentBodyInner />
    </Suspense>
  )
}

export default OrderHistoryContentBody
