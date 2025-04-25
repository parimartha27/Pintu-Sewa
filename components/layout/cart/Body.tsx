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
import { useRouter } from "next/navigation";

const CartBody = () => {
  const router = useRouter();
  const [shopCartItems, setShopCartItems] = useState<ShopCartProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCartIds, setSelectedCartIds] = useState<string[]>([]);
  const [totalProductInCart, setTotalProductInCart] = useState<number>(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Tambahkan state untuk initial load
  const customerId = typeof window !== "undefined" ? localStorage.getItem("customerId") : null;
  const hasSelectedItems = selectedCartIds.length > 0;
  // Load initial data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartRes = await axios.get<CartResponseProps>(
          `${cartBaseUrl}/${customerId}`
        );
        const shops = cartRes.data.output_schema.shops;
        console.log("SHOPS:"  , shops);
        setShopCartItems(shops);
        setTotalProductInCart(cartRes.data.output_schema.total_product_cart);
        
        // Load selectedCartIds dari localStorage setelah data dimuat
        const storedCartIds = JSON.parse(
          localStorage.getItem("selectedCartIds") || "[]"
        );
        
        // Validasi storedCartIds terhadap data yang baru di-load
        const allIds = shops.flatMap(shop => shop.carts.map(cart => cart.cart_id));
        const validCartIds = storedCartIds.filter((id: string) => allIds.includes(id));
        
        setSelectedCartIds(validCartIds);
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      } finally {
        setLoading(false);
        setIsInitialLoad(false); // Tandai bahwa initial load selesai
      }
    };

    if (customerId) {
      fetchCartData();
    }
  }, [customerId]);

  // Sync selectedCartIds ke localStorage (kecuali saat initial load)
  useEffect(() => {
    if (!isInitialLoad && typeof window !== "undefined") {
      localStorage.setItem("selectedCartIds", JSON.stringify(selectedCartIds));
    }
  }, [selectedCartIds, isInitialLoad]);

  // Calculate derived states
  const allCartIds = shopCartItems.flatMap((shop) =>
    shop.carts.map((cart) => cart.cart_id)
  );
  const isAllSelected =
    allCartIds.length > 0 &&
    allCartIds.every((id) => selectedCartIds.includes(id));
  const selectedShopIds = shopCartItems
    .filter((shop) =>
      shop.carts.every((cart) => selectedCartIds.includes(cart.cart_id))
    )
    .map((shop) => shop.shop_id);

  const handleSelectAll = (checked: boolean) => {
    setSelectedCartIds(checked ? allCartIds : []);
  };

  const handleShopSelect = (shopId: string, checked: boolean) => {
    const shop = shopCartItems.find((s) => s.shop_id === shopId);
    if (!shop) return;

    const shopCartIds = shop.carts.map((c) => c.cart_id);
    setSelectedCartIds((prev) =>
      checked
        ? [...new Set([...prev, ...shopCartIds])]
        : prev.filter((id) => !shopCartIds.includes(id))
    );
  };

  const handleProductSelect = (cartId: string, checked: boolean) => {
    setSelectedCartIds((prev) =>
      checked ? [...prev, cartId] : prev.filter((id) => id !== cartId)
    );
  };

  const handleDeleteCartItem = (deletedCartId: string) => {
    setSelectedCartIds(prev => prev.filter(id => id !== deletedCartId));
    setShopCartItems(prev => 
      prev
        .map(shop => ({
          ...shop,
          carts: shop.carts.filter(cart => cart.cart_id !== deletedCartId)
        }))
        .filter(shop => shop.carts.length > 0)
    );
  };

  const handleCheckout = () => {
    const payload = selectedCartIds.map((id) => ({ cart_id: id }));
    router.push("/cart/checkout");
  };

  return (
    <div className="flex flex-col mx-auto w-full max-w-[1280px] min-h-screen h-auto p-2 pt-12 bg-color-layout">
      <h2 className="w-full text-xl md:text-2xl font-semibold text-color-primary">
        Keranjang Sewa
      </h2>

      {loading && <CartSkeleton />}

      {shopCartItems == null && loading === false ? (
        <div className="flex flex-col space-y-6 w-full justify-center items-center py-20">
          <Image className="w-[500px] h-[372px]" src={NoCart} alt="noCart" />
          <h2 className="text-color-primary text-xl text-center font-medium">
            Keranjangmu masih kosong. Yuk tambah produk ke keranjang sekarang!
          </h2>
          <Button className="w-[200px] lg:w-[300px] mt-7 h-[50px] font-medium rounded-xl text-[12px] lg:text-[16px] xl:text[18px] bg-custom-gradient-tr hover:opacity-80">
            <Link href={"/"}>Kembali ke Dashboard</Link>
          </Button>
        </div>
      ) : (
        <>
          <Card className="p-0 mt-4">
            <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-[29px] pt-0 py-[14px]">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => handleSelectAll(!!checked)}
              />
              <h2 className="text-[16px] font-semibold text-color-primary pb-1">
                Pilih Semua{" "}
                <span className="font-light">
                  ({totalProductInCart || "NaN"})
                </span>
              </h2>
            </CardHeader>
          </Card>

          <div className="flex flex-col w-full space-y-[18px] pb-8 mt-[18px]">
            {shopCartItems.map((item) => (
              <CartProductForm
                key={item.shop_id}
                shopCart={item}
                isSelected={selectedShopIds.includes(item.shop_id)}
                selectedCartIds={selectedCartIds}
                onShopSelect={handleShopSelect}
                onProductSelect={handleProductSelect}
                onDelete={handleDeleteCartItem}
              />
            ))}
          </div>

          <Button
          disabled={!hasSelectedItems}
            onClick={() => {
              localStorage.setItem("checkoutFrom", "cart");
              router.push("/cart/checkout")
            
            }}
            className={`flex self-center md:self-end space-x-[10px] w-full max-w-[200px] h-[48px] mt-8 mb-[210px] rounded-xl hover:opacity-80 bg-custom-gradient-tr ${
              !hasSelectedItems ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Image src={Next} alt="next" className="w-5 h-5" />
            <h4 className="text-lg font-medium">Checkout</h4>
          </Button>
        </>
      )}
    </div>
  );
};

export default CartBody;
