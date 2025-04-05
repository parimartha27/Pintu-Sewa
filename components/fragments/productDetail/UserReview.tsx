import Image from "next/image";
import Guest from "@/public/guest.svg";
import Star from "@/public/star.svg";
import RegisterImage from "@/public/register.svg";
import { ReviewProps } from "@/types/review";

const UserReview = ({ reviewDetail }: { reviewDetail: ReviewProps }) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="flex space-x-3">
        <Image src={Guest} alt="guest" className="w-8 h-8 lg:w-10 lg:h-10" />
        <div className="flex flex-col">
          <h2 className="text-[12px] lg:text-[16px] text-color-primary font-medium lg:font-semibold">
            {reviewDetail.customer_id}
          </h2>
          <div className="flex space-x-2">
            <div className="flex space-x-1 py-1">
              {[...Array(reviewDetail.rating)].map((_, index) => (
                <Image
                  key={index}
                  src={Star}
                  alt="star"
                  className="w-2 h-2 lg:w-[14px] lg:h-[12.73px]"
                />
              ))}
            </div>
            <h3 className="text-[10px] lg:text-xs text-color-primary mt-1 ">
              XX jam yang lalu
            </h3>
          </div>
        </div>
      </div>

      <h4 className="w-full text-start text-color-primary text-[10px] lg:text-sm py-2">
        {reviewDetail.comment}
      </h4>

      <div className="flex space-x-2">
        {[1, 2, 3].map((index) => (
          <Image
            key={index}
            src={RegisterImage}
            alt="register-image"
            className="w-8 h-8 lg:w-[60px] lg:h-[60px] rounded-md bg-amber-300"
          />
        ))}
      </div>
    </div>
  );
};

export default UserReview;
