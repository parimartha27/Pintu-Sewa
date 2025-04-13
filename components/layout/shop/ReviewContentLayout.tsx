import ReviewContent from "@/components/fragments/shop/ReviewContent";
import ReviewFilter from "@/components/fragments/shop/ReviewFilter";
import { ShopReviewProps } from "@/types/shopDetail";

interface ShopReviewContentProps{
  shopReview: ShopReviewProps[]
  loading: boolean
}

const ReviewContentLayout = ({shopReview, loading}: ShopReviewContentProps) => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <ReviewFilter />
      <ReviewContent shopReview={shopReview} loading={loading} />
    </div>
  );
};

export default ReviewContentLayout;
