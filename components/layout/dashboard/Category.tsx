"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Mobil from "@/public/Kategori/Mobil.svg";
import PakaianPria from "@/public/Kategori/Pakaian Pria.svg";
import AlatPertukangan from "@/public/Kategori/Alat Pertukangan.svg";
import BoardGame from "@/public/Kategori/Board Game.svg";
import Elektronik from "@/public/Kategori/Elektronik.svg";
import Motor from "@/public/Kategori/Motor.svg";
import AlatKesehatan from "@/public/Kategori/Alat Kesehatan.svg";
import PeralatanSekolah from "@/public/Kategori/Peralatan Sekolah.svg";
import Komputer from "@/public/Kategori/Komputer.svg";
import AkunSubskripsi from "@/public/Kategori/Account Subscription.svg";
import PeralatanBayi from "@/public/Kategori/Peralatan Bayi.svg";
import Furniture from "@/public/Kategori/Furniture.svg";
import AlatOlahraga from "@/public/Kategori/Alat Olahraga.svg";
import Handphone from "@/public/Kategori/Handphone.svg";
import PeralatanRumah from "@/public/Kategori/Peralatan Rumah.svg";
import PakaianWanita from "@/public/Kategori/Pakaian Wanita.svg";
import Banner1 from "@/public/banner1.svg";
import Banner2 from "@/public/banner2.svg";
import Banner3 from "@/public/banner3.svg";

const categories = [
  { name: "Mobil", icon: Mobil },
  { name: "Pakaian Pria", icon: PakaianPria },
  { name: "Alat Tukang", icon: AlatPertukangan },
  { name: "Board Game", icon: BoardGame },
  { name: "Elektronik", icon: Elektronik },
  { name: "Motor", icon: Motor },
  { name: "Alat Kesehatan", icon: AlatKesehatan },
  { name: "Peralatan Sekolah", icon: PeralatanSekolah },
  { name: "Komputer", icon: Komputer },
  { name: "Akun Subskripsi", icon: AkunSubskripsi },
  { name: "Peralatan Bayi", icon: PeralatanBayi },
  { name: "Furniture", icon: Furniture },
  { name: "Alat Olahraga", icon: AlatOlahraga },
  { name: "Gadget", icon: Handphone },
  { name: "Peralatan Rumah", icon: PeralatanRumah },
  { name: "Pakaian Wanita", icon: PakaianWanita },
];

const Category = () => {
  return (
    <>
      <div className="hidden md:block w-full max-h-[400px] mt-5 lg:mt-10 rounded-sm overflow-hidden">
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-h-[400px]"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {[Banner1, Banner2, Banner3].map((banner, index) => (
              <CarouselItem key={index} className="w-full max-h-[400px]">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={banner}
                    alt={`Banner ${index + 1}`}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-sm"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <h3 className="hidden md:block mt-0 lg:mt-20 mb-5 pb-2 text-xl lg:text-[24px] font-jakartaSans font-semibold text-color-primaryDark">
        Kategori
      </h3>
      <div className="py-4 hidden md:block mx-auto max-w-[1280px] w-full mb-10">
        <div className="flex flex-wrap justify-start gap-x-12 gap-y-7 md:justify-center lg:justify-start">
          {categories.map((category, index) => (
            <div key={index} className="w-[100px] mr-3">
              <div className="h-auto mx-auto mb-1 flex flex-col items-center">
                <Link href={""}>
                  <Button className="bg-custom-gradient-tr p-2 rounded-sm shadow-md h-[60px] lg:h-[80px] w-[60px] lg:w-[80px] flex items-center justify-center hover:opacity-70 hover:transition hover:duration-100 hover:ease-in-out">
                    <Image
                      src={category.icon}
                      width={40}
                      height={40}
                      alt={category.name}
                      className="object-contain max-w-[30px] max-h-[30px] lg:max-w-[80px] lg:max-h-[80px]"
                    />
                  </Button>
                </Link>

                <h3 className="text-center text-color-primary text-[14px] font-medium mt-2">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Carousel (hidden di desktop) */}
      <div className="w-full shadow-lg pt-4 md:hidden">
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: "auto",
          }}
        >
          <CarouselContent className="-ml-1">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="basis-[auto] w-[80px]">
                <div className="max-h-[100px] h-auto w-[60px] mx-auto mb-2 flex flex-col items-center">
                  <Button className="bg-custom-gradient-tr p-2 rounded-xs h-[35px] w-[35px] flex-col items-center justify-center flex hover:opacity-70">
                    <Image
                      src={category.icon}
                      width={40}
                      height={20}
                      alt={category.name}
                      className="max-w-[30px] w-full max-h-[20px] h-full"
                    />
                  </Button>
                  <h3 className="text-center text-color-primary text-[9px] font-normal mt-2">
                    {category.name}
                  </h3>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Grid untuk desktop
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {categories.map((category, index) => (
          <div key={index} className="h-[60px] w-[60px] mx-auto lg:h-[80px] lg:w-[80px]">
            <Button className="bg-custom-gradient-tr rounded-xs max-h-[100px] h-full max-w-[100px] w-full flex-col items-center justify-center flex hover:opacity-70">
              <Image
                src={category.icon}
                width={30}
                height={30}
                alt={category.name}
                className="max-w-[50px] w-full max-h-[25px] h-full lg:max-w-[60px] lg:max-h-[30px]"
              />
            </Button>
            <h4 className="text-center text-[12px] lg:text-[14px] font-normal mt-1">
              {category.name}
            </h4>
          </div>
        ))}
      </div> */}
    </>
  );
}

export default Category;
