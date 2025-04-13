"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Image1 from "@/public/banner1.svg";
import Image2 from "@/public/banner2.svg";
import Image3 from "@/public/banner3.svg";
// import Image4 from "@/public/register.svg";
import Image5 from "@/public/login.svg";
import Star from "@/public/star.svg";
import Jam from "@/public/jam.svg";
import Box from "@/public/box.svg";
import Coin from "@/public/coin.svg";
import Special from "@/public/special.svg";
import TestImage from "@/public/register.svg";
import TooltipIcon from "@/public/tooltip.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShopAndLocation from "./ShopAndLocation";
import { useState } from "react";
import { ProductDetailProps } from "@/types/productDetail";
import { formatToRupiah } from "@/hooks/useConvertRupiah";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductDetailShopProps } from "@/types/shop";

// const images = [TestImage, Image1, Image3, Image2, Image5];

interface ProductDescriptionProps {
  productDetail: ProductDetailProps;
  shopDetail: ProductDetailShopProps;
}

const getMinDuration = (product: ProductDetailProps) => {
  if (product.daily_price) return "1 Hari";
  if (product.weekly_price) return "1 Minggu";
  if (product.monthly_price) return "1 Bulan";
  return "Tidak ada durasi";
};

const ProductDescription = ({
  productDetail,
  shopDetail,
}: ProductDescriptionProps) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  console.log("product detail image"+productDetail.images)

  return (
    <div className="flex flex-col lg:flex-row w-full lg:w-2/3 h-auto max-h-auto md:mt-[60px] shadow-sm md:shadow-none rounded-md ">
      <div className="w-full lg:max-w-[406px] lg:w-1/2">
        <Carousel className="w-full md:hidden max-w-lg h-full justify-self-center">
          <CarouselContent>
            {Array.isArray(productDetail.images) &&
              productDetail &&
              productDetail.images.map((src, index) => (
                <CarouselItem key={index} className="relative w-full  h-[300px]">
                  <Image
                    key={index}
                    src={src || TestImage.src}
                    alt={`Image ${index + 1}`}
                    width={406}
                    height={406}
                    className="object-contain"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        <div className="hidden w-full xl:max-w-[406px] md:flex md:flex-col">
          <Image
            src={productDetail.images[selectedIndex] || TestImage.src}
            alt={`product-image-${selectedIndex}`}
            width={406}
            height={403}
            className="bg-slate-400 w-[350px] xl:w-[400px] h-[300px] rounded-md object-fit"
          />

          <div className="flex mt-[14px] py-[6.5px] space-x-[13px]">
            {Array.isArray(productDetail.images) &&
              productDetail &&
              productDetail.images.map((src, index) => (
                <Image
                  key={index}
                  src={src || TestImage.src}
                  alt={`thumbnail-${index}`}
                  width={406}
                  height={406}
                  className={`w-[40px] h-[40px] xl:w-[70px] xl:h-[70px] rounded-md object-cover cursor-pointer ${
                    index === selectedIndex ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="w-full xl:w-full xl:max-w-[381px] pt-2 px-[10px] md:px-0 flex-flex-col lg:pl-20 xl:pl-4 lg:justify-self-center  xl:ml-[46.5px]">
        <div className="flex flex-col space-y-2">
          <h2 className="text-[16px] xl:text-[24px] text-color-primary font-medium">
            {productDetail.name || "Product Name"}
          </h2>
          <div className="flex">
            <div className="flex items-center space-x-[6px] border-r-[1px] border-r-[#D9D9D9] pr-2">
              <Image
                src={Star}
                alt="star"
                className="w-[12px] h-[11px] lg:w-[17.6px] lg:h-[16px]"
              />
              <h4 className="font-jakartaSans font-normal text-[10px] lg:text-[12px] ">
                {productDetail.rating || "rating"}
              </h4>
            </div>
            <h4 className="px-2 text-[10px] xl:text-[12px] text-color-primary font-normal border-r-[1px] border-r-[#D9D9D9]">
              <span className="font-semibold ">
                {productDetail.rented_times || "100"}
              </span>{" "}
              kali tersewa
            </h4>
            <h4 className="px-2 text-[10px] xl:text-[12px] text-color-primary font-normal">
              <span className="font-semibold ">
                {productDetail.buy_times || "10"}
              </span>{" "}
              terjual
            </h4>
          </div>
          <h2 className="text-[12px] xl:text-[20px] font-normal text-color-primary">
            <span className="text-[16px] xl:text-[30px] text-color-secondary font-bold">
              {formatToRupiah(productDetail.daily_price || "100000")}
            </span>{" "}
            /hari
          </h2>
        </div>

        <div className="mt-6 w-full">
          <Tabs
            defaultValue="detail"
            className="w-full md:max-w-[311px] rounded-none"
          >
            <TabsList className="w-full border-y-[1px] border-y-[#D9D9D9] justify-start">
              <TabsTrigger
                value="detail"
                className="px-[17.5px] xl:text-[16px]"
              >
                Detail
              </TabsTrigger>
              <TabsTrigger value="info-penting" className="xl:text-[16px]">
                Info Penting
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="detail"
              className="flex flex-col mt-3 p-3 space-y-4"
            >
              <div className="flex space-x-2">
                <Image src={Jam} alt="jam" className="w-[16px] h-[16px]" />
                <h3 className="text-[12px] xl:text-[14px] text-color-primary font-normal">
                  Min. Durasi Sewa:{" "}
                  <span className="font-bold">
                    {getMinDuration(productDetail)}
                  </span>
                </h3>
              </div>
              <div className="flex space-x-2">
                <Image src={Box} alt="jam" className="w-[16px] h-[16px]" />
                <h3 className="text-[12px] xl:text-[14px]  text-color-primary font-normal">
                  Min. Jumlah Sewa:{" "}
                  <span className="font-bold">{productDetail.min_rented}</span>
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-2 mb-3">
                  <Image src={Coin} alt="jam" className="w-[16px] h-[16px]" />
                  <h3 className="text-[12px] xl:text-[14px] text-color-primary font-normal">
                    Harga Sewa
                  </h3>
                </div>
                <ul className="pl-8 space-y-2 text-color-primary text-[12px] xl:text-[14px] font-normal list-disc list-inside ">
                  <li>
                    Harian:{" "}
                    <span className="font-bold">
                      {formatToRupiah(productDetail.daily_price || "100000")}
                    </span>
                  </li>
                  <li>
                    Mingguan:{" "}
                    <span className="font-bold">
                      {formatToRupiah(productDetail.weekly_price || "100000")}
                    </span>
                  </li>
                  <li>
                    Bulanan:{" "}
                    <span className="font-bold">
                      {formatToRupiah(productDetail.monthly_price || "100000")}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                {productDetail.rnb && (
                  <>
                    {" "}
                    <div className="flex space-x-2 mb-3">
                      <Image
                        src={Special}
                        alt="jam"
                        className="w-[16px] h-[16px]"
                      />
                      <h3 className="text-[12px] xl:text-[14px] text-color-primary font-normal">
                        Fitur Special
                      </h3>
                    </div>
                    <ul className="pl-8 space-y-2 text-color-primary text-[12px] xl:text-[14px] font-normal list-disc list-inside ">
                      <div className="flex space-x-2 items-center">
                        <TooltipProvider>
                          <li>Rent to Buy</li>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Image
                                src={TooltipIcon}
                                alt="tooltip"
                                className="hover:opacity-70 cursor-pointer"
                              />
                            </TooltipTrigger>
                            <TooltipContent className="bg-white border-[1px] border-color-primary rounded-sm">
                              <p className="text-[12px] text-color-secondary">
                                Barang Bisa Dibeli Setelah Masa Sewa Selesai
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </ul>
                  </>
                )}
              </div>
            </TabsContent>
            <TabsContent
              value="info-penting"
              className="flex flex-col px-3 space-y-4 items-start justify-start"
            >
              <h2 className="text-sm text-color-primary px-3 mb-10">
                {productDetail.description || "Tidak Ada Info Penting. . ."}
              </h2>
            </TabsContent>
          </Tabs>
        </div>
        <div className="hidden lg:block pr-[46.5px]">
          {shopDetail && <ShopAndLocation shopDetail={shopDetail} />}
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
