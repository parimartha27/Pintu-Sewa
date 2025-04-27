"use client";

import { Card } from "@/components/ui/card";
import FilterSection from "../filter/Section";
import { Button } from "@/components/ui/button";
import TextedCheckbox from "../TextedCheckbox";
import Image from "next/image";
import Star from "@/public/star.svg";
import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import useFilter from "@/hooks/filter/useFilter";

const ShopProductFilter = () => {
  const { 
    isCheckboxSelected,
    handleCheckboxFilter,
    handleInputFilter,
    getInputValue,
    updateSearchParam
  } = useFilter();
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(getInputValue("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(getInputValue("maxPrice") || "");

  const rentDuration = getInputValue("rentDurations");

  const isHarianActive =
    rentDuration === "1" ||
    rentDuration === "4" ||
    rentDuration === "5" ||
    rentDuration === "7";
  const isMingguanActive =
    rentDuration === "2" ||
    rentDuration === "4" ||
    rentDuration === "6" ||
    rentDuration === "7";
  const isBulananActive =
    rentDuration === "3" ||
    rentDuration === "5" ||
    rentDuration === "6" ||
    rentDuration === "7";

  const handleRentDurationClick = (type: "harian" | "mingguan" | "bulanan") => {
    let newHarian = isHarianActive;
    let newMingguan = isMingguanActive;
    let newBulanan = isBulananActive;

    if (type === "harian") newHarian = !newHarian;
    if (type === "mingguan") newMingguan = !newMingguan;
    if (type === "bulanan") newBulanan = !newBulanan;

    let newRentDuration = "";

    if (newHarian && !newMingguan && !newBulanan) newRentDuration = "1";
    else if (!newHarian && newMingguan && !newBulanan) newRentDuration = "2";
    else if (!newHarian && !newMingguan && newBulanan) newRentDuration = "3";
    else if (newHarian && newMingguan && !newBulanan) newRentDuration = "4";
    else if (newHarian && !newMingguan && newBulanan) newRentDuration = "5";
    else if (!newHarian && newMingguan && newBulanan) newRentDuration = "6";
    else if (newHarian && newMingguan && newBulanan) newRentDuration = "7";
    else newRentDuration = "";

    updateSearchParam("rentDurations", newRentDuration || null);
  };

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
          <Button
            onClick={() => handleRentDurationClick("harian")}
            className={`w-auto max-w-[57px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isHarianActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Harian
          </Button>
          <Button
            onClick={() => handleRentDurationClick("mingguan")}
            className={`w-auto max-w-[76px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isMingguanActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Mingguan
          </Button>
          <Button
            onClick={() => handleRentDurationClick("bulanan")}
            className={`w-auto max-w-[66px] text-[12px] px-2 text-color-primary bg-transparent outline-none border-[1px] border-color-primary hover:bg-slate-200 ${
              isBulananActive ? "bg-color-third" : "bg-transparent"
            }`}
          >
            Bulanan
          </Button>
          </FilterSection>

          <FilterSection Header="Harga">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInputFilter("minPrice", minPrice);
              }}
              className="max-w-[220px] w-auto"
            >
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                    Rp
                  </p>
                </div>
                <input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  type="text"
                  className="bg-gray-50 border border-color-primaryDark text-color-primaryDark 
                  placeholder:text-color-primary text-[12px] rounded-lg 
                  focus:ring-1 focus:ring-color-primaryDark  focus:outline-none
                  focus:border-color-primaryDark block w-full pl-16 p-2.5 h-full"
                  placeholder="Harga Minimum"
                />
              </div>
            </form>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInputFilter("maxPrice", maxPrice);
              }}
              className="max-w-[220px] w-auto"
            >
              <div className="relative h-[40px]">
                <div className="absolute inset-y-0 start-0 flex items-center pl-3 h-full">
                  <p className="text-[12px] text-color-primary font-medium border-r border-r-[#D9D9D9] px-3 flex items-center h-[90%]">
                    Rp
                  </p>
                </div>
                <input
                  onChange={(e) => setMaxPrice(e.target.value)}
                  value={maxPrice}
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
            <TextedCheckbox
              checked={isCheckboxSelected("isRnbOptions", "true")}
              onCheckedChange={() =>
                handleCheckboxFilter(
                  "isRnbOptions",
                  "true",
                  !isCheckboxSelected("isRnbOptions", "true")
                )
              }
            >
              Ya
            </TextedCheckbox>
            <TextedCheckbox
              checked={isCheckboxSelected("isRnbOptions", "false")}
              onCheckedChange={() =>
                handleCheckboxFilter(
                  "isRnbOptions",
                  "false",
                  !isCheckboxSelected("isRnbOptions", "false")
                )
              }
            >
              Tidak
            </TextedCheckbox>
          </FilterSection>

          <FilterSection Header="Rating">
            {[5, 4, 3, 2, 1].map((rating) => (
              <TextedCheckbox
                key={rating}
                checked={isCheckboxSelected("minRatings", rating.toString())}
                onCheckedChange={() =>
                  handleCheckboxFilter(
                    "minRatings",
                    rating.toString(),
                    !isCheckboxSelected("minRatings", rating.toString())
                  )
                }
              >
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
        </Card>
      </div>
    </>
  );
};

export default ShopProductFilter;
