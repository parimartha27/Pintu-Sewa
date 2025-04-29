import { Skeleton } from "@/components/ui/skeleton"

export const CheckoutAddressSkeleton = () => {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-64 h-4" />
            <Skeleton className="w-48 h-4" />
          </div>
          <Skeleton className="w-16 h-8 rounded-md" />
        </div>
      </div>
  )
}

export const CheckoutShopAndItemsSkeleton =() => {
  return (

      <div className="border rounded-xl p-4 shadow-sm space-y-6 mt-6">
        <div className="flex items-center gap-3">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="w-32 h-4" />
        </div>

        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 border-t pt-4"
          >
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-5 h-5 rounded" />
              <Skeleton className="w-20 h-20 rounded-md" />
            </div>

            <div className="flex-1 space-y-2">
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-28 h-4" />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Skeleton className="w-24 h-3 mb-1" />
                  <Skeleton className="w-40 h-4" />
                </div>
                <div>
                  <Skeleton className="w-24 h-3 mb-1" />
                  <Skeleton className="w-20 h-4" />
                </div>
                <div>
                  <Skeleton className="w-24 h-3 mb-1" />
                  <Skeleton className="w-12 h-4" />
                </div>
                <div>
                  <Skeleton className="w-24 h-3 mb-1" />
                  <Skeleton className="w-24 h-4" />
                </div>
              </div>
            </div>

            <Skeleton className="w-24 h-6 ml-auto" />
          </div>
        ))}

        <div className="border-t pt-4 space-y-2 max-w-md ml-auto">
          <div className="flex justify-between">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-24 h-4" />
          </div>
          <div className="flex justify-between font-bold">
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
      </div>
  )
}

export const CheckoutPaymentDetailSkeleton = () => {
  return (
    <div className="border rounded-xl p-6 space-y-6 mt-6 mb-12">
      <Skeleton className="h-6 w-40" />
      <div className="grid grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((_, idx) => (
          <div key={idx} className="flex items-center space-x-4">
            <Skeleton className="h-5 w-5 rounded-full" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-32" /> 
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((_, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-28" />
        </div>
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-12 w-40 rounded-xl" />
      </div>
    </div>
  );
}
