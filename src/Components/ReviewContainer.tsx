// ReviewContainer.tsx
import React from 'react';
import ReviewCard from './ReviewCard';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {

  const handleReviewDeleted = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {metaDataArray.map((metaData, index) => (
            <div key={index} className="py-2 flex">
              <ReviewCard
                metaData={metaData}
                MyReviews={MyReviews}
                onReviewDeleted={handleReviewDeleted}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewContainer;
