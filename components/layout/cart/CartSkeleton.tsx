import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
  return (
    <div className="space-y-6 mt-6">

      <div className="flex items-center gap-4 border rounded-lg p-4">
        <Skeleton className="w-5 h-5 rounded" />
        <Skeleton className="w-32 h-4" />
      </div>

      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="border rounded-lg p-4 space-y-4 shadow-sm">

          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5 rounded" />
            <Skeleton className="w-32 h-4" />
          </div>

          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 border-t pt-4">

              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-5 h-5 rounded" />
                <Skeleton className="w-20 h-20 rounded-md" />
              </div>

              <div className="flex-1 space-y-2">
                <Skeleton className="w-40 h-4" /> 
                <Skeleton className="w-28 h-4" /> 
                <div className="flex gap-4 flex-wrap">
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
                    <Skeleton className="w-24 h-8 rounded-md" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-10 h-3" />
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Tombol Checkout */}
      <div className="flex justify-end">
        <Skeleton className="w-36 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default CartSkeleton;
