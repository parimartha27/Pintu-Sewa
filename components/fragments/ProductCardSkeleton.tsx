import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="p-1 w-full max-w-[200px] md:max-w-[240px] h-full max-h-[300px] md:max-h-[360px]">
      <Card className="rounded-lg h-full w-auto shadow-md">
        <CardHeader className="p-0">
          <Skeleton className="h-[120px] md:h-[140px] lg:h-[170px] w-full rounded-t-lg" />
        </CardHeader>

        <CardContent className="p-2 md:p-3 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/4" />

          <div className="flex items-center space-x-2 mt-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          <div className="flex space-x-1 mt-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-10" />
          </div>

          <div className="flex items-center mt-3 space-x-2">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </CardContent>

        <Skeleton className="h-[0.1px] mx-2 md:mx-3" />

        <CardFooter className="flex justify-between items-center pt-2 md:pt-3 px-2 md:px-3">
          <div className="flex items-center space-x-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-6" />
          </div>
          <div className="flex items-center space-x-1">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="h-3 w-12" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardSkeleton;
