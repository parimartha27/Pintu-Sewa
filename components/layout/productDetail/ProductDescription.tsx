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
import Image4 from "@/public/register.svg";
import Image5 from "@/public/login.svg";
import Star from "@/public/star.svg";
import Jam from "@/public/jam.svg";
import Box from "@/public/box.svg";
import Coin from "@/public/coin.svg";
import Special from "@/public/special.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const images = [Image1, Image2, Image3, Image4, Image5];

const ProductDescription = () => {
  return (
    <div className="flex flex-col w-full h-auto max-h-auto shadow-sm rounded-md">
      <div className="w-full">
        <Carousel className="w-full max-w-lg h-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index} className="relative w-full h-64">
                <Image
                  src={src}
                  alt={`Image ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="w-full pt-2 px-[10px] flex-flex-col">
        <div className="flex flex-col space-y-2">
          <h2 className="text-[16px] text-color-primary font-medium">
            Nama Produk
          </h2>
          <div className="flex">
            <div className="flex items-center space-x-[6px] border-r-[1px] border-r-[#D9D9D9] pr-2">
              <Image src={Star} alt="star" className="w-[12px] h-[11px]" />
              <h4 className="font-jakartaSans font-normal text-[10px]">5.0</h4>
            </div>
            <h4 className="px-2 text-[10px] text-color-primary font-normal border-r-[1px] border-r-[#D9D9D9]">
              <span className="font-semibold ">100</span> kali tersewa
            </h4>
            <h4 className="px-2 text-[10px] text-color-primary font-normal">
              <span className="font-semibold ">10</span> terjual
            </h4>
          </div>
          <h2 className="text-[12px] font-normal text-color-primary">
            <span className="text-[16px] text-color-secondary font-bold">
              Rp 500.000
            </span>{" "}
            /hari
          </h2>
        </div>

        <div className="mt-6 w-full">
          <Tabs
            defaultValue="detail"
            className="w-full max-w-[311px] rounded-none"
          >
            <TabsList className="w-full border-y-[1px] border-y-[#D9D9D9] justify-start">
              <TabsTrigger value="detail" className="px-[17.5px]">
                Detail
              </TabsTrigger>
              <TabsTrigger value="info-penting">Info Penting</TabsTrigger>
            </TabsList>
            <TabsContent
              value="detail"
              className="flex flex-col mt-3 p-3 space-y-4"
            >
              <div className="flex space-x-2">
                <Image src={Jam} alt="jam" className="w-[16px] h-[16px]" />
                <h3 className="text-[12px] text-color-primary font-normal">
                  Min. Durasi Sewa: <span className="font-bold">1 Hari</span>
                </h3>
              </div>
              <div className="flex space-x-2">
                <Image src={Box} alt="jam" className="w-[16px] h-[16px]" />
                <h3 className="text-[12px] text-color-primary font-normal">
                  Min. Jumlah Sewa: <span className="font-bold">1 Buah</span>
                </h3>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-2 mb-3">
                  <Image src={Coin} alt="jam" className="w-[16px] h-[16px]" />
                  <h3 className="text-[12px] text-color-primary font-normal">
                    Harga Sewa
                  </h3>
                </div>
                <ul className="pl-8 space-y-2 text-color-primary text-[12px] font-normal list-disc list-inside ">
                  <li>Harian: <span className="font-bold"> Rp 500.000</span></li>
                  <li>Mingguan: <span className="font-bold"> Rp 500.000</span></li>
                  <li>Bulanan: <span className="font-bold"> Rp 500.000</span></li>
                </ul>
              </div>
              <div className="flex flex-col">
                <div className="flex space-x-2 mb-3">
                  <Image src={Special} alt="jam" className="w-[16px] h-[16px]" />
                  <h3 className="text-[12px] text-color-primary font-normal">
                    Fitur Special
                  </h3>
                </div>
                <ul className="pl-8 space-y-2 text-color-primary text-[12px] font-normal list-disc list-inside ">
                  <li>Rent to Buy</li>
                  <li>Co Renting</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="info-penting">
              Info Penting
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
