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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCardProps } from "@/types/productCard";
import { ShopDetailPagedProductProps } from "@/types/shopDetail";
import { anotherShopProductBaseUrl } from "@/types/globalVar";
import NoProduct from "../NoProduct";

const ProductContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { id } = useParams();
  const page = parseInt(searchParams.get("page") || "1");
  const size = 12;


  const [data, setData] = useState<ProductCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const filters = {
    rentDuration: searchParams.get("rentDuration") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    isRnb: searchParams.get("isRnb") || "",
    minRating: searchParams.get("minRating") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortDirection: searchParams.get("sortDirection") || "",
  };

  const fetchShopData = async () => {
  
    try {
      setLoading(true);
      const response = await axios.get<ShopDetailPagedProductProps>(
        ` ${anotherShopProductBaseUrl}/${id}?page=${page}&size=${size}&rentDuration=${filters.rentDuration}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&isRnb=${filters.isRnb}&minRating=${filters.minRating}&sortBy=${filters.sortBy}&sortDirection=${filters.sortDirection}`
      );
      setData(response.data.output_schema.content);
      setTotalPages(response.data.output_schema.total_pages || 1);
    } catch (error) {
      console.error("Failed to fetch shop data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchShopData();
    }
  }, [id, page, searchParams]);

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    query.set("size", size.toString());
    router.push(`/shop/${id}?${query.toString()}`);
  };

  const getMiddlePages = (
    current: number,
    total: number,
    rangeCount = 5
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
    <div className="flex flex-col w-full h-auto space-y-3 md:space-y-16">
      <div className="w-full xl:pl-6 flex flex-col">
        {!data && <NoProduct />}
        {data && (
          <ProductList products={data} numberCard={12} loading={loading} />
        )}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(Math.max(page - 1, 1))}
              href="#"
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
  );
};

export default ProductContent;
