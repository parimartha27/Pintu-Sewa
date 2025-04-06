import { ErrorSchema } from "./errorSchema";
import { ReviewProps } from "./review";
import { ShopProps } from "./shop";

export interface ProductDetailResponse {
  error_schema: ErrorSchema;
  output_schema: ProductDetailProps;
}

export interface ProductDetailProps {
  id: string;
  name: string;
  category: string;
  rent_category: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  daily_price: number;
  weekly_price: number;
  monthly_price: number;
  description: string;
  condition_description: string;
  stock: number;
  status: "AVAILABLE" | "UNAVAILABLE" | string;
  image: string;
  rating: number;
  rented_times: number;
  buy_times: number;
  shop: ShopProps;
  reviews: ReviewProps[];
  rnb: boolean;
  min_rented:number;
}
