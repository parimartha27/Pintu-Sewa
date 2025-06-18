"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Filter from "@/public/filter.svg";
import CommentFilterBody from "@/components/fragments/productDetail/CommentFilter";
// import FotoVideoPenyewa from "./FotoVideoPenyewa";
import UserReview from "@/components/fragments/productDetail/UserReview";
import { ReviewProps } from "@/types/review";
import { useEffect, useState } from "react";
import { productReviewBaseUrl } from "@/types/globalVar";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { ErrorSchema } from "@/types/errorSchema";
import ReviewSkeleton from "./ReviewSkeleton";

interface ProductReviewResponse {
  error_schema: ErrorSchema;
  output_schema: {
    content: ReviewProps[];
  };
}

const Review = () => {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const [productReview, setProductReview] = useState<ReviewProps[]>();
  const [productReviewError, setProductReviewError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const filter = {
          hasMedia: searchParams.get("hasMedia") || "true",
          rating: searchParams.get("rating") || "5",
          // reviewTopics: searchParams.get("reviewTopics") || "kondisi barang",
        };

        const reviewDetailRes = await axios.get<ProductReviewResponse>(
          `${productReviewBaseUrl}/${id}?hasMedia=${filter.hasMedia}&rating=${filter.rating}`
        );

        setProductReview(reviewDetailRes.data.output_schema.content);
        console.log("review Detail:", reviewDetailRes.data.output_schema);
        setProductReviewError("");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.warn("Tidak ada review untuk produk ini.");
            setProductReviewError("Tidak Ada Ulasan Untuk Produk Ini");
          } else {
            console.error("Terjadi kesalahan:", error.message);
          }
        } else {
          console.error("Unexpected error", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [searchParams, id]);

  return (
    <div className="px-2 pt-8 flex">
      <div className="lg:flex flex-col hidden">
        <h2 className=" ml-4 text-lg xl:text-2xl text-color-primary font-semibold mr-[220px] text-nowrap">
          Filter Ulasan
        </h2>
        <div className="w-full max-w-[280px] shadow-sm bg-white">
          <CommentFilterBody />
        </div>
      </div>

      <div className="flex flex-col space-y-[19px] xl:max-w-[600px] w-full">
        <div className="flex justify-between ">
          <h2 className="text-lg xl:text-2xl text-color-primary font-medium hidden lg:block">
            Ulasan Penyewa
          </h2>
          <h2 className="text-sm text-color-primary font-medium lg:hidden">
            Ulasan
          </h2>

          <Sheet>
            <SheetTrigger className="flex hover:bg-slate-200 items-center space-x-1 pb-4 lg:hidden">
              <h2 className="text-xs font-medium text-color-primary">Filter</h2>
              <Image src={Filter} alt="filter" width={12.33} height={11.72} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-start text-lg text-color-primary font-semibold">
                  Filter Ulasan
                </SheetTitle>
              </SheetHeader>
              <CommentFilterBody />
            </SheetContent>
          </Sheet>
        </div>

        {/*User Comment Section*/}
        <div className="w-full flex flex-col space-y-3 md:space-y-5 lg:space-y-6 mt-[19px] lg:pt-6 max-h-[450px] overflow-y-auto">
          {loading ? (
            <ReviewSkeleton />
          ) : productReviewError ? (
            <p className="text-color-secondary md:text-xl xl:text-2xl font-semibold text-center pt-8">
              {productReviewError}
            </p>
          ) : productReview && productReview.length > 0 ? (
            productReview.map((item, index) => (
              <UserReview key={index} reviewDetail={item} />
            ))
          ) : (
            <p className="text-color-secondary lg:text-xl font-semibold text-center pt-8">
              Belum ada ulasan untuk produk ini.
            </p>
          )}
        </div>
        {/*User Comment Section*/}
      </div>
    </div>
  );
};

export default Review;
