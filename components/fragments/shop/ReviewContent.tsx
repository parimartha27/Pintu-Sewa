"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import Filter from "@/public/filter.svg";
import CommentFilterBody from "../productDetail/CommentFilter";
import Product from "@/public/productTest.jpeg";
import Guest from "@/public/guest.svg";
import Star from "@/public/star.svg";

const ReviewContent = () => {
  return (
    <div className="flex flex-col w-full lg:pl-8">
      <div className="flex w-full justify-between">
        <h2 className="text-lg xl:text-2xl text-color-primary font-semibold hidden lg:block">
          Ulasan Penyewa
        </h2>
        <h2 className="text-lg text-color-primary font-semibold lg:hidden">
          Ulasan Penyewa
        </h2>
        <Link
          href={"/product/sepatu"}
          className="text-sm text-color-secondary font-medium hover:opacity-70 hidden lg:block"
        >
          Semua Ulasan
        </Link>
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
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div className="flex flex-col lg:flex-row bg-white py-6 border-b-[1px] border-[#D9D9D9] border-opacity-50 shadow-sm" key={index}>
            <div className="flex flex-col items-center lg:items-start min-w-[193px] space-y-3 px-6 border-r-[1px] border-[#D9D9D9] border-opacity-55">
              <Image
                key={index}
                src={Product}
                alt="product"
                className="w-[70px] h-[70px] xl:w-[88px] xl:h-[88px] rounded-md bg-amber-300"
              />

              <h2 className="font-semibold text-sm lg:text-base text-color-primary">Nama Produk</h2>
            </div>
            <div className="flex flex-col space-y-1 pl-[34px] pr-6">
              <div className="flex space-x-3">
                <Image
                  src={Guest}
                  alt="guest"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
                <div className="flex flex-col">
                  <h2 className="text-[12px] lg:text-[16px] text-color-primary font-medium lg:font-semibold">
                    Nama User
                  </h2>
                  <div className="flex space-x-2">
                    <div className="flex space-x-1 py-1">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <Image
                          src={Star}
                          alt="star"
                          className="w-2 h-2 lg:w-[14px] lg:h-[12.73px]"
                          key={rating}
                        />
                      ))}
                    </div>
                    <h3 className="text-[10px] lg:text-xs text-color-primary">
                      1 jam yang lalu
                    </h3>
                  </div>
                </div>
              </div>

              <h4 className="w-full text-start text-color-primary text-[10px] lg:text-sm py-2 max-w-[800px]">
                Saya sangat puas dengan pengalaman menyewa barang di sini.
                Proses pemesanan sangat mudah dan cepat, serta barang yang
                disewa dalam kondisi sangat baik dan bersih.
              </h4>

              <div className="flex space-x-2">
                {[1, 2, 3].map((index) => (
                  <Image
                    key={index}
                    src={Product}
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
