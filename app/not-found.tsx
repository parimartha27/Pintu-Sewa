"use client"

import Image from "next/image";
import Link from "next/link";
import ErrorImage from "../public/errorPage.svg";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-8 relative overflow-hidden">
      <div className="bg-custom-circle-gradient-bl w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]">
        <Image
          src={ErrorImage}
          alt="errorImage"
          layout="responsive"
          width={300}
          height={200}
          className="w-full h-auto"
        />
        <h4 className="text-color-primary xl:text-[20px] lg:text-[16px] sm:text-[14px] text-[12px] font-semibold text-center mt-4">
          Halaman yang dituju tidak tersedia
        </h4>

        <Button className="w-[200px] lg:w-[300px] mt-7 h-[50px] rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80">
          <Link href={"/"}>Kembali ke Dashboard</Link>
        </Button>
      </div>

      <div className="bg-custom-circle-gradient-br w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default ErrorPage;
