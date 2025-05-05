import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import ProductInCartDetail from "@/components/fragments/cart/ProductInCartDetail";
import { CartItemProps, ShopCartProps } from "@/types/cart";

interface CartProductFormProps {
  shopCart: ShopCartProps;
  isSelected: boolean;
  selectedCartIds: string[];
  onShopSelect: (shopId: string, checked: boolean) => void;
  onProductSelect: (cartId: string, checked: boolean) => void;
  onDelete: (cartId: string) => void;
  onRefresh: () => void;
}

const CartProductForm = ({
  shopCart,
  isSelected,
  selectedCartIds,
  onShopSelect,
  onProductSelect,
  onDelete,
  onRefresh
}: CartProductFormProps) => {

  const handleShopCheckboxChange = (checked: boolean) => {
    onShopSelect(shopCart.shop_id, checked);
  };

  const handleDelete = (cartId: string) => {
    onDelete(cartId);
  };

  if (shopCart.carts.length === 0) {
    return null;
  }

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
        {shopCart.carts.map((cart: CartItemProps) => (
          <ProductInCartDetail
            key={cart.cart_id}
            cartItem={cart}
            isChecked={selectedCartIds.includes(cart.cart_id)}
            onCheckChange={onProductSelect}
            onDelete={handleDelete}
            onRefresh={onRefresh}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default CartProductForm;
