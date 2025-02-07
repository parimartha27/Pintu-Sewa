import ProductCard from "@/components/fragments/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ProductListType } from "@/types/productList";

const ProductList = ({ products }: ProductListType) => {
  return (
    <div className="w-full">
      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="flex justify-start">
            {products.map((product, index) => (
              <CarouselItem key={index} className="basis-auto">
                <ProductCard productName={product.name} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="hidden md:flex flex-wrap md:justify-center xl:justify-start gap-2 gap-y-12 mt-2 w-full">
        {products.map((product, index) => (<ProductCard key={index} productName={product.name}/>))}
      </div>
    </div>
  );
};

export default ProductList;
