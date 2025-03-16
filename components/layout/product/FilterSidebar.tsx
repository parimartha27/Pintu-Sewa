"use client"

import { useState } from "react";
import Image from "next/image";
import Filter from "@/public/filter.svg";
import FilterBody from "@/components/fragments/filter/Body";

const FilterSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden pl-0 pr-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-color-third lg:hidden"
      >
        <Image
          className="w-[25px] h-[25px] "
          src={Filter}
          alt="chat"
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Layout */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 bg-white z-50 shadow-xl transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-[24px] font-semibold text-color-primary">
            Filter
          </h2>
        </div>

        <div className="h-[calc(100vh-120px)] overflow-y-auto flex flex-col px-4 pl-4">
          {/* Section 1 */}
          <FilterBody />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
