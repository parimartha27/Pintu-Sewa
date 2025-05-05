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
import ReviewContentSkeleton from "@/components/layout/shop/ReviewContentSkeleton";
import { X } from "lucide-react";
import { ShopReviewProps } from "@/types/shopDetail";
import { useState } from "react";

interface ShopReviewContentProps {
  shopReview: ShopReviewProps[];
  loading: boolean;
}

const ReviewContent = ({ shopReview, loading }: ShopReviewContentProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  console.log("shop review" + shopReview);
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
        {loading ? (
          <ReviewContentSkeleton />
        ) : shopReview.length === 0 ? (
          <p className="text-sm md:text-2xl font-semibold text-color-secondary text-center w-full">Tidak Ada Ulasan</p>
        ) : (
          <>
            {shopReview.map((review, index) => (
              <div
                className="flex flex-col lg:flex-row bg-white py-6 border-b-[1px] border-[#D9D9D9] border-opacity-50 shadow-sm"
                key={index}
              >
                <div className="flex flex-col items-center lg:items-start min-w-[250px] space-y-3 px-6 border-r-[1px] border-[#D9D9D9] border-opacity-55">
                  <Image
                    width={70}
                    height={70}
                    src={review.product_image || Product}
                    alt="product"
                    className="w-[70px] h-[70px] xl:w-[88px] xl:h-[88px] rounded-md bg-amber-300 hover:cursor-pointer"
                    onClick={() => setSelectedImage(review.product_image)}
                  />

                  <h2 className="font-semibold text-sm lg:text-base text-color-primary">
                    {review.product_name || "Nama Produk"}
                  </h2>
                </div>
                <div className="flex flex-col space-y-1 pl-[34px] pr-6">
                  <div className="flex space-x-3 mt-4 lg:mt-0">
                    <Image
                      width={40}
                      height={40}
                      src={review.user_profile || Guest}
                      alt="guest"
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-fit"
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
                        <h3 className="text-[10px] lg:text-xs text-color-primary lg:mt-1">
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
                        src={path || Product}
                        alt={`review-image-${index}`}
                        width={60}
                        height={60}
                        className="w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300 cursor-pointer object-cover"
                        onClick={() => setSelectedImage(path)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative w-[90vw] h-[90vh]">
            <button
              className="absolute top-2 right-2 z-50 bg-white text-black rounded-full p-1 hover:bg-red-500 hover:text-white transition"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>

            <Image
              src={selectedImage}
              alt="fullscreen-review-image"
              fill
              className="object-contain rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewContent;
