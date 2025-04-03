import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const ProductCardSkeleton = () => {
  return (
    <div className="p-1 w-full max-w-[200px] md:max-w-[240px] h-full max-h-[300px] md:max-h-[360px]">
      <Card className="rounded-lg h-full w-auto shadow-md animate-pulse">
        <CardHeader className="h-[120px] md:h-[140px] lg:h-[170px] bg-gray-300 rounded-t-lg"></CardHeader>

        <CardContent className="p-2 md:p-3">

          <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>

          <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>

          <div className="flex items-center mt-2">
            <div className="h-3 w-3 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>

          <div className="flex space-x-1 mt-2">
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
            <div className="h-3 w-10 bg-gray-300 rounded"></div>
          </div>

          <div className="flex items-center mt-3">
            <div className="h-3 w-3 bg-gray-300 rounded-full mr-1"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded"></div>
          </div>
        </CardContent>
        <div className="h-[0.1px] mx-2 md:mx-3 bg-gray-400"></div>
        <CardFooter className="flex justify-between items-center pt-2 md:pt-3 px-2 md:px-3">
          <div className="flex items-center">
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-6 bg-gray-300 rounded ml-1"></div>
          </div>
          <div className="flex items-center">
            <div className="h-3 w-6 bg-gray-300 rounded"></div>
            <div className="h-3 w-12 bg-gray-300 rounded ml-1"></div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardSkeleton;
