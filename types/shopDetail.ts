import { ErrorSchema } from "./errorSchema";
import { ProductType } from "./product";

export interface ShopDetailProps {
  error_schema: ErrorSchema;
  output_schema: ShopDetail;
}

export interface ShopDetail {
  id: string;
  name: string;
  description: string;
  email: string;
  shop_status: string;
  image: string;
  street: string;
  district: string;
  regency: string;
  province: string;
  post_code: string;
  customer_id: string;
  rating: number;
  total_reviewed_times: number;
  products: PagedProduct;
  work_hours: string
}

export interface PagedProduct {
  content: ProductType[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}


