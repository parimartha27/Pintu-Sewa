"use client"

import Image from "next/image";
import Product from "@/public/productTest.jpeg";
import optionDots from "@/public/optionDots.svg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ChatHeader = () => {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  return (
    <div className="flex w-full px-4 py-2 justify-between border-b-[1px] border-[#D9D9D9] border-opacity-70">
      <div className="w-full flex">
        <Image className="w-12 h-12 rounded-full" src={Product} alt="product" />
        <div className="flex flex-col ml-4">
          <h3 className="text-base text-[#011627] font-semibold">Sewa Buku</h3>
          <h4 className="text-sm text-color-grayPrimary">
            Dilihat 5 menit lalu
          </h4>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        {/* Button (Dots Icon) */}
        <div className="flex flex-col justify-center py-3 px-5">
          <Image
            className="w-5 h-5 rounded-full hover:opacity-55 cursor-pointer"
            src={optionDots}
            alt="optionDots"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Popup Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                <Link href="/shop/id">Kunjungi Toko</Link>
              </li>
              <li className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                <Link href="/report">Laporkan</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
