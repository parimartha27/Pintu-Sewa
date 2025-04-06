import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ShopHeaderSkeleton = () => {
  return (
    <Card className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 w-full items-center lg:justify-between py-4 px-4 lg:py-6 lg:px-8 border-none shadow-md">
      <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 w-full sm:w-auto">
        <Skeleton className="w-16 h-16 sm:w-[100px] sm:h-[100px] self-center rounded-full" />
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <Skeleton className="h-6 w-[120px] sm:w-[180px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[180px]" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-7 space-y-4 sm:space-y-0 w-full sm:w-auto">
        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-4 w-[80px]" />
        </div>

        <div className="sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block" />

        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-[60px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>

        <div className="sm:w-[2px] sm:h-[42px] bg-[#D9D9D9] self-center hidden sm:block" />

        <div className="flex flex-col items-center space-y-1">
          <Skeleton className="h-5 w-[100px]" />
          <Skeleton className="h-4 w-[120px]" />
        </div>
      </div>
    </Card>
  );
};

export default ShopHeaderSkeleton;
