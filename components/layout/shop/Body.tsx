"use client";

import ShopContentLayout from "@/components/layout/shop/Content";
import ShopHeader from "@/components/fragments/shop/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { ShopProps } from "@/types/shop";
import { ErrorSchema } from "@/types/errorSchema";
import ShopHeaderSkeleton from "@/components/layout/shop/ShopHeaderSkeleton";
import ShopContentSkeleton from "./ShopContentSkeleton";

const baseUrl = "https://pintu-sewa.up.railway.app/api/shop";

interface ShopDetailResponse{
  error_schema: ErrorSchema;
  output_schema: ShopProps;
}

const ShopLayout = () => {
  const { id } = useParams();
  const[shopData, setShopData] = useState<ShopProps>();
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const res = await axios.get<ShopDetailResponse>(`${baseUrl}/${id}`);
        setShopData(res.data.output_schema);
        console.log("Shop Data:", res);
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
      {loading ? <ShopHeaderSkeleton /> : <ShopHeader data={shopData as ShopProps} />}
      
       {loading ? <ShopContentSkeleton/> : <ShopContentLayout data={shopData as ShopProps} />}
      
    </div>
  );
};

export default ShopLayout;
