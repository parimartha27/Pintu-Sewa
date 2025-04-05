"use client"

import Image from "next/image";
import History from "@/public/history.svg";
import Search from "@/public/search.svg";
import SearchKosong from "@/public/0.svg"
import { useRouter } from "next/navigation";

interface SuggestionProps {
  type: string;
  title: string;
  image?: string;
}

const Suggestion = ({ type, title, image }: SuggestionProps) => {
    const router = useRouter();
  function imageDecider(type: string) {
    if (type === "search") {
      return Search;
    } else if (type === "history") {
      return History;
    } else if(type === "shop") {
      return image;
    }
  }

  function linkDecider (type: string) {
    if(type === "search" || type === "history") {
      return "/product/id"
    }else if(type === "shop"){
        return "/shop/id"
    }
  }

  return (
    <div onClick={() => router.push(linkDecider(type) || "/")} className="flex items-center px-6 py-4 space-x-3 hover:bg-gray-100 cursor-pointer">
      <Image
        src={imageDecider(type || "") || SearchKosong}
        className="w-[20px] h-[20px] mr-2 rounded-full object-cover"
        alt="history"
      />
      <span className="text-sm text-color-grayPrimary font-jakartaSans">
        {title}
      </span>
    </div>
  );
};

export default Suggestion;
