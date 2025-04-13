import { ErrorSchema } from "./errorSchema";
import { ProductCardProps } from "./productCard";

export interface ShopDetailHeaderProps {
  error_schema: ErrorSchema;
  output_schema: ShopHeaderProps;
}

export interface ShopDetailReviewProps {
  error_schema: ErrorSchema;
  output_schema: {
    content: ShopReviewProps[];
  };
}

export interface ShopDetailPagedProductProps {
  error_schema: ErrorSchema;
  output_schema: { content: ProductCardProps[] ,
    current_page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
  };
}

export interface ShopHeaderProps {
  id: string;
  name: string;
  description: string;
  image: string;
  street: string;
  district: string;
  regency: string;
  province: string;
  post_code: string;
  work_hours: string;
  rating: string;
}

export interface ShopReviewProps {
  username: string;
  comment: string;
  images: string[];
  rating: number;
  created_at: string;
  product_image: string;
  product_name: string;
  user_profile: string;
}

