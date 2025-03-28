"use client";

import { Button } from "@/components/ui/button";
import Star from "@/public/star.svg";
import TextedCheckbox from "../TextedCheckbox";
import FilterSection from "./Section";
import Image from "next/image";
import { useState } from "react";

const FilterBody = () => {
  const categories = [
    { name: "Mobil" },
    { name: "Pakaian Pria" },
    { name: "Alat Tukang" },
    { name: "Board Game" },
    { name: "Elektronik" },
    { name: "Motor" },
    { name: "Alat Kesehatan" },
    { name: "Peralatan Sekolah" },
    { name: "Komputer" },
    { name: "Akun Subskripsi" },
    { name: "Peralatan Bayi" },
    { name: "Furniture" },
    { name: "Alat Olahraga" },
    { name: "Gadget" },
    { name: "Peralatan Rumah" },
    { name: "Pakaian Wanita" },
  ];

  const locations = ["Jabodetabek", "Jawa Barat", "Bali", "Bandung"];

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  return (
    <>
      <div className="flex flex-col mb-4 shadow-sm p-2">
        <h2 className="mb-3 text-[16px] font-medium pl-2">Kategori</h2>
        <div className="flex flex-col w-full">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category.name)}
              className={`bg-white py-1 pl-2 text-[14px] text-start hover:bg-color-third 
                ${
                  selectedCategory === category.name
                    ? "text-color-primaryDark font-bold scale-y-105"
                    : "text-color-primary font-normal"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className=" flex-col pl-4 space-y-4">
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
        <FilterSection Header="Lokasi">
          {locations.map((location, index) => (
            <TextedCheckbox key={index}>{location}</TextedCheckbox>
          ))}
          <button className="text-start text-[12px] text-color-primaryDark hover:text-blue-900">
            Lihat Selengkapnya
          </button>
        </FilterSection>
        <FilterSection Header="Harga">
          <form className="max-w-[220px] w-auto">
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
          <form className="max-w-[220px] w-auto">
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
                <Image
                  width={14}
                  height={12}
                  src={Star}
                  alt={`Star ${rating}`}
                />
                <p className="text-[12px] text-color-primary">{rating}</p>
              </div>
            </TextedCheckbox>
          ))}
        </FilterSection>
        <FilterSection Header="Durasi Pengiriman">
          <TextedCheckbox>1 Hari</TextedCheckbox>
          <TextedCheckbox>2 Hari</TextedCheckbox>
          <TextedCheckbox>3 Hari</TextedCheckbox>
          <TextedCheckbox>Instant</TextedCheckbox>
        </FilterSection>
      </div>
    </>
  );
};

export default FilterBody;
