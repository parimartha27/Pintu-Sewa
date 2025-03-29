import ReviewContent from "@/components/fragments/shop/ReviewContent";
import ReviewFilter from "@/components/fragments/shop/ReviewFilter";

const ReviewContentLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <ReviewFilter />
      <ReviewContent />
    </div>
  );
};

export default ReviewContentLayout;
