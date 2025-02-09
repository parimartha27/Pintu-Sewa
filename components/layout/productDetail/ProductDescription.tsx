"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";
import Image1 from "@/public/banner1.svg";
import Image2 from "@/public/banner2.svg";
import Image3 from "@/public/banner3.svg";
import Image4 from "@/public/register.svg";
import Image5 from "@/public/login.svg";

const images = [
  Image1,
  Image2,Image3,Image4,Image5
];

const ProductDescription = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full">
        <Carousel className="w-full max-w-lg">
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="w-full">INI DESKRIPSI PRODUK</div>
    </div>
  );
};

export default ProductDescription;
