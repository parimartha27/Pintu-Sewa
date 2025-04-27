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

  const reviewFilter={
    hasMedia: searcParams.get("hasMedia"),
    rating: searcParams.get("rating"),
    reviewTopics: searcParams.get("reviewTopics"),
  }

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        setLoading(true);
        const shopHeaderRes = await axios.get<ShopDetailHeaderProps>(`${shopBaseUrl}/${id}`);
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
      try {
        const response = await axios.get<ShopDetailReviewProps>(`${shopReviewBaseUrl}/${id}?rating=${reviewFilter.rating}&reviewTopics=${reviewFilter.reviewTopics}&hasMedia=${reviewFilter.hasMedia}`);
        setShopReview(response.data.output_schema.content);
      } catch (error) {
        console.error("Failed to fetch shop data:", error);
      } finally {
        setReviewLoading(false);
      }
    };
    if (id) fetchShopReview();
  }, [id, reviewFilter.hasMedia, reviewFilter.rating, reviewFilter.reviewTopics, searcParams]);

  if (loading) {
    return (
      <div className="flex flex-col justify-self-center max-w-[1370px] w-full p-2 md:p-0 md:px-6 md:pt-12 bg-color-layout mb-32">
        <ShopHeaderSkeleton />
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
