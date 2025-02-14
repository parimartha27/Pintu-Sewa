"use client";

import FilterBody from "@/components/fragments/filter/Body";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import ProductList from "../ProductList";
import { ProductListType } from "@/types/productList";

const ProductBody = ({ products }: ProductListType) => {
  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1400px] h-auto mx-auto bg-color-layout pb-12 md:pb-[133px]">
      <div className="flex flex-col mt-[60px] w-full">
        <h2 className="text-[24px] font-semibold text-color-primary hidden lg:block mb-3">
          Filter
        </h2>
        <div className="flex w-full">
          <div className="mt-0 shadow-lg rounded-md w-2/5 max-w-[280px] max-h-[1730px] hidden lg:flex flex-col">
            <FilterBody />
          </div>
          <div className="flex flex-col items-center w-full h-auto space-y-3 md:space-y-16">
            <div className="w-full xl:pl-20 flex flex-col">
              <ProductList products={products}></ProductList>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    4
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    5
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className="text-[14px] text-color-primary"
                  >
                    700
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductBody;
