"use client";
import Link from "next/link";
import Image from "next/image";
import CalendarImage from "@/public/calendar.svg";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const RentForm = () => {

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <div className="flex flex-col mt-[27px] px-3">
      <h2 className="text-[14px] text-color-primary font-medium">
        Formulir Penyewaan
      </h2>
      <div className="flex space-x-2 mt-[27px] items-center">
        <Image src={CalendarImage} alt="calendar" className="w-[11px] h-[12.22px]" />
        <h4 className="text-xs text-color-primary font-medium">Periode Sewa</h4>
      </div>
      <div className="flex mt-[14px] space-x-[6px] items-center">
        <div className="flex flex-col space-y-[6px]">
          <h4 className="text-[10px] font-normal text-color-primary">Mulai</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
         
                className={cn(
                  "w-[132px] justify-start text-left font-normal text-[12px] text-color-primary border-[1px] border-[#73787B] bg-transparent",
                  !startDate && "text-muted-foreground"
                )}
              >
               
                {startDate ? format(startDate, "dd-MM-yyyy") : <span>Tanggal Mulai</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <h4 className="text-color-primary mt-5">-</h4>
        <div className="flex flex-col space-y-[6px]">
          <h4 className="text-[10px] font-normal text-color-primary">Selesai</h4>
          <Popover>
            <PopoverTrigger asChild>
              <Button
         
                className={cn(
                  "w-[132px] justify-start text-left font-normal text-[12px] text-color-primary border-[1px] border-[#73787B] bg-transparent",
                  !endDate && "text-muted-foreground"
                )}
              >
          
                {endDate ? format(endDate, "dd-MM-yyyy") : <span>Tanggal Selesai</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col mt-[14px] space-y-[4px]">
            <div className="flex flex-col space-y-[6px]">
                <h2 className="text-[12px] font-medium text-color-primary">Quantity</h2>
                <div className="flex space-x-[7px] py-[2.5px] items-center border-[1px] border-[#73787B] bg-transparent px-2 w-full max-w-[60px] h-[20px] rounded-sm">
                    <button>-</button>
                    <p>1</p>
                    <button>+</button>
                </div>
            </div>
      </div>
    </div>
  );
};

export default RentForm;
