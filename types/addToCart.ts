import { ErrorSchema } from "./errorSchema";

export interface AddToCartRequestProps{
    customer_id: string;
    product_id: string;
    quantity: number;
    start_rent_date: string; 
    end_rent_date: string;   
}

export interface AddToCartResponse{
    error_schema: ErrorSchema;
    output_schema: AddToCartResponseProps
}

export interface AddToCartResponseProps {
    cart_id:string;
  }

