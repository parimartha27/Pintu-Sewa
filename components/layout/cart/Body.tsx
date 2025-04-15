"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import CartProductForm from "./ProductForm";
import Image from "next/image";
import Next from "@/public/next.svg";
import CartSkeleton from "./CartSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { CartResponseProps, ShopCartProps } from "@/types/cart";
import { cartBaseUrl } from "@/types/globalVar";
import NoCart from "@/public/noCart.svg";
import Link from "next/link";

const CartBody = () => {
  const [shopCartItems, setShopCartItems] = useState<ShopCartProps[]>([]);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRes = await axios.get<CartResponseProps>(
          `${cartBaseUrl}/${customerId}`
        );
        console.log("cart response:", cartRes.data.output_schema);
        setShopCartItems(cartRes.data.output_schema);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto p-2 pt-12 bg-color-layout ">
      <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
        Keranjang Sewa
      </h2>

      {loading && <CartSkeleton />}

      {shopCartItems == null && loading === false ? (
        <div className="flex flex-col space-y-6 w-full justify-center items-center py-20 ">
          <Image className="w-[500px] h-[372px]" src={NoCart} alt="noCart" />
          <div>
            <h2 className="text-color-primary text-xl text-center font-medium">
              Keranjangmu masih kosong. Yuk tambah produk ke keranjang sekarang!
            </h2>
          </div>
          <Button className="w-[200px] lg:w-[300px] mt-7 h-[50px] font-medium rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80">
            <Link href={"/"}>Kembali ke Dashboard</Link>
          </Button>
        </div>
      ) : (
        <>
          <Card className="p-0 mt-4">
            <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-[29px] pt-0 py-[14px]">
              <Checkbox />
              <h2 className="text-[16px] font-semibold text-color-primary pb-1">
                Pilih Semua <span className="font-light">(5)</span>
              </h2>
            </CardHeader>
          </Card>
          <div className="flex flex-col w-full max-h-[400px] overflow-y-scroll space-y-[18px] pb-8 mt-[18px]">
            {shopCartItems.map((item) => (
              <CartProductForm key={item.shop_id} shopCart={item} />
            ))}
          </div>
          <Button onClick={() => alert("checkoutnya nanti ya. . . .")}
           className="flex self-center md:self-end space-x-[10px] w-full max-w-[200px] h-[48px] mt-8 rounded-xl hover:opacity-80 bg-custom-gradient-tr">
            <Image src={Next} alt="next" className="w-5 h-5" />
            <h4 className="text-lg font-medium ">Checkout</h4>
          </Button>
        </>
      )}
    </div>
  );
};

export default CartBody;
