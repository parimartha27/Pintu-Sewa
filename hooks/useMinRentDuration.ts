import { ProductDetailProps } from "../types/productDetail";

export function getMinDuration (product: ProductDetailProps) {
  if (product.daily_price) return "1 Hari";
  if (product.weekly_price) return "1 Minggu";
  if (product.monthly_price) return "1 Bulan";
  return "Tidak ada durasi";
};