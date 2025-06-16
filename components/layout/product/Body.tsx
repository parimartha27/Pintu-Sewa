"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import axios from "axios"

import FilterBody from "@/components/fragments/filter/Body"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination"
import ProductList from "../ProductList"
import { ProductCardProps } from "@/types/productCard"
import { ErrorSchema } from "@/types/errorSchema"
import { filteredProductBaseUrl } from "@/types/globalVar"
import NoProduct from "@/components/fragments/NoProduct"

interface ProductResponse {
  error_schema: ErrorSchema
  output_schema: {
    content: ProductCardProps[]
    current_page: number
    page_size: number
    total_items: number
    total_pages: number
  }
}

const ProductBodyContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const category = searchParams.get("categories") || ""
  const name = searchParams.get("name") || ""
  const page = parseInt(searchParams.get("page") || "1")
  const size = 16
  // const sort = "name,asc";

  const [products, setProducts] = useState<ProductCardProps[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      const filters = {
        category: searchParams.get("categories") || "",
        rentDuration: searchParams.get("rentDurations") || "",
        location: searchParams.get("locations") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        isRnb: searchParams.get("isRnbOptions") || "",
        minRating: searchParams.get("minRatings") || "",
        page: searchParams.get("page") || "",
        size: searchParams.get("size") || "",
        name: searchParams.get("name") || "",
      }
      try {
        setLoading(true)
        const url = `${filteredProductBaseUrl}?categories=${category}&name=${name}&rentDurations=${filters.rentDuration}&locations=${filters.location}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&isRnbOptions=${filters.isRnb}&minRatings=${filters.minRating}&page=${page}&size=${size}`

        const response = await axios.get<ProductResponse>(url)
        setProducts(response.data.output_schema.content)
        setTotalPages(response.data.output_schema.total_pages || 1)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [category, page, name, searchParams])

  const goToPage = (newPage: number) => {
    const query = new URLSearchParams(searchParams.toString())
    query.set("page", newPage.toString())
    query.set("size", size.toString())
    router.push(`/product?${query.toString()}`)
  }

  const getMiddlePages = (current: number, total: number, rangeCount: number = 5): (number | "...")[] => {
    const pages: (number | "...")[] = []

    const half = Math.floor(rangeCount / 2)
    let start = Math.max(current - half, 2)
    const end = Math.min(start + rangeCount - 1, total - 1)

    if (end - start < rangeCount - 1) {
      start = Math.max(end - rangeCount + 1, 2)
    }

    if (start > 2) pages.push("...")
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    if (end < total - 1) pages.push("...")

    return pages
  }

  const middlePages = getMiddlePages(page, totalPages)

  return (
    <div className='flex flex-col px-1 py-2 md:px-6 max-w-[1400px] h-auto mx-auto bg-color-layout pb-12 md:pb-[133px]'>
      <div className='flex flex-col mt-[60px] w-full'>
        <h2 className='text-[24px] font-semibold text-color-primary hidden lg:block mb-3'>Filter</h2>
        <div className='flex w-full'>
          <div className='mt-0 shadow-lg rounded-md w-2/5 max-w-[280px] max-h-[1400px] hidden lg:flex flex-col pb-5'>
            <FilterBody />
          </div>

          <div className='flex flex-col items-center w-full h-auto space-y-3 md:space-y-16'>
            <div className='w-full xl:pl-20 flex flex-col'>
              {loading ? (
                <ProductList
                  products={[]}
                  loading={true}
                  numberCard={16}
                />
              ) : products && products.length > 0 ? (
                <ProductList
                  products={products}
                  loading={false}
                  numberCard={16}
                />
              ) : (
                <NoProduct message={"Tidak ada produk"} />
              )}
            </div>

            <Pagination className='xl:pl-20'>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={() => goToPage(Math.max(page - 1, 1))}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink
                    href='#'
                    className={`text-[14px] text-color-primary ${page === 1 ? "font-bold underline" : ""}`}
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
                        href='#'
                        className={`text-[14px] text-color-primary ${p === page ? "font-bold underline" : ""}`}
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
                      href='#'
                      className={`text-[14px] text-color-primary ${page === totalPages ? "font-bold underline" : ""}`}
                      onClick={() => goToPage(totalPages)}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={() => goToPage(Math.min(page + 1, totalPages))}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProductBody = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductBodyContent />
    </Suspense>
  )
}

export default ProductBody
