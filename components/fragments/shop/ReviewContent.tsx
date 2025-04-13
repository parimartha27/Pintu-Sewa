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
import CommentFilterBody from "../productDetail/CommentFilter";
import Product from "@/public/productTest.jpeg";
import Guest from "@/public/guest.svg";
import Star from "@/public/star.svg";
import { useParams } from "next/navigation";
import { ShopDetailReviewProps, ShopReviewProps } from "@/types/shopDetail";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewContentSkeleton from "@/components/layout/shop/ReviewContentSkeleton";

const baseUrl = "https://pintu-sewa.up.railway.app/api/review/shop";

const ReviewContent = () => {
  const { id } = useParams();
  const [shopReview, setShopReview] = useState<ShopReviewProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopReviewRes = await axios.get<ShopDetailReviewProps>(
          `${baseUrl}/${id}?rating=4&hasMedia=true`
        );
        setShopReview(shopReviewRes.data.output_schema.content);
        console.log("Shop Review Data:", shopReviewRes);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShopData();
  }, [id]);

  return (
    <div className="flex flex-col w-full lg:pl-8">
      <div className="flex w-full justify-between">
        <h2 className="text-lg xl:text-2xl text-color-primary font-semibold hidden lg:block">
          Ulasan Penyewa
        </h2>
        <h2 className="text-lg text-color-primary font-semibold lg:hidden">
          Ulasan Penyewa
        </h2>

        <Sheet>
          <SheetTrigger className="flex hover:bg-slate-200 items-center space-x-1 pb-4 lg:hidden">
            <h2 className="text-lg font-medium text-color-primary">Filter</h2>
            <Image src={Filter} alt="filter" width={18} height={18} />
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

      <div className="flex flex-col space-y-3 lg:space-y-6 mt-[19px] lg:pt-6 max-h-[1158px] overflow-y-auto">
        {loading && <ReviewContentSkeleton />}
        {shopReview.map((review, index) => (
          <div
            className="flex flex-col lg:flex-row bg-white py-6 border-b-[1px] border-[#D9D9D9] border-opacity-50 shadow-sm"
            key={index}
          >
            <div className="flex flex-col items-center lg:items-start min-w-[193px] space-y-3 px-6 border-r-[1px] border-[#D9D9D9] border-opacity-55">
              <Image
                width={70}
                height={70}
                src={review.product_image || Product}
                alt="product"
                className="w-[70px] h-[70px] xl:w-[88px] xl:h-[88px] rounded-md bg-amber-300"
              />

              <h2 className="font-semibold text-sm lg:text-base text-color-primary">
                {review.product_name || "Nama Produk"}
              </h2>
            </div>
            <div className="flex flex-col space-y-1 pl-[34px] pr-6">
              <div className="flex space-x-3">
                <Image
                  width={40}
                  height={40}
                  src={Guest}
                  alt="guest"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
                <div className="flex flex-col">
                  <h2 className="text-[12px] lg:text-[16px] text-color-primary font-medium lg:font-semibold">
                    {review.username || "Nama Pengguna"}
                  </h2>
                  <div className="flex space-x-2">
                    <div className="flex space-x-1 py-1">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <Image
                          key={i}
                          src={Star}
                          alt="star"
                          className="w-2 h-2 lg:w-[14px] lg:h-[12.73px]"
                        />
                      ))}
                    </div>
                    <h3 className="text-[10px] lg:text-xs text-color-primary">
                      {review.created_at || "x tahun yang lalu"}
                    </h3>
                  </div>
                </div>
              </div>

              <h4 className="w-full text-start text-color-primary text-[10px] lg:text-sm py-2 max-w-[800px]">
                {review.comment || "Komentar Pengguna"}
              </h4>

              <div className="flex space-x-2">
                {review.images.map((path, index) => (
                  <Image
                    key={index}
                    width={40}
                    height={40}
                    src={path || Product.src}
                    alt="product"
                    className="w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewContent;
