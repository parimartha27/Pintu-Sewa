"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ShopContentSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      {/* Sidebar */}
      <div className="w-full md:max-w-[250px] space-y-6">
        {/* Durasi Sewa */}
        <div className="space-y-3">
          <Skeleton className="w-[120px] h-4" />
          <div className="space-y-2">
            <Skeleton className="w-[60px] h-6 rounded" />
            <Skeleton className="w-[60px] h-6 rounded" />
            <Skeleton className="w-[60px] h-6 rounded" />
          </div>
        </div>

        {/* Harga */}
        <div className="space-y-3">
          <Skeleton className="w-[60px] h-4" />
          <Skeleton className="w-full h-8 rounded" />
          <Skeleton className="w-full h-8 rounded" />
        </div>

        {/* Rent to Buy */}
        <div className="space-y-3">
          <Skeleton className="w-[80px] h-4" />
          <Skeleton className="w-[80px] h-5 rounded" />
          <Skeleton className="w-[80px] h-5 rounded" />
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Skeleton className="w-[50px] h-4" />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-[40px] h-5 rounded" />
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border rounded shadow-sm p-3 space-y-2">
            <Skeleton className="w-full h-[150px] rounded" />
            <Skeleton className="w-[80%] h-4" />
            <Skeleton className="w-[60%] h-4" />
            <div className="flex justify-between items-center">
              <Skeleton className="w-[50px] h-4" />
              <Skeleton className="w-[60px] h-4" />
            </div>
            <Skeleton className="w-[100px] h-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopContentSkeleton;
