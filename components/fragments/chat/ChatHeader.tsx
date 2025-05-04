"use client";

import Image from "next/image";
import Product from "@/public/productTest.jpeg";
import optionDots from "@/public/optionDots.svg";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { chatBaseUrl } from "@/types/globalVar";
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation";

interface ChatItem {
  id: string;
  name: string;
  image: string;
  customer_id : string;
  shop_id : string;
}

interface ChatRoomProps {
  detailHeader: ChatItem;
}

const ChatHeader = ({ detailHeader }: ChatRoomProps) => {
  const pathname = usePathname();
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [type,setType] = useState<String>(pathname.startsWith("/dashboard-seller") ? "shop" : "customer");

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

  const deleteFunction = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const response = await axios.delete(
      `${chatBaseUrl}/delete-roomchat?id=${id}`
    )
    window.location.reload;
  };


  return (

    <div className="flex w-full px-4 py-2 justify-between border-b-[1px] border-[#D9D9D9] border-opacity-70">
      <div className="w-full flex">
        <Image
          className="w-12 h-12 rounded-full"
          src={detailHeader.image}
          width={56}
          height={56}
          alt="product"
        />
        <div className="flex items-center ml-4">
          <h3 className="text-base text-[#011627] font-semibold">
            {detailHeader.name}
          </h3>
        </div>
      </div>

      {type==="customer" && (
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
              <li onClick={ () => {router.push(`/shop/${detailHeader.shop_id}`)}} className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                Kunjungi Toko
              </li>
              <li onClick={(e) => deleteFunction(e, detailHeader.id)} className="px-4 py-2 text-color-primaryDark font-medium hover:bg-color-third cursor-pointer">
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default ChatHeader;
