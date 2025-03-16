import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import ProductInCartDetail from "@/components/fragments/cart/ProductInCartDetail";

const CartProductForm = () => {
  return (
    <Card className="w-full max-h-auto p-1 pt-4 shadow-lg mt-8 px-6 bg-white">
      <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-0 pt-0">
        <Checkbox />
        <h2 className="text-[16px] font-semibold text-color-primary pb-1">
          Nama Toko
        </h2>
      </CardHeader>
      <CardContent className="mt-3 flex-col p-0">
        <ProductInCartDetail />
        <ProductInCartDetail />
      </CardContent>
    </Card>
  );
};

export default CartProductForm;
