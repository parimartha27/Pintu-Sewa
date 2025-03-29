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
import FotoVideoPenyewa from "./FotoVideoPenyewa";
import Link from "next/link";
import UserReview from "@/components/fragments/productDetail/UserReview";

const Review = () => {
  return (
    <div className="px-2 pt-8 flex ">
      <div className="lg:flex flex-col hidden ">
        <h2 className=" ml-4 text-lg xl:text-2xl text-color-primary font-semibold mr-[220px] text-nowrap">
          Filter Ulasan
        </h2>
        <div className="w-full max-w-[280px] shadow-sm bg-white">
          <CommentFilterBody />
        </div>
      </div>
      <div className="flex flex-col space-y-[19px] max-w-[600px]">
        <FotoVideoPenyewa />
        <div className="flex justify-between lg:pt-[35px]">
          <h2 className="text-lg xl:text-2xl text-color-primary font-medium hidden lg:block">
            Ulasan Penyewa
          </h2>
          <h2 className="text-sm text-color-primary font-medium lg:hidden">
            Ulasan
          </h2>
          <Link
            href={"/product/sepatu"}
            className="text-sm text-color-secondary font-medium hover:opacity-70 hidden lg:block"
          >
            Semua Ulasan
          </Link>
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
        <div className="flex flex-col space-y-3 lg:space-y-6 mt-[19px] lg:pt-6 max-h-[300px] overflow-y-auto">
          {[1, 2, 3].map((index) => (
            <UserReview key={index} />
          ))}
        </div>
        {/*User Comment Section*/}
      </div>
    </div>
  );
};

export default Review;
