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
    <motion.div
      className="w-full text-center py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-semibold text-gray-700">No Reviews Found</h2>
    </motion.div>
  );

  return (
    <>
      <motion.div
        className="container mx-auto lg:px-32 md:px-10 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {metaDataArray.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {metaDataArray.map(({ metaData, transactionHash }, index) => {
              // Find the corresponding review based on transactionHash
              const matchingReview = reviews.find(review => review.transactionHash === transactionHash);
              console.log("matchingData",matchingReview);

              if (matchingReview) {
                return (
                  <motion.div key={index} className="py-2 flex">
                    <ReviewCard
                      metaData={metaData}
                      reviews={matchingReview}
                      MyReviews={MyReviews}
                      onReviewDeleted={handleReviewDeleted}
                    />
                  </motion.div>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ReviewContainer;
