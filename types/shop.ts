import { ProductType } from "./product";

export interface ShopProps {
    id: string;
    name: string;
    description: string;
    email: string;
    shop_status: "OPEN" | "CLOSED" | string;
    image: string;
    street: string;
    district: string;
    regency: string;
    province: string;
    post_code: string;
    rating:string;
    total_reviewed_times:number;
    customer_id:string;
    products:ProductType[]
    work_hours:string
  }