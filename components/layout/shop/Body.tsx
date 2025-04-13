"use client";

import ShopContentLayout from "@/components/layout/shop/Content";
import ShopHeader from "@/components/fragments/shop/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import ShopHeaderSkeleton from "@/components/layout/shop/ShopHeaderSkeleton";
import { ShopDetailHeaderProps, ShopDetailReviewProps, ShopHeaderProps, ShopReviewProps } from "@/types/shopDetail";
import { shopBaseUrl, shopReviewBaseUrl } from "@/types/globalVar";

const ShopLayout = () => {
  const { id } = useParams();
  const[shopHeaderData, setShopHeaderData] = useState<ShopHeaderProps>();
  const[loading, setLoading] = useState(true);
  const [shopReview, setShopReview] = useState<ShopReviewProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shopHeaderRes = await axios.get<ShopDetailHeaderProps>(`${shopBaseUrl}/${id}`);
        setShopHeaderData(shopHeaderRes.data.output_schema);
        console.log("Shop Data:", shopHeaderRes);

        const shopReviewRes = await axios.get<ShopDetailReviewProps>(
          `${shopReviewBaseUrl}/${id}?rating=4&hasMedia=true`
        );
        setShopReview(shopReviewRes.data.output_schema.content);


      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setLoading(false);
        setReviewLoading(false)
      }
    };
    if(id) fetchShopData();
  },[id])
  
  return (
    <div className="flex flex-col justify-self-center max-w-[1370px] max-h-auto space-y-8 w-full mb-32 p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout">
      {loading ? <ShopHeaderSkeleton /> : <ShopHeader data={shopHeaderData as ShopHeaderProps} />}
      <ShopContentLayout shopReview={shopReview} loading={reviewLoading}/>
      
    </div>
  );
};

export default ShopLayout;
