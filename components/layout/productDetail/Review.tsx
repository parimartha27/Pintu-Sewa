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
import Guest from "@/public/guest.svg";
import Star from "@/public/star.svg";
import RegisterImage from "@/public/register.svg";
import CommentFilterBody from "@/components/fragments/productDetail/CommentFilter";
import FotoVideoPenyewa from "./FotoVideoPenyewa";
import Link from "next/link";

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
            <div key={index} className="flex flex-col space-y-1">
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

              <h4 className="w-full text-start text-color-primary text-[10px] lg:text-sm py-2">
                Saya sangat puas dengan pengalaman menyewa barang di sini.
                Proses pemesanan sangat mudah dan cepat, serta barang yang
                disewa dalam kondisi sangat baik dan bersih.
              </h4>

              <div className="flex space-x-2">
                {[1, 2, 3].map((index) => (
                  <Image
                    key={index}
                    src={RegisterImage}
                    alt="register-image"
                    className="w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/*User Comment Section*/}
      </div>
    </div>
  );
};

export default Review;
