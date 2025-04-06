"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

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
import { ProductType } from "@/types/product";

const baseUrl = "https://pintu-sewa.up.railway.app/api/product";

interface ProductResponse {
  error_schema: {
    error_code: string;
    error_message: string;
  };
  output_schema: {
    content: ProductType[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

const ProductBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const size = 2;
  const sort = "name,desc";

  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${baseUrl}?category=${encodeURIComponent(
          category
        )}&page=${page}&size=${size}&sort=${sort}`;

        const response = await axios.get<ProductResponse>(url);
        setProducts(response.data.output_schema.content);
        console.log("Products:", response.data.output_schema.content);
        setTotalPages(response.data.output_schema.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page]);

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    query.set("size", size.toString());
    router.push(`/product?${query.toString()}`);
  };

  return (
    <div className="flex flex-col px-1 py-2 md:px-6 max-w-[1400px] h-auto mx-auto bg-color-layout pb-12 md:pb-[133px]">
      <div className="flex flex-col mt-[60px] w-full">
        <h2 className="text-[24px] font-semibold text-color-primary hidden lg:block mb-3">
          Filter
        </h2>
        <div className="flex w-full">
          <div className="mt-0 shadow-lg rounded-md w-2/5 max-w-[280px] max-h-[1730px] hidden lg:flex flex-col pb-5">
            <FilterBody />
          </div>

          <div className="flex flex-col items-center w-full h-auto space-y-3 md:space-y-16">
            <div className="w-full xl:pl-20 flex flex-col">
              <ProductList
                products={products}
                loading={loading}
                numberCard={16}
              />
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => goToPage(Math.max(page - 1, 1))}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      className="text-[14px] text-color-primary"
                      onClick={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#"
                        className="text-[14px] text-color-primary"
                        onClick={() => goToPage(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => goToPage(Math.min(page + 1, totalPages))}
                  />
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
