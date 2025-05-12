"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PintuSewaSeller from "@/public/pintuSewaSeler.png"
import { SearchResponseProps } from "@/types/searchResponse"
import SearchIcon from "@/public/search.svg"
import Suggestion from "@/components/fragments/navbar/Suggestion"

const NavigationBarSeller = () => {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResponseProps>()
  const [username, setUsername] = useState("Matthew Store")
  const [suggestionOpen, setSuggestionOpen] = useState(false)

  return (
    <div className='sticky top-0 z-50 w-full bg-white border-b border-gray-200'>
      <div className='h-[24px] bg-color-primaryDark w-full'></div>
      <div className='flex h-24 items-center justify-between px-4 md:px-10'>
        {/* Logo */}
        <div className='flex items-center'>
          <Link href='/dashboard-seller'>
            <Image
              src={PintuSewaSeller}
              alt='siap-sewa'
              width={150}
              height={50}
              className='ml-8 lg:ml-8 md:w-[200px] h-[50px] object-contain'
            />
          </Link>
        </div>

        {/* Search Field
        <div className='flex w-11/12 md:w-4/6 lg:w-7/12 p-1.5 items-center justify-center md:ml-10 lg:ml-0 relative'>
          <form
            className='lg:w-11/12 lg:ml-10 w-full h-12'
            ref={formRef}
            onClick={() => setSuggestionOpen(!suggestionOpen)}
            onSubmit={(e) => {
              e.preventDefault()
              if (searchQuery.trim() !== "") {
                router.push(`/product?name=${encodeURIComponent(searchQuery)}&page=1&size=16`)
              }
            }}
          >
            <div className='relative h-full'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <Image
                  src={SearchIcon}
                  alt='search'
                />
              </div>
              <input
                type='search'
                className='w-full h-full pl-10 pr-4 py-5 text-[12px] lg:text-sm border-2 border-[#D9D9D9] border-opacity-75 rounded-sm font-jakartaSans text-color-primary focus:ring-0 focus:ring-color-secondary focus:border-color-secondary outline-none'
                placeholder='Cari barang pengen disewa'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {suggestionOpen && searchResults && (
                <div className='absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 z-50 max-h-[400px] overflow-y-auto'>
                  {searchResults.output_schema.products.map((product) => (
                    <Suggestion
                      key={product.id}
                      type='search'
                      title={product.name}
                      category={product.category}
                    />
                  ))}

                  {searchResults.output_schema.shops.map((shop) => (
                    <Suggestion
                      key={shop.id}
                      type='shop'
                      title={shop.name}
                      id={shop.id}
                      image={shop.image}
                    />
                  ))}
                </div>
              )}
            </div>
          </form>
          <Button
            onClick={(e) => {
              e.preventDefault()
              if (searchQuery.trim() !== "") {
                router.push(`/product?name=${encodeURIComponent(searchQuery)}&page=1&size=16`)
              }
            }}
            className='hidden lg:block ml-3 w-[100px] bg-color-primaryDark hover:bg-blue-900'
          >
            Cari
          </Button>
        </div> */}

        {/* User Profile */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='hidden md:block text-right'>
              <p className='text-sm font-medium'>{username}</p>
            </div>
            <div className='flex items-center justify-center rounded-full bg-gray-100'>
              <Image
                src='https://res.cloudinary.com/dtizgexle/image/upload/v1746891764/customer_profiles/shm870gafpryv0wtdrku.jpg'
                alt={username}
                width={60}
                height={60}
                className='w-[50px] h-[50px] rounded-full object-fill'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarSeller
