"use client";

import ProductList from "../ProductList";
import Category from "./Category";
import { ProductListType } from "@/types/productList";

const DashboardBody = ({ products }: ProductListType) => {
  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1280px] mx-auto">
      <Category />
      <div>
        <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] lg:text-[24px] mt-7 md:mt-0 mb-4">
          Banyak orang menyewa ini
        </h4>
        <ProductList products={products} />
      </div>

      <div className="mt-5 md:mt-20 lg:mt-32">
        <h4 className="font-semibold text-start md:text-center xl:text-start ml-1 text-color-primary text-[20px] lg:text-[24px] mt-7 md:mt-0 lg:-mt-4  mb-4">
          Dekat lokasi kamu
        </h4>
        <ProductList products={products} />
      </div>
    </div>
  );
};

export default DashboardBody;
