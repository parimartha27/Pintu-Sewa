"use client";

import ProductDescription from "./ProductDescription";
import RentForm from "./RentForm";
import Review from "./Review";
import { ProductType } from "@/types/product";

const ProductDetailBody = ({ product }: ProductType) => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 max-w-[1400px] min-h-screen max-h-auto mx-auto bg-slate-100">
      <div className="flex flex-col">
        <ProductDescription />
        <RentForm />
      </div>
      <div className="flex flex-col">
        <Review />
      </div>
      {/* <div className="flex"><ProductList products={products}/></div> */}
    </div>
  );
};

export default ProductDetailBody;
