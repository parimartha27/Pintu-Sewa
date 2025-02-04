import Link from "next/link";
import Image from "next/image";
import RegisterImage from "../../public/register.svg";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

const ProductCard = () => {
  return (
    <div className="p-1 w-1/2  bg-slate-200">
      <Link href={"/"}>
        <Card className="hover:bg-slate-200 rounded ">
          <CardHeader className="bg-slate-400 rounded-t-lg">
            <Image
              src={RegisterImage}
              width={100}
              height={100}
              alt="register"
            />
          </CardHeader>
          <CardTitle className="flex justify-between mt-3 mx-3 items-center">
            <h2 className="text-[14px] font-bold">Rp 1.000.000</h2>
            <h2 className="text-[8px] font-bold bg-color-secondary text-white p-1 rounded-sm">RnB</h2>
          </CardTitle>
          <CardContent className="mt-3 items-start" >
            <h1 className="text-start ">Nama Produk</h1>
            <div className="flex">
                <h2>icon</h2>
                <h2>Durasi - x hari</h2>
            </div>
          </CardContent>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Link>
    </div>
  );
};

export default ProductCard;
