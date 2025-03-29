import ProductContent from "@/components/fragments/shop/productContent";
import ShopProductFilter from "@/components/fragments/shop/ProductFilter";

const ProductContentLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <ShopProductFilter />
      <ProductContent />
    </div>
  );
};

export default ProductContentLayout;
