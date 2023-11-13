// StarRating.tsx
import React from 'react';

interface StarRatingProps {
  totalStars: number;
  rating: number;
}

const StarRatingshow: React.FC<StarRatingProps> = ({ totalStars, rating }) => {
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          style={{
            color: index < rating ? 'orange' : 'gray',
            fontSize: '20px'
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRatingshow;
