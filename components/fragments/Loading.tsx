"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className='flex flex-col space-y-3 p-4'>
      <div className='flex space-x-4'>
        <Skeleton className='h-10 w-1/4' />
        <Skeleton className='h-10 w-3/4' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className='flex flex-col space-y-2'
          >
            <Skeleton className='h-[200px] w-full' />
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-4 w-1/2' />
          </div>
        ))}
      </div>
    </div>
  )
}
