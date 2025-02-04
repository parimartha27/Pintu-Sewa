"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Mobil from "../../../public/kategori/Mobil.svg";
import PakaianPria from "../../../public/kategori/Pakaian Pria.svg";
import AlatPertukangan from "../../../public/kategori/Alat Pertukangan.svg";
import BoardGame from "../../../public/kategori/Board Game.svg";
import Elektronik from "../../../public/kategori/Elektronik.svg";
import Motor from "../../../public/kategori/Motor.svg";
import AlatKesehatan from "../../../public/kategori/Alat Kesehatan.svg";
import PeralatanSekolah from "../../../public/kategori/Peralatan Sekolah.svg";
import Komputer from "../../../public/kategori/Komputer.svg";
import AkunSubskripsi from "../../../public/kategori/Account Subscription.svg";
import PeralatanBayi from "../../../public/kategori/Peralatan Bayi.svg";
import Furniture from "../../../public/kategori/Furniture.svg";
import AlatOlahraga from "../../../public/kategori/Alat Olahraga.svg";
import Handphone from "../../../public/kategori/Handphone.svg";
import PeralatanRumah from "../../../public/kategori/Peralatan Rumah.svg";
import PakaianWanita from "../../../public/kategori/Pakaian Wanita.svg";

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

export function Category() {
  return (
    <>
      <div className="shadow-lg pt-4 hidden md:block mx-auto bg-sla max-w-[1000px] w-full">

        <div className="flex flex-wrap justify-center gap-6 px-4">
        
          {categories.map((category, index) => (
            <div key={index} className="w-[100px]">
              <div className="h-auto mx-auto mb-1 flex flex-col items-center">
                <Button className="bg-custom-gradient-tr p-2 rounded-sm shadow-md h-[80px] w-[80px] flex items-center justify-center hover:opacity-70 hover:transition hover:duration-100 hover:ease-in-out">
                  <Image
                    src={category.icon}
                    width={40}
                    height={40}
                    alt={category.name}
                    className="object-contain max-w-[40px] max-h-[40px]"
                  />
                </Button>
                <h3 className="text-center text-color-primary text-[14px] font-normal mt-2">
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
