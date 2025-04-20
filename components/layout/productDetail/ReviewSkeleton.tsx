import { Skeleton } from "@/components/ui/skeleton";

const SkeletonReview = () => {
  return (
    <div className="flex flex-col space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          {/* Header: Avatar + Username + Timestamp */}
          <div className="flex items-center space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col space-y-1">
              <Skeleton className="w-24 h-4 rounded" />
              <Skeleton className="w-16 h-3 rounded" />
            </div>
          </div>

          {/* Review Text */}
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-60 h-3 rounded" />
            <Skeleton className="w-52 h-3 rounded" />
          </div>

          {/* Product Image */}
          <Skeleton className="w-32 h-24 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default SkeletonReview;