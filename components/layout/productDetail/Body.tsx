"use client";

import ProductDescription from "./ProductDescription";
import RentForm from "./RentForm";
import Review from "./Review";
import ShopAndLocation from "./ShopAndLocation";
import ProductList from "../ProductList";
import { ProductListType } from "@/types/productList";

const ProductDetailBody = ({ products }: ProductListType) => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 max-w-[1300px] min-h-screen max-h-auto mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <div className="flex flex-col md:flex-row ">
        <ProductDescription />
        <RentForm />
      </div>
      <div className="flex flex-col space-y-3">
        <div className="lg:hidden">
          <ShopAndLocation />
        </div>
        <Review />
        <div className="flex flex-col pl-2 pt-8 xl:pt-[72px]">
          <h2 className="text-lg xl:text-2xl sm:text-center xl:text-start pl-1 pb-3 font-medium xl:font-semibold text-color-primary">
            Barang lainnya di toko ini
          </h2>
          <ProductList products={products} />
        </div>
      </div>
      {/* <div className="flex"><ProductList products={products}/></div> */}
    </div>
  );
};

export default ProductDetailBody;
