import { Skeleton } from "@/components/ui/skeleton"

const CheckoutSkeleton =() => {
  return (
    <div className="space-y-6">

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

      <div className="border rounded-xl p-4 shadow-sm space-y-6">
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
    </div>
  )
}

export default CheckoutSkeleton
