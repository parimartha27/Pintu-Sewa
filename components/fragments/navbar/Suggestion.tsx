"use client"

import Image from "next/image"
import Search from "@/public/search.svg"
import SearchKosong from "@/public/0.svg"
import { useRouter } from "next/navigation"

interface SuggestionProps {
  type: "search" | "shop"
  title: string
  image?: string
  id?: string
  category?: string
}

const Suggestion = ({ type, title, image, id, category }: SuggestionProps) => {
  const router = useRouter()

  const shopBaseImage = "https://res.cloudinary.com/dtizgexle/image/upload/v1749995104/logoTOko_fshgim.jpg"

  function imageDecider(type: string) {
    if (type === "search") {
      return Search
    } else if (type === "shop") {
      return image != null ? image : shopBaseImage
    }
    return SearchKosong
  }

  function linkDecider(type: string) {
    if (type === "search") {
      const query = new URLSearchParams({
        category: category || "",
        name: title,
        page: "1",
        size: "16",
      }).toString()
      return `/product?${query}`
    } else if (type === "shop" && id) {
      return `/shop/${id}`
    }
    return "/"
  }

  return (
    <div
      onClick={() => router.push(linkDecider(type))}
      className='flex items-center px-6 py-4 space-x-3 hover:bg-gray-100 cursor-pointer'
    >
      <Image
        src={imageDecider(type)}
        className='w-[25px] h-[25px] mr-2 rounded-full object-cover'
        alt='history'
        width={20}
        height={20}
      />
      <span className='text-sm text-color-grayPrimary font-jakartaSans'>{title}</span>
    </div>
  )
}

export default Suggestion
