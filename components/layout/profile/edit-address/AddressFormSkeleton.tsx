"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function AddressFormSkeleton() {
  return (
    <div className="p-6 w-full">
     

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" /> {/* Jalan */}
        <Skeleton className="h-10 w-full" /> {/* Kecamatan */}
        <Skeleton className="h-10 w-full" /> {/* Provinsi */}
        <Skeleton className="h-10 w-full" /> {/* Kode Pos */}
        <Skeleton className="h-10 w-full" /> {/* Kabupaten */}
        <Skeleton className="h-10 w-full" /> {/* Catatan */}
      </div>

     
    </div>
  )
}
