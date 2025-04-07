import ProductContent from "@/components/fragments/shop/ProductContentFragments";
import ShopProductFilter from "@/components/fragments/shop/ProductFilter";
import { ShopProps } from "@/types/shop";
import { useSearchParams, useRouter } from "next/navigation";


const ProductContentLayout = ({data}: {data: ShopProps}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <ShopProductFilter />
      <ProductContent data={data} />
    </div>
  );
};

export default ProductContentLayout;
