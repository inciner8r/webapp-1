// ReviewContainer.tsx
import React from 'react';
import ReviewCard from './ReviewCard';
import { motion } from 'framer-motion';

interface MyReviewContainerProps {
  metaDataArray: any[];
  reviews: any[];
  MyReviews?: boolean;
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, reviews, MyReviews = false }) => {

  const handleReviewDeleted = () => {
    window.location.reload();
  };

  const renderNoReviewsFound = () => (
    <div
      className="w-full text-center py-10"
    >
      <h2 className="text-4xl font-semibold text-gray-700">No Reviews Found</h2>
    </div>
  );

  return (
    <>
      <div
        className="container mx-auto py-8"
      >
        {metaDataArray.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                gap: '2rem',
                // '@media (min-width: 768px)': {
                //   gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                // },
                // '@media (min-width: 1024px)': {
                //   gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                // },
                // '@media (min-width: 1280px)': {
                //   gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                // },
              }}
          >
            {metaDataArray.map(({ metaData, transactionHash }, index) => {
              // Find the corresponding review based on transactionHash
              const matchingReview = reviews.find(review => review.transactionHash === transactionHash);
              console.log("matchingData",matchingReview);

              if (matchingReview) {
                return (
                  <div key={index} className="py-2 flex">
                    <ReviewCard
                      metaData={metaData}
                      reviews={matchingReview}
                      MyReviews={MyReviews}
                      onReviewDeleted={handleReviewDeleted}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewContainer;
