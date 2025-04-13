"use client";

import ShopContentLayout from "@/components/layout/shop/Content";
import ShopHeader from "@/components/fragments/shop/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ShopHeaderSkeleton from "@/components/layout/shop/ShopHeaderSkeleton";
import { ShopDetailHeaderProps, ShopHeaderProps } from "@/types/shopDetail";

const baseUrl = "https://pintu-sewa.up.railway.app/api/shop";

const ShopLayout = () => {
  const { id } = useParams();
  const[shopHeaderData, setShopHeaderData] = useState<ShopHeaderProps>();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopHeaderRes = await axios.get<ShopDetailHeaderProps>(`${baseUrl}/${id}`);
        setShopHeaderData(shopHeaderRes.data.output_schema);
        console.log("Shop Data:", shopHeaderRes);


      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    if(id) fetchShopData();
  },[id])
  
  return (
    <div className="flex flex-col justify-self-center max-w-[1370px] max-h-auto space-y-8 w-full mb-32 p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout">
      {loading ? <ShopHeaderSkeleton /> : <ShopHeader data={shopHeaderData as ShopHeaderProps} />}
      <ShopContentLayout />
      
    </div>
  );
};

export default ShopLayout;
