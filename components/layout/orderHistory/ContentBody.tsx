"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductOrderHistoryCard from "./ProductOrderHistoryCard";

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
  return (
    <div className="w-full mt-[35px]">
      <Tabs defaultValue="semua" className="w-full rounded-none ">
        <Carousel
          opts={{
            dragFree: true,
            containScroll: "keepSnaps",
            align: "start",
          }}
          className="overflow-x-auto scrollbar-hide border-b-[1px] border-[#D9D9D9] border-opacity-50 max-w-[1040px]"
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

        <div className="mt-3 max-h-[1200px] overflow-y-auto">
          {OrderCategory.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <div className="space-y-3">
                {Array(12)
                  .fill(null)
                  .map((_, index) => (
                    <ProductOrderHistoryCard
                      key={index}
                      status="Belum Dibayar"
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
