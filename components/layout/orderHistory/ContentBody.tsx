"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductOrderHistoryCard from "./ProductOrderHistoryCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { transactionBaseUrl } from "@/types/globalVar";
import { OrderHistoryProps, OrderHistoryResponseProps } from "@/types/orderHistory";

const OrderCategory = [
  { value: "semua", label: "Semua" },
  { value: "belum-dibayar", label: "Belum Dibayar" },
  { value: "diproses", label: "Diproses" },
  { value: "dikirim", label: "Dikirim" },
  { value: "sedang-disewa", label: "Sedang Disewa" },
  { value: "dibatalkan", label: "Dibatalkan" },
  { value: "dikembalikan", label: "Dikembalikan" },
  { value: "selesai", label: "Selesai" },
];


const OrderHistoryContentBody = () => {

  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem("customerId");
  const[orderHistoryData, setOrderHistoryData] = useState<OrderHistoryProps[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<OrderHistoryResponseProps>(`${transactionBaseUrl}/customer/${customerId}`);
        console.log("order history content: ",res.data.output_schema);
        setOrderHistoryData(res.data.output_schema);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchData();

  }, []);

  return (
    <div className="w-full mt-[35px]">
      <Tabs defaultValue="semua" className="w-full rounded-none ">
        <Carousel
          opts={{
            dragFree: true,
            containScroll: "keepSnaps",
            align: "start",
          }}
          className="overflow-x-auto scrollbar-hide border-b-[1px] border-[#D9D9D9] border-opacity-50 max-w-[1070px]"
        >
          <CarouselContent>
            {OrderCategory.map((tab) => (
              <CarouselItem key={tab.value} className="basis-auto flex-none">
                <TabsList className="bg-white flex-nowrap whitespace-nowrap">
                  <TabsTrigger
                    value={tab.value}
                    className="px-[17.5px] xl:text-[16px]"
                  >
                    {tab.label}
                  </TabsTrigger>
                </TabsList>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-3">
          {OrderCategory.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="space-y-3">
                {orderHistoryData == null && !loading && (
                  <div className="flex items-center justify-center h-[300px]">
                    <p className="text-2xl font-semibold text-color-secondary">
                      Tidak ada data
                    </p>
                  </div>
                )}
                {orderHistoryData != null && orderHistoryData.map((order) => (
                  <ProductOrderHistoryCard
                    key={order.order_id}
                    orderHistoryProps={order}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default OrderHistoryContentBody;
