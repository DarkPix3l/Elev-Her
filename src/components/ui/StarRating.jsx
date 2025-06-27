'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function StarRating({ totalStars = 5, size = 24 }) {
  const [rating, setRating] = useState(0)

  return (
    <div className="flex gap-1">
      {Array.from({ length: totalStars }, (_, index) => {
        const isFilled = index < rating
        return (
          <Star
            key={index}
            size={size}
            className={`cursor-pointer ${isFilled ? 'fill-black text-black' : 'text-gray-300'}`}
            onClick={() => setRating(index + 1)}
          />
        )
      })}
    </div>
  )
}
