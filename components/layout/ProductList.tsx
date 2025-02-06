import ProductCard from "@/components/fragments/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Product {
  name: string;
}

interface ProductListProps {
  products: Product[];
}

const ProductList = (props: ProductListProps) => {
  return (
    <div className="w-full">

      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="flex justify-start">
           
              <CarouselItem  className="basis-auto">
                <ProductCard />
              </CarouselItem>

              <CarouselItem  className="basis-auto">
                <ProductCard />
              </CarouselItem>

              <CarouselItem  className="basis-auto">
                <ProductCard />
              </CarouselItem>

              <CarouselItem  className="basis-auto">
                <ProductCard />
              </CarouselItem>

              <CarouselItem  className="basis-auto">
                <ProductCard />
              </CarouselItem>
            
          </CarouselContent>
        </Carousel>
      </div>

  
      <div className="hidden md:flex flex-wrap md:justify-center xl:justify-start gap-2 gap-y-12 mt-2 w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductList;
