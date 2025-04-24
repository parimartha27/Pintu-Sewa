"use client"

import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const NavigationBarSeller = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [username, setUsername] = useState("Parimartha Studio")

  return (
    <div className='sticky top-0 z-50 w-full bg-white border-b border-gray-200'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Logo */}
        <div className='flex items-center'>
          <div className='mr-4 flex items-center text-lg font-semibold'>
            <span className='text-navy-900'>PINTÜ</span>
            <span className='text-blue-600'>SEWA</span>
            <span className='ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-md'>Seller</span>
          </div>
        </div>

        {/* Search Field */}
        <div className='hidden md:flex flex-1 items-center justify-center px-6'>
          <div className='relative w-full max-w-md'>
            <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
            <Input
              placeholder='Cari barang pengen disewa'
              className='pl-9 h-10 w-full rounded-md border border-gray-300'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant='default'
            size='sm'
            className='ml-2 bg-navy-900 hover:bg-navy-800'
          >
            Cari
          </Button>
        </div>

        {/* User Profile */}
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <div className='hidden md:block text-right'>
              <p className='text-sm font-medium'>{username}</p>
            </div>
            <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100'>
              <User className='h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarSeller