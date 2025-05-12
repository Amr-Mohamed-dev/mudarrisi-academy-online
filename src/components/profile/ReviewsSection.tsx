
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface Review {
  id: string;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

interface RatingDetails {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  ratingDetails: RatingDetails;
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewCount,
  ratingDetails,
  reviews,
}) => {
  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="text-center mb-4 md:mb-0">
          <div className="text-4xl font-bold text-blue mb-1">{rating}</div>
          <div className="flex mb-1 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                size={18}
                className={`fill-current ${star <= Math.floor(rating) ? "text-amber" : "text-gray-300"}`}
              />
            ))}
          </div>
          <div className="text-gray-600">{reviewCount} تقييم</div>
        </div>
        
        <div className="flex-1 w-full md:w-auto">
          {[5, 4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center mb-2">
              <div className="w-8 text-sm text-gray-600">{rating}</div>
              <div className="mx-2 flex-1">
                <Progress value={ratingDetails[rating]} className="h-2" />
              </div>
              <div className="w-8 text-sm text-gray-600">{ratingDetails[rating]}%</div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-bold mb-4">آراء الطلاب</h3>
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between mb-2">
                <div className="font-bold">{review.user}</div>
                <div className="text-gray-500 text-sm">{review.date}</div>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={16}
                    className={`fill-current ${star <= review.rating ? "text-amber" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Star = ({ size = 16, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default ReviewsSection;
