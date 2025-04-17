"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CalendarIcon from "@/public/calendar.svg";

const OrderHistoryContentHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize dateRange from query params
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: searchParams.get("startDate")
      ? new Date(searchParams.get("startDate")!)
      : undefined,
    to: searchParams.get("endDate")
      ? new Date(searchParams.get("endDate")!)
      : undefined,
  });

  // Search state
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  // Update query parameters dynamically
  const updateQueryParams = ({
    search,
    startDate,
    endDate,
  }: {
    search?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (search !== undefined) {
      if (search) params.set("search", search);
      else params.delete("search");
    }

    if (startDate !== undefined) {
      if (startDate) params.set("startDate", startDate);
      else params.delete("startDate");
    }

    if (endDate !== undefined) {
      if (endDate) params.set("endDate", endDate);
      else params.delete("endDate");
    }

    router.push(`?${params.toString()}`);
  };

  // Handle date range selection
  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    const startDateValue = range?.from ? format(range.from, "yyyy-MM-dd") : "";
    const endDateValue = range?.to ? format(range.to, "yyyy-MM-dd") : "";
    updateQueryParams({ startDate: startDateValue, endDate: endDateValue });
  };

  // Format button label based on selection
  const formatLabel = () => {
    if (dateRange?.from && dateRange?.to) {
      return `${format(dateRange.from, "dd-MM-yyyy")} - ${format(
        dateRange.to,
        "dd-MM-yyyy"
      )}`;
    }
    if (dateRange?.from) {
      return format(dateRange.from, "dd-MM-yyyy");
    }
    return "Pilih Tanggal Transaksi";
  };

  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold text-color-primary mb-5">
        History Pesanan
      </h2>
      <div className="flex space-x-[14px]">
        <form
          className="w-full max-w-[800px] h-full rounded-md"
          onSubmit={(e) => {
            e.preventDefault();
            updateQueryParams({ search });
          }}
        >
          <div className="relative h-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full py-3 pl-10 pr-4 text-[12px] lg:text-[16px] border-[1px] border-[#D9D9D9] rounded-sm font-jakartaSans text-color-grayPrimary focus:ring-1 focus:ring-color-primaryDark focus:border-color-primaryDark outline-none"
              placeholder="Cari transaksi berdasarkan No. Referensi, Nama Penjual atau Nama Produk"
            />
          </div>
        </form>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "w-auto md:w-[230px] h-[43px] flex justify-center space-x-1 text-left font-normal text-[12px] text-color-grayPrimary border-[1px] border-[#D9D9D9] bg-transparent hover:bg-slate-200",
                !(dateRange?.from || dateRange?.to) && "text-muted-foreground"
              )}
            >
              <Image
                src={CalendarIcon}
                alt="calendar"
                className="w-[18px] h-[20px]"
              />
              <span className="hidden md:block text-[14px]">
                {formatLabel()}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <h2 className="text-center mx-auto w-full mt-3 text-color-secondary font-semibold text-wrap max-w-[300px]">Pilih Rentang Tanggal <span className="text-color-primary">(klik 2 kali di tanggal untuk reset tanggal mulai)</span> </h2>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default OrderHistoryContentHeader;
