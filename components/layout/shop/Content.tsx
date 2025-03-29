import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductContentLayout from "./ProductContent";
import ReviewContentLayout from "./ReviewContentLayout";

const ShopContentLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row space-x-6 w-full">
            <Tabs defaultValue="product" className="w-full bg-white">
                <TabsList className="w-full flex space-x-8 lg:space-x-0 justify-center pb-3 lg:pb-0 lg:justify-start bg-white border-b-2 border-[#D9D9D9] border-opacity-50">
                    <TabsTrigger value="product" className="text-lg lg:text-base">Produk</TabsTrigger>
                    <TabsTrigger value="review" className="text-lg lg:text-base">Ulasan</TabsTrigger>
                </TabsList>
                <TabsContent value="product" className="pt-8"><ProductContentLayout/></TabsContent>
                <TabsContent value="review" className="pt-8"><ReviewContentLayout/></TabsContent>
            </Tabs>
        </div>
    );
}

export default ShopContentLayout;