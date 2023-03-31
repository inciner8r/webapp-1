import React from 'react';
import ReviewCard from './ReviewCard';

interface MyReviewContainerProps {
  metaDataArray: any[];
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray }) => {
  return (
    <div>
      {metaDataArray.map((metaData, index) => (
        <ReviewCard key={index} metaData={metaData} />
      ))}
    </div>
  );
};

export default ReviewContainer;
