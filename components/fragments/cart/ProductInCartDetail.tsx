"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Delete from "@/public/delete.svg";
import ProductImage from "@/public/productTest.jpeg";
import { useState } from "react";

const ProductInCartDetail = () => {
  const [qty, setQty] = useState<number>(1);
  const [max] = useState<number>(8);

  function handleDecreaseQty() {
    if (qty > 1) setQty(qty - 1);
  }

  function handleIncreaseQty() {
    if (qty < max) setQty(qty + 1);
  }

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between mb-6 lg:mb-3 pt-6 lg:pt-3 border-t-[1px] border-t-[#D9D9D9] ">
      <div className="flex space-x-8">
        <div className="flex space-x-4 ">
          <Checkbox />
          <Image
            src={ProductImage}
            alt="product"
            className="w-[60px] h-[60px] xl:w-[88px] xl:h-[88px] rounded-md"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-color-primary text-[16px] font-semibold">
            Nama Produk
          </h2>
          <h2 className="text-color-primaryDark text-[16px] font-semibold">
            Rp 500.000
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-8 lg:space-x-16 mt-10 md:mt-0">
        <div className="flex flex-col space-y-1 md:space-y-3">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Periode Sewa
          </h2>
          <h2 className="text-color-primary text-[14px] md:space-y-3">
            28 Januari 2025 - 28 Februari 2025
          </h2>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-3">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Durasi Sewa
          </h2>
          <h2 className="text-color-primary text-[14px]">1 Bulan</h2>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-3">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Quantity
          </h2>
          <div className="flex space-x-[7px] xl:space-x-3 px-2.5  py-3 items-center border-[1px] border-[#73787B] bg-transparent w-full max-w-[60px] xl:max-w-[72px] h-[20px] rounded-sm">
            <button onClick={handleDecreaseQty} className="hover:opacity-75 ">
              -
            </button>
            <h4 className=" block text-[12px] text-color-primary">{qty}</h4>
            <button
              className="mb-[2px] hover:opacity-75 "
              onClick={handleIncreaseQty}
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="flex self-end lg:self-start space-x-2 mt-6 lg:mt-1 hover:font-semibold hover:cursor-pointer max-w-[70px] ">
        <Image src={Delete} alt="delete" />
        <h2 className="text-color-primary text-[14px] mr-[6px]">
          Hapus
        </h2>
      </div>
    </div>

    
  );
};

export default ProductInCartDetail;
