import { REVIEW_IMG } from "../../constants";
import { ReviewModelType } from "../../types";
import { reviewContainer } from "./Styles";

interface Review {
  each: ReviewModelType;
}

const Review: React.FC<Review> = ({ each }) => {
  return (
    <div className={reviewContainer}>
      <p className="min-w-[40px]">
        <img src={REVIEW_IMG} className="h-[40px] w-[40px] rounded-full" />
      </p>
      <div className="flex flex-col gap-2">
        <p className="text-black">{each.name}</p>
        <p className="text-gray-400 text-[12px]">
          by Ashoka T • 06/20/2019 at 6:43 PM
        </p>
        <p className="text-gray-400 text-[12px]">{each.review}</p>
      </div>
    </div>
  );
};

export default Review;