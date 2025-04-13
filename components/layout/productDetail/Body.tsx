"use client";

import ProductDescription from "./ProductDescription";
import RentForm from "./RentForm";
import Review from "./Review";
import ShopAndLocation from "./ShopAndLocation";
import ProductList from "../ProductList";
import { useParams } from "next/navigation";
import {
  ProductDetailProps,
  ProductDetailResponse,
} from "@/types/productDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorSchema } from "@/types/errorSchema";
import { ProductCardProps } from "@/types/productCard";
import { ProductDetailShopProps } from "@/types/shop";
import { ReviewProps } from "@/types/review";
import {
  anotherShopProductBaseUrl,
  productBaseUrl,
  productReviewBaseUrl,
  shopProductBaseUrl,
} from "@/types/globalVar";
import NoProduct from "@/components/fragments/NoProduct";

interface ProductDitokoProps {
  error_schema: ErrorSchema;
  output_schema: { content: ProductCardProps[] };
}

interface ShopDetailResProps {
  error_schema: ErrorSchema;
  output_schema: ProductDetailShopProps;
}

interface ProductReviewResponse {
  error_schema: ErrorSchema;
  output_schema: {
    content: ReviewProps[];
  };
}

const ProductDetailBody = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetailProps>();
  const [loading, setLoading] = useState(true);
  const [shopProducts, setShopProducts] = useState<ProductCardProps[]>([]);
  const [shopDetail, setShopDetail] = useState<ProductDetailShopProps>();
  const [productReview, setProductReview] = useState<ReviewProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ProductDetailResponse>(
          `${productBaseUrl}/${id}`
        );
        setProductDetail(res.data.output_schema);

        const shopDetailRes = await axios.get<ShopDetailResProps>(
          `${shopProductBaseUrl}/${id}`
        );
        setShopDetail(shopDetailRes.data.output_schema);

        const reviewDetailRes = await axios.get<ProductReviewResponse>(
          `${productReviewBaseUrl}/${id}`
        );
        setProductReview(reviewDetailRes.data.output_schema.content);
        console.log("review Detail:", reviewDetailRes.data.output_schema);

        const res2 = await axios.get<ProductDitokoProps>(
          `${anotherShopProductBaseUrl}/${shopDetailRes?.data?.output_schema?.id}`
        );
        setShopProducts(res2.data?.output_schema.content);
        
        console.log("Product Detail:", res.data.output_schema);
        console.log("Another Shop Product Detail:", res2.data.output_schema);
      } catch (error) {
        console.error("Failed to fetch product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  return loading ? (
    <ProductDetailSkeleton />
  ) : (
    <div className="w-full flex flex-col px-0 py-0 md:px-6 max-w-[1300px] min-h-screen mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <div className="flex flex-col md:flex-row">
        {productDetail && shopDetail && (
          <ProductDescription
            productDetail={productDetail}
            shopDetail={shopDetail}
          />
        )}
        <RentForm productDetail={productDetail as ProductDetailProps} />
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <div className="lg:hidden">
          {shopDetail && <ShopAndLocation shopDetail={shopDetail} />}
        </div>
        {productReview && <Review reviewDetail={productReview} />}

        <div className="flex flex-col pl-2 pt-8 xl:pt-[72px]">
          <h2 className="text-lg xl:text-2xl sm:text-center xl:text-start pl-1 pb-3 font-medium xl:font-semibold text-color-primary">
            Barang lainnya di toko ini
          </h2>
          {shopProducts != null ? (
            shopProducts && <ProductList products={shopProducts} />
          ) : (
            <NoProduct />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailBody;

const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col px-0 py-0 md:px-6 mt-12 max-w-[1300px] mx-auto bg-color-layout pb-12 md:pb-[273px]">
      <div className="flex flex-col md:flex-row w-full gap-6">
        <div className="hidden xl:flex flex-col w-full max-w-[406px]">
          <Skeleton className="bg-slate-300 w-[406px] h-[403px] rounded-md" />
          <div className="flex mt-4 space-x-[13px]">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="w-[70px] h-[70px] rounded-md" />
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-4">
          <Skeleton className="w-[300px] h-[24px] rounded-md" />
          <Skeleton className="w-[180px] h-[20px] rounded-md" />
          <Skeleton className="w-[120px] h-[30px] rounded-md" />

          <div className="flex flex-col space-y-2 mt-4">
            <Skeleton className="w-[150px] h-[16px]" />
            <Skeleton className="w-[100px] h-[16px]" />
            <Skeleton className="w-[180px] h-[16px]" />
            <Skeleton className="w-[140px] h-[16px]" />
          </div>

          <div className="flex flex-col mt-6 space-y-2">
            <div className="flex items-center space-x-3">
              <Skeleton className="w-[50px] h-[50px] rounded-md" />
              <div className="flex flex-col space-y-2">
                <Skeleton className="w-[150px] h-[16px]" />
                <Skeleton className="w-[120px] h-[14px]" />
              </div>
            </div>
            <Skeleton className="w-[90px] h-[28px] rounded-md" />
          </div>

          <div className="flex flex-col mt-4 space-y-2">
            <Skeleton className="w-[200px] h-[16px]" />
            <Skeleton className="w-[180px] h-[14px]" />
            <Skeleton className="w-[160px] h-[14px]" />
          </div>
        </div>

        <div className="w-full md:max-w-[360px] flex flex-col border border-slate-200 p-4 rounded-lg space-y-4 bg-white">
          <Skeleton className="w-[160px] h-[20px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-full h-[40px]" />
          <Skeleton className="w-[120px] h-[20px]" />
          <Skeleton className="w-[200px] h-[30px]" />
          <Skeleton className="w-full h-[48px] rounded-md" />
          <Skeleton className="w-full h-[48px] rounded-md" />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Skeleton className="w-[300px] h-[24px]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-[200px] rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
};
