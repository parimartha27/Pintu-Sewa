import { ErrorSchema } from "./errorSchema";

export interface OrderHistoryResponseProps {
  error_schema: ErrorSchema;
  output_schema: OrderHistoryProps[];
}

export interface OrderHistoryProps {
  order_id: string;
  status: string;
  transaction_date: string;
  reference_number: string;
  shop: Shop;
  products: Product[];
  total_price: number;
  total_deposit: number;
  shipping_partner: string;
  shipping_price: number;
}

export interface Shop {
  id: string;
  name: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  image: string;
  start_date: string;
  end_date: string;
  sub_total: number;
}
