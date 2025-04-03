import ProductCard from "@/components/fragments/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductType } from "@/types/product";
import ProductCardSkeleton from "../fragments/ProductCardSkeleton";

interface ProductListProps {
  products: ProductType[];
  loading: boolean;
}

const ProductList = ({ products, loading }: ProductListProps) => {
  return (
    <div className="w-full">
      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="flex justify-start">
            {products &&
              products.map((product: ProductType, index) => (
                <CarouselItem key={index} className="basis-auto">
                  {loading &&
                    Array.from({ length: 5 }).map((_, index) => (
                      <CarouselItem key={index} className="basis-auto">
                        <ProductCardSkeleton />
                      </CarouselItem>
                    ))}
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden md:flex flex-wrap md:justify-center xl:justify-start gap-2 gap-y-12 mt-2 w-full">
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
          ))}
        {products &&
          products.map((product: ProductType, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
