"use client";

import { Card } from "@/components/ui/card";
import FilterSection from "../filter/Section";
import { Button } from "@/components/ui/button";
import TextedCheckbox from "../TextedCheckbox";
import Image from "next/image";
import Star from "@/public/star.svg";

const ShopProductFilter = () => {
  return (
    <Card className="flex flex-col mb-8 px-5 py-5 space-y-6 border-none max-h-[700px] max-w-[280px] w-full">
      <FilterSection Header="Durasi Sewa">
        <Button className="w-auto max-w-[57px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200">
          Harian
        </Button>
        <Button className="w-auto max-w-[76px] px-2 text-[12px] font-light text-white bg-color-primaryDark hover:bg-blue-900">
          Mingguan
        </Button>
        <Button className="w-auto max-w-[66px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200">
          Bulanan
        </Button>
      </FilterSection>

      <FilterSection Header="Harga">
        <form className="max-w-[280px] w-auto">
          <div className="relative h-[40px]">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
              <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                Rp
              </p>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                  placeholder:text-color-primary text-[12px] rounded-lg 
                  focus:ring-1 focus:ring-color-primaryDark  focus:outline-none
                  focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
              placeholder="Harga Minimum"
            />
          </div>
        </form>
        <form className="max-w-[280px] w-auto">
          <div className="relative h-[40px]">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
              <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                Rp
              </p>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                  placeholder:text-color-primary text-[12px] rounded-lg 
                  focus:ring-1 focus:ring-color-primaryDark  focus:outline-none
                  focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
              placeholder="Harga Maksimum"
            />
          </div>
        </form>
      </FilterSection>
      <FilterSection Header="Rent to Buy">
        <TextedCheckbox>Ya</TextedCheckbox>
        <TextedCheckbox>Tidak</TextedCheckbox>
      </FilterSection>
      <FilterSection Header="Rating">
        {[5, 4, 3, 2, 1].map((rating) => (
          <TextedCheckbox key={rating}>
            <div className="flex space-x-3 items-center">
              <Image width={14} height={12} src={Star} alt={`Star ${rating}`} />
              <p className="text-[12px] text-color-primary">{rating}</p>
            </div>
          </TextedCheckbox>
        ))}
      </FilterSection>
    </Card>
  );
};

export default ShopProductFilter;
