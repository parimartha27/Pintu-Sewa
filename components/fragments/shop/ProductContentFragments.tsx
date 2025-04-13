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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductCardProps } from "@/types/productCard";
import { ShopDetailPagedProductProps } from "@/types/shopDetail";

const baseUrl = "https://pintu-sewa.up.railway.app/api/product/shop";

const ProductContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const shopId = searchParams.get("id") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const size = 12;

  const [data, setData] = useState<ProductCardProps[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchShopData = async () => {
    try {
      const response = await axios.get<ShopDetailPagedProductProps>(
        `${baseUrl}/${shopId}?page=${page}&size=${size}`
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
    if (shopId) {
      fetchShopData();
    }
  }, [shopId, page]);

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString());
    query.set("page", newPage.toString());
    router.push(`/shop?id=${shopId}&${query.toString()}`);
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
