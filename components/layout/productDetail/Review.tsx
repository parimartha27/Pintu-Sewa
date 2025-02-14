"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
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

const Review = () => {
  return (
    <div className="px-2 pt-8 flex flex-col space-y-[19px] ">
      <div className="flex justify-between">
        <h2 className="text-sm text-color-primary font-medium">Ulasan</h2>
        <Sheet>
          <SheetTrigger className="flex hover:bg-slate-200 items-center space-x-1 pb-4">
            <h2 className="text-xs font-medium text-color-primary">Filter</h2>
            <Image src={Filter} alt="filter" width={12.33} height={11.72} />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-start text-lg text-color-primary font-semibold">
                Filter Ulasan
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <CommentFilterBody />
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>

      {/*User Comment Section*/}
      <div className="flex flex-col space-y-3 mt-[19px] max-h-[300px] overflow-y-scroll">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex flex-col space-y-1">
            <div className="flex space-x-3">
              <Image src={Guest} alt="guest" className="w-8 h-8" />
              <div className="flex flex-col">
                <h2 className="text-[12px] text-color-primary font-medium">
                  Nama User
                </h2>
                <div className="flex space-x-2">
                  <div className="flex space-x-1 py-1">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <Image
                        src={Star}
                        alt="star"
                        className="w-2 h-2"
                        key={rating}
                      />
                    ))}
                  </div>
                  <h3 className="text-[10px] text-color-primary">
                    1 jam yang lalu
                  </h3>
                </div>
              </div>
            </div>

            <h4 className="w-full text-start text-color-primary text-[10px] py-2">
              Saya sangat puas dengan pengalaman menyewa barang di sini. Proses
              pemesanan sangat mudah dan cepat, serta barang yang disewa dalam
              kondisi sangat baik dan bersih.
            </h4>

            <div className="flex space-x-2">
              <Image
                src={RegisterImage}
                alt="register-image"
                className="w-8 h-8 rounded-md bg-amber-300"
              />
              <Image
                src={RegisterImage}
                alt="register-image"
                className="w-8 h-8 rounded-md bg-amber-300"
              />
              <Image
                src={RegisterImage}
                alt="register-image"
                className="w-8 h-8 rounded-md bg-amber-300"
              />
            </div>
          </div>
        ))}
      </div>
      {/*User Comment Section*/}
    </div>
  );
};

export default Review;
