import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 mt-12 max-w-[1300px] mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="hidden xl:flex flex-col w-full max-w-[406px]">
          <Skeleton className="bg-slate-300 w-[406px] h-[403px] rounded-md" />
          <div className="flex mt-4 space-x-[13px]">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-[70px] h-[70px] rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <Skeleton className="w-[300px] h-[24px] rounded-md" />
          <Skeleton className="w-[180px] h-[20px] rounded-md" />
          <Skeleton className="w-[120px] h-[30px] rounded-md" />

          <div className="flex flex-col space-y-2 mt-4">
            <Skeleton className="w-[150px] h-[16px]" />
            <Skeleton className="w-[100px] h-[16px]" />
            <Skeleton className="w-[180px] h-[16px]" />
            <Skeleton className="w-[140px] h-[16px]" />
          </div>

          <div className="flex flex-col mt-6 space-y-2">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-[50px] h-[50px] rounded-md" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-[150px] h-[16px]" />
                <Skeleton className="w-[120px] h-[14px]" />
              </div>
            </div>
            <Skeleton className="w-[90px] h-[28px] rounded-md" />
          </div>

          <div className="flex flex-col mt-4 space-y-2">
            <Skeleton className="w-[200px] h-[16px]" />
            <Skeleton className="w-[180px] h-[14px]" />
            <Skeleton className="w-[160px] h-[14px]" />
          </div>
        </div>

        <div className="w-full md:max-w-[360px] flex flex-col border border-slate-200 p-4 rounded-lg space-y-4 bg-white">
          <Skeleton className="w-[160px] h-[20px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-[120px] h-[20px]" />
          <Skeleton className="w-[200px] h-[30px]" />
          <Skeleton className="w-full h-[48px] rounded-md" />
          <Skeleton className="w-full h-[48px] rounded-md" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Skeleton className="w-[300px] h-[24px]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
