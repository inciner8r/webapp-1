// ReviewContainer.tsx
import React from 'react';
import ReviewCard from './ReviewCard';

interface MyReviewContainerProps {
  metaDataArray: any[];
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metaDataArray.map((metaData, index) => (
          <div key={index} className="py-2 flex">
            <ReviewCard metaData={metaData} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;