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
import { ProductCardProps } from "@/types/productCard";
import { ErrorSchema } from "@/types/errorSchema";

const baseUrl = "https://pintu-sewa.up.railway.app/api/product/filter";

interface ProductResponse {
  error_schema: ErrorSchema;
  output_schema: {
    content: ProductCardProps[];
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

const ProductBody = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category") || "";
  const name = searchParams.get("name") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const size = 8;
  // const sort = "name,asc";

  const [products, setProducts] = useState<ProductCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `${baseUrl}?category=${category}&name=${name}&page=${page}&size=${size}`;

        const response = await axios.get<ProductResponse>(url);
        const resProduct = response.data.output_schema.content;

        if (resProduct.length > 0) {
          setProducts(response.data.output_schema.content);
        } else {
          setProducts([]);
        }

        setTotalPages(response.data.output_schema.total_pages || 1);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page, name]);

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    query.set("size", size.toString());
    router.push(`/product?${query.toString()}`);
  };

  const getMiddlePages = (
    current: number,
    total: number,
    rangeCount: number = 5
  ): (number | "...")[] => {
    const pages: (number | "...")[] = [];

    const half = Math.floor(rangeCount / 2);
    let start = Math.max(current - half, 2);
    const end = Math.min(start + rangeCount - 1, total - 1);

    if (end - start < rangeCount - 1) {
      start = Math.max(end - rangeCount + 1, 2);
    }

    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < total - 1) pages.push("...");

    return pages;
  };

  const middlePages = getMiddlePages(page, totalPages);

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
              {products ? (
                <ProductList
                  products={products}
                  loading={loading}
                  numberCard={16}
                />
              ) : (
                <p className="text-center text-gray-400">Tidak ada produk</p>
              )}
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => goToPage(Math.max(page - 1, 1))}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    className={`text-[14px] text-color-primary ${
                      page === 1 ? "font-bold underline" : ""
                    }`}
                    onClick={() => goToPage(1)}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {middlePages.map((p, i) =>
                  p === "..." ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={p}>
                      <PaginationLink
                        href="#"
                        className={`text-[14px] text-color-primary ${
                          p === page ? "font-bold underline" : ""
                        }`}
                        onClick={() => goToPage(Number(p))}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                {totalPages > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      className={`text-[14px] text-color-primary ${
                        page === totalPages ? "font-bold underline" : ""
                      }`}
                      onClick={() => goToPage(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
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
