"use client"

import Link from "next/link";
import Image from "next/image";
import RegisterImage from "../../public/register.svg";
import Jam from "../../public/jam.svg";
import Location from "../../public/location.svg";
import Star from "../../public/star.svg";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tag from "../Elements/Tag";
import Rnb from "../Elements/Rnb";

/*
    Attribute:
    - Gambar
    - Harga
    - RNB or not
    - Nama produk
    - Durasi - Min. xx hari
    - Tag IsDaily IsWeekly IsMonthly
    - Location
    - Rating
    - berapa kali tersewa
  */

    interface ProductCardProps{
      productName: string
    }

const ProductCard = ({productName} : ProductCardProps) => {
  return (
    <div className="p-1 w-full max-w-[200px] md:max-w-[240px] h-full max-h-[300px] md:max-h-[360px]">
      <Link href={"/"}>
        <Card className="hover:bg-slate-100 rounded-lg h-full w-auto shadow-lg">
          <CardHeader className="h-[120px] md:h-[140px] lg:h-[170px] bg-slate-400 rounded-t-lg flex items-center justify-center">
            <Image
              src={RegisterImage}
              className="w-full h-full max-w-[200px] md:max-w-[240px] max-h-[120px] md:max-h-[167px] object-cover"
              alt="register"
            />
          </CardHeader>

          <CardTitle className="flex justify-between mt-2 md:mt-3 mx-2 md:mx-3 items-center">
            <h2 className="text-[16px] md:text-[20px] text-color-primary font-semibold">
              Rp 1.350.000
            </h2>
            <Rnb />
          </CardTitle>

          <CardContent className="p-2 md:p-3 items-start">
            <h1 className="text-start text-[12px] md:text-[14px] text-color-primary font-medium">
              {productName}
            </h1>

            <div className="mt-2 md:mt-3 flex">
              <Image
                className="w-4 h-4 md:w-5 md:h-5 mr-1"
                src={Jam}
                alt="jam"
              />
              <h2 className="text-[10px] md:text-[12px] text-color-primary">
                Durasi - Min. <span>1 Hari</span>
              </h2>
            </div>

            <div className="flex space-x-1 mt-1 md:mt-2">
              <Tag>Harian</Tag>
              <Tag>Mingguan</Tag>
              <Tag>Bulanan</Tag>
            </div>
            <div className="flex mt-3">
              <Image
                className="w-4 h-4 md:w-5 md:h-5 mr-1"
                src={Location}
                alt="location"
              />
              <h2 className="text-[10px] md:text-[12px] text-color-primary">
                Jakarta Utara
              </h2>
            </div>
          </CardContent>

          <div className="h-[0.1px] mx-2 md:mx-3 bg-[#D9D9D9]"></div>

          <CardFooter className="flex justify-between items-end pt-2 md:pt-3 px-2 md:px-3">
            <div className="flex items-center">
              <Image className="w-3 h-3 md:w-4 md:h-4" src={Star} alt="star" />
              <h4 className="text-[8px] md:text-[10px] text-color-primary ml-1">
                5.0
              </h4>
            </div>
            <div className="flex items-center">
              <h4 className="text-[8px] md:text-[10px] text-color-primary">
                100
              </h4>
              <h4 className="text-[8px] md:text-[10px] text-color-primary ml-1">
                Kali Tersewa
              </h4>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCard;
