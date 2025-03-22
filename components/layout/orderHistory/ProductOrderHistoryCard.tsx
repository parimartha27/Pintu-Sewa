import ProductOrderHistoryContent from "@/components/fragments/orderHistory/ProductOrderHistoryContent";
import ProductOrderHistoryHeader from "@/components/fragments/orderHistory/ProductOrderHistoryHeader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface OrderStatusCardProps {
  status: string;
}

const OrderStatusCard = ({ status }: OrderStatusCardProps) => {
  return (
    <Card className="w-full px-4 sm:px-5 py-3">
      <ProductOrderHistoryHeader status={status} />
      <ProductOrderHistoryContent />
      <CardFooter className="flex flex-col sm:flex-row justify-end sm:space-x-3 space-y-2 sm:space-y-0 py-3 px-0 border-t border-t-[#D9D9D9] border-opacity-50">
        <Link href="/cart/checkout" className="text-xs sm:text-sm text-color-secondary font-medium hover:opacity-70">
          Detail Transaksi
        </Link>
        <Button className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-color-primary bg-transparent border border-color-primaryDark hover:bg-slate-200">
          Lacak Produk
        </Button>
      </CardFooter> 
    </Card>
  );
};

export default OrderStatusCard;
