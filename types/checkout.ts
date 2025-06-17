import { ErrorSchema } from "./errorSchema";

export interface CheckoutRequestProps {
  transaction_id: string;
}

export interface CheckoutResponseProps {
  error_schema: ErrorSchema;
  output_schema: TransactionResponseProps;
}

export interface TransactionResponseProps {
  transactions: TransactionProps[];
  sub_total_product_price: number;
  sub_total_shipping_cost: number;
  sub_total_deposit: number;
  service_fee: number;
  grand_total_payment: number;
}

export interface TransactionProps {
  shop_id: string;
  shop_name: string;
  rented_items: RentedItemProps[];
  deposit: number;
  shipping_partner: string;
  shipping_price: number;
  total_rented_product: number;
  total_price: number;
  reference_number: string;
}

export interface RentedItemProps {
  transaction_id: string;
  product_id: string;
  product_name: string;
  price: number;
  start_rent_date: string;  
  end_rent_date: string;
  rent_duration: string;
  quantity: number;
  available_to_rent: boolean;
  image:string
  sub_total_price: number;
}

export interface checkoutFromCartResponseProps {
  error_schema: ErrorSchema;
  output_schema: {
    transaction_ids: string[];
  };
}
