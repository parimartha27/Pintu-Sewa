"use client";

import ProductList from "../ProductList";
import ProductDescription from "./ProductDescription";
import RentForm from "./RentForm";
import Review from "./Review";
import { ProductListType } from "@/types/productList";

const ProductDetailBody = ({ products }: ProductListType) => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 max-w-[1400px] max-h-auto mx-auto bg-slate-100">
      <div className="flex flex-col">
        <ProductDescription />
        <RentForm />
      </div>
      <div className="flex">
        <Review />
      </div>
      {/* <div className="flex"><ProductList products={products}/></div> */}
    </div>
  );
};

export default ProductDetailBody;
