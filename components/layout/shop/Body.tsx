"use client";

import ShopContentLayout from "@/components/layout/shop/Content";
import ShopHeader from "@/components/fragments/shop/Header";

const ShopLayout = () => {
  return (
    <div className="flex flex-col justify-self-center max-w-[1370px] max-h-auto space-y-8 w-full mb-32 p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout">
      <ShopHeader />
      <ShopContentLayout />
    </div>
  );
};

export default ShopLayout;
