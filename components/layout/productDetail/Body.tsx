"use client";

import ProductDescription from "./ProductDescription";
import RentForm from "./RentForm";
import Review from "./Review";
import { ProductType } from "@/types/product";
import ShopAndLocation from "./ShopAndLocation";
import ProductList from "../ProductList";

const Products = [
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  },
];

const ProductDetailBody = ({ product }: ProductType) => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 max-w-[1400px] min-h-screen max-h-auto mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <div className="flex flex-col">
        <ProductDescription />
        <RentForm />
      </div>
      <div className="flex flex-col space-y-3">
        <ShopAndLocation />
        <Review />
        <div className="flex flex-col pl-2 pt-8">
          <h2 className="text-sm pl-1 font-medium text-color-primary">
            Barang lainnya di toko ini
          </h2>
          <ProductList products={Products} />
        </div>
      </div>
      {/* <div className="flex"><ProductList products={products}/></div> */}
    </div>
  );
};

export default ProductDetailBody;
