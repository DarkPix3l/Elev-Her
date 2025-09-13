'use client';

import { Star } from 'lucide-react';

export default function StarRating({ totalStars = 5, size = 24, averageRating = 0 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const filled = index < Math.floor(averageRating);
        const halfFilled = index < averageRating && index >= Math.floor(averageRating);

        return (
          <Star
            key={index}
            size={size}
            className={`${
              filled
                ? 'fill-black text-black'
                : halfFilled
                  ? 'fill-black text-gray-300'
                  : 'text-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}
