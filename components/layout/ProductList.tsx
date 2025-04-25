import ProductCard from "@/components/fragments/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCardSkeleton from "../fragments/ProductCardSkeleton";
import { ProductCardProps } from "@/types/productCard";

interface ProductListProps {
  products: ProductCardProps[];
  loading?: boolean;
  numberCard?: number;
}

const ProductList = ({
  products,
  loading,
  numberCard = 5,
}: ProductListProps) => {
  return (
    <div className="w-full">
      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="flex justify-start">
            {loading
              ? Array.from({ length: numberCard }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-auto min-w-[200px]"
                  >
                    <ProductCardSkeleton />
                  </CarouselItem>
                ))
              : Array.isArray(products) &&
                products.map((product: ProductCardProps, index) => (
                  <CarouselItem key={index} className="basis-auto">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden md:flex flex-wrap md:justify-center xl:justify-start gap-2 gap-y-12 mt-2 w-full">
        {loading &&
          Array.from({ length: numberCard }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {Array.isArray(products) &&
          products.map((product: ProductCardProps, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
