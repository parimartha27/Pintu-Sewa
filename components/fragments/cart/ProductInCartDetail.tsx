"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Delete from "@/public/delete.svg";
import ProductImage from "@/public/productTest.jpeg";
import { useState } from "react";
import { CartItemProps } from "@/types/cart";
import { formatToRupiah } from "@/hooks/useConvertRupiah";

const ProductInCartDetail = ({ cartItem }: { cartItem: CartItemProps }) => {
  const [qty, setQty] = useState<number>(cartItem.quantity);
  const [max] = useState<number>(cartItem.stock);
  const isAvailable = cartItem.available_to_rent;

  function handleDecreaseQty() {
    if (qty > 1) setQty(qty - 1);
  }

  function handleIncreaseQty() {
    if (qty < max) setQty(qty + 1);
  }

  return (
    <div
      className={`flex flex-col lg:flex-row lg:flex-wrap lg:justify-between mb-6 lg:lg-3 pt-6 lg:pt-3 border-t-[1px] border-t-[#D9D9D9] ${
        !isAvailable ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="flex space-x-8 w-[300px]">
        <div className="flex space-x-4">
          <Checkbox disabled={!isAvailable} />
          <Image
            width={88}
            height={88}
            src={cartItem.image || ProductImage}
            alt="product"
            className={`w-[60px] h-[60px] xl:w-[88px] xl:h-[88px] min-w-[60px] min-h-[60px] xl:min-w-[88px] xl:min-h-[88px] object-fit rounded-md ${
              !isAvailable ? "grayscale" : ""
            }`}
          />
        </div>
        <div className="flex flex-col space-y-2 lg:w-[200px]">
          <h2
            className="text-color-primary text-[16px] font-semibold text-wrap max-w-[100px] md:max-w-[200px] lg:max-w-[250px] truncate"
            title={cartItem.product_name}
          >
            {cartItem.product_name || "Nama Produk"}
          </h2>
          <h2 className="text-color-primaryDark text-[14px] sm:text-base font-semibold max-w-[160px] truncate sm:max-w-[180px] md:max-w-[220px] lg:max-w-[260px] xl:max-w-[300px]">
            {formatToRupiah(cartItem.price) || "Rp 500.000"}
          </h2>
          {!isAvailable && (
            <p className="text-color-grayPrimary text-[14px] font-medium text-opacity-70">
              Produk tidak tersedia untuk disewa
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-16 mt-10 lg:mt-0">
        <div className="flex flex-col space-y-1 md:space-y-3 w-[300px]">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Periode Sewa
          </h2>
          <h2 className="text-color-primary text-[14px] md:space-y-3">
            {cartItem.start_rent_date && cartItem.end_rent_date
              ? `${cartItem.start_rent_date} - ${cartItem.end_rent_date}`
              : "28 Januari 2025 - 28 Februari 2025"}
          </h2>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-3">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Durasi Sewa
          </h2>
          <h2 className="text-color-primary text-[14px]">
            {cartItem.rent_duration || "x BULAN"}
          </h2>
        </div>
        <div className="flex flex-col space-y-1 md:space-y-3">
          <h2 className="text-color-primary text-[14px] font-semibold">
            Quantity <span className="text-xs text-color-grayPrimary text-opacity-80 font-normal">(maks:{cartItem.stock})</span>
          </h2>
          <div
            className={`flex space-x-[7px] xl:space-x-3 px-2.5 py-3 items-center border-[1px] border-[#73787B] bg-transparent w-full max-w-[60px] xl:max-w-[72px] h-[20px] rounded-sm ${
              !isAvailable ? "pointer-events-none opacity-50" : ""
            }`}
          >
            <button onClick={handleDecreaseQty} className="hover:opacity-75">
              -
            </button>
            <h4 className="block text-[12px] text-color-primary">{qty}</h4>
            <button
              onClick={handleIncreaseQty}
              className="mb-[2px] hover:opacity-75"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flex self-end lg:self-start space-x-2 mt-6 lg:mt-1 hover:font-semibold hover:cursor-pointer max-w-[70px] ${
          !isAvailable ? "pointer-events-none" : ""
        }`}
      >
        <Image src={Delete} alt="delete" />
        <h2 className="text-color-primary text-[14px] mr-[6px]">Hapus</h2>
      </div>
    </div>
  );
};

export default ProductInCartDetail;
