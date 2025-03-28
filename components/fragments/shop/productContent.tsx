"use client";

import ProductList from "@/components/layout/ProductList";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  {
    name: "sepatu",
  },
  {
    name: "sepatu",
  }
];

const ProductContent = () => {
  return (
    <div className="flex flex-col w-full h-auto space-y-3 md:space-y-16">
      <div className="w-full xl:pl-6 flex flex-col">
        <ProductList products={Products}></ProductList>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              4
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              5
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" className="text-[14px] text-color-primary">
              700
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductContent;
