import { Skeleton } from "@/components/ui/skeleton";

const ProductOrderHistoryCardSkeleton = () => {
  return (
    <div className="border rounded-lg p-4 space-y-4">

    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>

    <div className="border-t" />

    <div className="flex items-start space-x-4">
      <Skeleton className="h-16 w-16 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
    </div>

    <div className="border-t" />

    <div className="flex justify-end space-x-2">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-6 w-28" />
    </div>
  </div>
  );
};

export default ProductOrderHistoryCardSkeleton;
