"use client";

import Link from "next/link";
import Image from "next/image";
import RegisterImage from "@/public/register.svg";
import Jam from "@/public/jam.svg";
import Location from "@/public/location.svg";
import Star from "@/public/star.svg";
import ProductTest from "@/public/productTest.jpeg";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Tag from "../Elements/Tag";
import Rnb from "../Elements/Rnb";
import { ProductType } from "@/types/product";

const getMinDuration = (product: ProductType) => {
  if (product.daily_price) return "1 Hari";
  if (product.weekly_price) return "1 Minggu";
  if (product.monthly_price) return "1 Bulan";
  return "Tidak ada durasi";
};

const getPrice = (product: ProductType) => {
  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);

  if (product.daily_price) return formatRupiah(product.daily_price);
  if (product.weekly_price) return formatRupiah(product.weekly_price);
  if (product.monthly_price) return formatRupiah(product.monthly_price);

  return "gratis";
};

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div className="p-1 w-full max-w-[200px] md:max-w-[240px] h-full max-h-[300px] md:max-h-[360px]">
      <Link href={"/"}>
        <Card className="hover:bg-slate-100 rounded-lg h-full w-auto shadow-md">
          <CardHeader className="relative h-[120px] md:h-[140px] lg:h-[170px] bg-slate-400 rounded-t-lg">
            <Image
              src={ProductTest}
              alt="register"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </CardHeader>

          <CardTitle className="flex justify-between mt-2 md:mt-3 mx-2 md:mx-3 items-center">
            <h2 className="text-[16px] md:text-[20px] text-color-primary font-semibold">
              {getPrice(product) || "harga product"}
            </h2>
            {product.rnb && <Rnb />}
          </CardTitle>

          <CardContent className="p-2 md:p-3 items-start">
            <h1 className="text-start text-[12px] md:text-[14px] text-color-primary font-medium">
              {product.name.substring(0, 20) + "..." || "nama product"}
            </h1>

            <div className="mt-2 md:mt-3 flex">
              <Image
                className="w-4 h-4 md:w-5 md:h-5 mr-1"
                src={Jam}
                alt="jam"
              />
              <h2 className="text-[10px] md:text-[12px] text-color-primary">
                Durasi - Min. <span>{getMinDuration(product)}</span>
              </h2>
            </div>

            <div className="flex space-x-1 mt-1 md:mt-2">
              {product.daily_price && <Tag>Harian</Tag>}
              {product.weekly_price && <Tag>Mingguan</Tag>}
              {product.monthly_price && <Tag>Bulanan</Tag>}
            </div>
            <div className="flex mt-3">
              <Image
                className="w-4 h-4 md:w-5 md:h-5 mr-1"
                src={Location}
                alt="location"
              />
              <h2 className="text-[10px] md:text-[12px] text-color-primary">
                {product.address || "alamat product"}
              </h2>
            </div>
          </CardContent>

          <div className="h-[0.1px] mx-2 md:mx-3 bg-[#D9D9D9]"></div>

          <CardFooter className="flex justify-between items-end pt-2 md:pt-3 px-2 md:px-3">
            <div className="flex items-center">
              <Image className="w-3 h-3 md:w-4 md:h-4" src={Star} alt="star" />
              <h4 className="text-[8px] md:text-[10px] text-color-primary ml-1">
                {product.rating || "rating product"}
              </h4>
            </div>
            <div className="flex items-center">
              <h4 className="text-[8px] md:text-[10px] text-color-primary">
                {product.rented_times || "rent count"}
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
