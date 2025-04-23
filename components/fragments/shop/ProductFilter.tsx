"use client";

import { Card } from "@/components/ui/card";
import FilterSection from "../filter/Section";
import { Button } from "@/components/ui/button";
import TextedCheckbox from "../TextedCheckbox";
import Image from "next/image";
import Star from "@/public/star.svg";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";

const ShopProductFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full p-4 h-14 w-14 shadow-lg bg-color-primaryDark hover:bg-blue-900 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <FiX className="h-6 w-6 text-white" />
          ) : (
            <FiFilter className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed lg:static z-40 top-[86px] left-0 h-full w-[280px] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <Card className="flex flex-col h-full px-5 py-8 lg:py-5 space-y-6 border-none overflow-y-auto bg-white lg:max-h-[calc(100vh-120px)]">
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
            <div className="space-y-3">
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <span className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 h-[90%] flex items-center">
                    Rp
                  </span>
                </div>
                <input
                  type="number"
                  className="w-full pl-16 pr-3 h-full text-[12px] border border-color-primaryDark rounded-lg placeholder:text-color-primary focus:ring-1 focus:ring-color-primaryDark"
                  placeholder="Harga Minimum"
                />
              </div>
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <span className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 h-[90%] flex items-center">
                    Rp
                  </span>
                </div>
                <input
                  type="number"
                  className="w-full pl-16 pr-3 h-full text-[12px] border border-color-primaryDark rounded-lg placeholder:text-color-primary focus:ring-1 focus:ring-color-primaryDark"
                  placeholder="Harga Maksimum"
                />
              </div>
            </div>
          </FilterSection>

          <FilterSection Header="Rent to Buy">
            <TextedCheckbox>Ya</TextedCheckbox>
            <TextedCheckbox>Tidak</TextedCheckbox>
          </FilterSection>

          <FilterSection Header="Rating">
            {[5, 4, 3, 2, 1].map((rating) => (
              <TextedCheckbox key={rating}>
                <div className="flex items-center gap-2">
                  <Image
                    width={14}
                    height={12}
                    src={Star}
                    alt={`Bintang ${rating}`}
                    className="inline-block"
                  />
                  <span className="text-[12px] text-color-primary">{rating}</span>
                </div>
              </TextedCheckbox>
            ))}
          </FilterSection>
        </Card>
      </div>
    </>
  );
};

export default ShopProductFilter;