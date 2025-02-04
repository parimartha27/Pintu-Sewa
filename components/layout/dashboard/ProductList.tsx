import ProductCard from "@/components/fragments/ProductCard";

const ProductList = () => {
  return (
    <div className="flex justify-center gap-4 bg-slate-400 mt-4 w-full">
      <div className="flex flex-col w-full flex-wrap">
        <div className="flex flex-wrap w-full">
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
            <ProductCard/>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
