"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import CalendarIcon from "@/public/calendar.svg";
import Image from "next/image";

const OrderHistoryContentHeader = () => {
      const [transactionDate, setTransactionDate] = useState<Date>();
  return (
    <div className="w-full flex flex-col">
      <h2 className="text-2xl font-semibold text-color-primary mb-5">
        History Pesanan
      </h2>
      <div className="flex space-x-[14px]">
        <form className="w-full max-w-[754px] h-full rounded-md">
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
              className="w-full h-full py-3 pl-10 pr-4 text-[12px] lg:text-[16px] border-[1px] border-[#D9D9D9] rounded-sm font-jakartaSans text-color-grayPrimary focus:ring-1 focus:ring-color-primaryDark focus:border-color-primaryDark outline-none"
              placeholder="Cari transaksi berdasarkan No. Referensi, Nama Penjual atau Nama Produk"
            />
          </div>
        </form>
        <Popover>
            <PopoverTrigger asChild>
              <Button
         
                className={cn(
                  "w-auto md:w-[220px] h-[43px] flex justify-center space-x-1 text-left font-normal text-[12px] text-color-grayPrimary border-[1px] border-[#D9D9D9] bg-transparent hover:bg-slate-200",
                  !transactionDate && "text-muted-foreground"
                )}
              >
                <Image src={CalendarIcon} alt="calendar" className="w-[18px] h-[20px]" />
                {transactionDate ? format(transactionDate, "dd-MM-yyyy") : <span className="hidden md:block text-[14px]">Pilih Tanggal Transaksi</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={transactionDate}
                onSelect={setTransactionDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
      </div>
    </div>
  );
};

export default OrderHistoryContentHeader;
