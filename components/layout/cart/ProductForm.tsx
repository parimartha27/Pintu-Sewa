import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import ProductInCartDetail from "@/components/fragments/cart/ProductInCartDetail";
import { CartItemProps, ShopCartProps } from "@/types/cart";
import { useState } from "react";

const CartProductForm = ({
  shopCart,
  isSelected,
  selectedCartIds,
  onShopSelect,
  onProductSelect,
}: {
  shopCart: ShopCartProps;
  isSelected: boolean;
  selectedCartIds: string[];
  onShopSelect: (shopId: string, checked: boolean) => void;
  onProductSelect: (cartId: string, checked: boolean) => void;
}) => {
  const [carts, setCarts] = useState<CartItemProps[]>(shopCart.carts);
  const handleShopCheckboxChange = (checked: boolean) => {
    onShopSelect(shopCart.shop_id, checked);
  };

  const handleDelete = (cartId: string) => {
    const updated = carts.filter((c) => c.cart_id !== cartId);
    setCarts(updated);

    // Update localStorage juga
    const storedCartIds = JSON.parse(localStorage.getItem("selectedCartIds") || "[]");
    const updatedCartIds = storedCartIds.filter((id: string) => id !== cartId);
    localStorage.setItem("selectedCartIds", JSON.stringify(updatedCartIds));
  };

 
  return (
    <Card className="w-full max-h-auto p-1 pt-4 shadow-lg mt-8 px-6 bg-white">
      <CardHeader className="w-full flex space-x-4 items-center md:items-center pb-0 pl-0 pt-0">
      <Checkbox
      checked={isSelected}
      onCheckedChange={(checked) => handleShopCheckboxChange(!!checked)}
    />
        <h2 className="text-[16px] font-semibold text-color-primary pb-1">
          {shopCart.shop_name}
        </h2>
      </CardHeader>

      <CardContent className="mt-3 flex-col p-0">
        {carts.map((cart: CartItemProps) => (
            <ProductInCartDetail
            key={cart.cart_id}
            cartItem={cart}
            isChecked={selectedCartIds.includes(cart.cart_id)}
            onCheckChange={onProductSelect}
            onDelete={handleDelete}
          />
        ))}
      </CardContent>
    </Card>
  );
};


export default CartProductForm;
