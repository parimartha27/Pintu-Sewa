"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import CalendarIcon from "@/public/calendar.svg"

const OrderHistoryContentHeaderInner = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [startDateLocal, setStartDateLocal] = useState<Date | undefined>()
  const [endDateLocal, setEndDateLocal] = useState<Date | undefined>()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const startDateParam = searchParams.get("startDate")
  const endDateParam = searchParams.get("endDate")

  const [search, setSearch] = useState(searchParams.get("search") ?? "")

  const updateQueryParams = ({ search, startDate, endDate }: { search?: string; startDate?: string; endDate?: string }) => {
    const params = new URLSearchParams(searchParams.toString())

    if (search !== undefined) {
      if (search) params.set("search", search)
      else params.delete("search")
    }

    if (startDate !== undefined) {
      if (startDate) params.set("startDate", startDate)
      else params.delete("startDate")
    }

    if (endDate !== undefined) {
      if (endDate) params.set("endDate", endDate)
      else params.delete("endDate")
    }

    router.push(`?${params.toString()}`)
  }

  const handleApply = () => {
    const start = startDateLocal ? format(startDateLocal, "yyyy-MM-dd") : ""
    const end = endDateLocal ? format(endDateLocal, "yyyy-MM-dd") : ""
    updateQueryParams({ startDate: start, endDate: end })
    setIsPopoverOpen(false)
  }

  const formatLabel = () => {
    if (startDateParam && endDateParam) {
      return `${format(startDateParam, "dd-MM-yyyy")} - ${format(endDateParam, "dd-MM-yyyy")}`
    }
    return "Pilih Tanggal Transaksi"
  }

  return (
    <div className='w-full flex flex-col'>
      <h2 className='text-2xl font-semibold text-color-primary mb-5'>History Pesanan</h2>
      <div className='flex space-x-[14px]'>
        <form
          className='w-full max-w-[800px] h-full rounded-md'
          onSubmit={(e) => {
            e.preventDefault()
            updateQueryParams({ search })
          }}
        >
          <div className='relative h-full'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full h-full py-3 pl-10 pr-4 text-[12px] lg:text-[16px] border-[1px] border-[#D9D9D9] rounded-sm font-jakartaSans text-color-grayPrimary focus:ring-1 focus:ring-color-primaryDark focus:border-color-primaryDark outline-none'
              placeholder='Cari transaksi berdasarkan No. Referensi, Nama Penjual atau Nama Produk'
            />
          </div>
        </form>

        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-auto md:w-[230px] h-[43px] flex justify-center space-x-1 text-left font-normal text-[12px] text-color-grayPrimary border-[1px] border-[#D9D9D9] bg-transparent hover:bg-slate-200",
                !(startDateParam || endDateParam) && "text-muted-foreground"
              )}
              onClick={() => {
                setStartDateLocal(startDateParam ? new Date(startDateParam) : undefined)
                setEndDateLocal(endDateParam ? new Date(endDateParam) : undefined)
              }}
            >
              <Image
                src={CalendarIcon}
                alt='calendar'
                className='w-[18px] h-[20px]'
              />
              <span className='hidden md:block text-[14px]'>{formatLabel()}</span>
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className='w-auto p-4'
            align='center'
          >
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Kalender Mulai */}
              <div className='flex flex-col space-y-2'>
                <h4 className='text-sm font-medium text-color-secondary text-center'>Mulai</h4>
                <Calendar
                  mode='single'
                  selected={startDateLocal}
                  onSelect={(date) => {
                    setStartDateLocal(date)
                    if (date && endDateLocal && date > endDateLocal) {
                      setEndDateLocal(undefined)
                    }
                  }}
                  initialFocus
                />
              </div>

              {/* Kalender Selesai */}
              <div className='flex flex-col space-y-2'>
                <h4 className='text-sm font-medium text-color-secondary text-center'>Selesai</h4>
                <Calendar
                  mode='single'
                  selected={endDateLocal}
                  onSelect={(date) => {
                    if (startDateLocal && date && date >= startDateLocal) {
                      setEndDateLocal(date)
                    }
                  }}
                  disabled={{
                    before: startDateLocal || new Date(),
                    from: startDateLocal ? undefined : new Date(),
                  }}
                  initialFocus
                />
              </div>
            </div>

            <div className='flex justify-end gap-2 mt-4'>
              <Button
                onClick={handleApply}
                disabled={!startDateLocal || !endDateLocal}
                className='bg-color-primaryDark hover:bg-color-secondary hover:opacity-80'
              >
                Terapkan
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

const OrderHistoryContentHeader = () => {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <OrderHistoryContentHeaderInner />
    </Suspense>
  )
}
export default OrderHistoryContentHeader