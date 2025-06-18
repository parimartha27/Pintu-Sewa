"use client";

import ShopContentLayout from "@/components/layout/shop/Content";
import ShopHeader from "@/components/fragments/shop/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import ShopHeaderSkeleton from "@/components/layout/shop/ShopHeaderSkeleton";
import { ShopDetailHeaderProps, ShopDetailReviewProps, ShopHeaderProps, ShopReviewProps } from "@/types/shopDetail";
import { shopBaseUrl, shopReviewBaseUrl } from "@/types/globalVar";

const ShopLayout = () => {
  const searcParams = useSearchParams();
  const { id } = useParams();
  const [shopHeaderData, setShopHeaderData] = useState<ShopHeaderProps>();
  const [loading, setLoading] = useState(true);
  const [shopReview, setShopReview] = useState<ShopReviewProps[]>([]);
  const [reviewLoading, setReviewLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
    
      try {
        setLoading(true);
        const shopHeaderRes = await axios.get<ShopDetailHeaderProps>(`${shopBaseUrl}/${id}`);
        console.log("Shop Header:", shopHeaderRes.data.output_schema);
        setShopHeaderData(shopHeaderRes.data.output_schema);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchShopData();
  }, [id]);

  useEffect(() => {
    const fetchShopReview = async () => {
      setReviewLoading(true);
      const reviewFilter = {
        hasMedia: searcParams.get("hasMedia") || "true",
        rating: searcParams.get("rating") || "5",
        // reviewTopics: searcParams.get("reviewTopics"),
      };
  
      try {
        const response = await axios.get<ShopDetailReviewProps>(
          `${shopReviewBaseUrl}/${id}?rating=${reviewFilter.rating}&hasMedia=${reviewFilter.hasMedia}`
        );
        setShopReview(response.data.output_schema.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            console.warn("Tidak Ada Review Untuk Toko Ini");
          } else {
            console.error("Axios error:", error.response?.data || error.message);
          }
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setReviewLoading(false);
      }
    };
  
    if (id) fetchShopReview();
  }, [id, searcParams]);

  if (loading) {
    return (
      <div className="flex flex-col justify-self-center max-w-[1370px] w-full p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout mb-32">
        <ShopHeaderSkeleton />
        <div className="min-h-[300px]"></div>
      </div>
    );
  }

  if (!shopHeaderData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center text-color-primary">
        <p className="text-3xl font-semibold text-color-secondary">Toko Tidak Ada</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-self-center max-w-[1370px] max-h-auto space-y-8 w-full mb-32 p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout">
      <ShopHeader data={shopHeaderData} />
      <ShopContentLayout shopReview={shopReview} loading={reviewLoading} />
    </div>
  );
};

export default ShopLayout;
