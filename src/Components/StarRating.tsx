// StarRating.tsx
import React, { useState } from 'react';

interface StarRatingProps {
  totalStars: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ totalStars, onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{ fontSize: '40px', cursor: 'pointer', color: index < rating ? 'orange' : 'gray' }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
