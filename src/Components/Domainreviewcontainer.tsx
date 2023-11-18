// ReviewContainer.tsx
import React from 'react';
import DomainReviewCard from './Domainreviewcard';
import { motion } from 'framer-motion';

interface MyReviewContainerProps {
  metaDataArray: any[];
  reviews: any[];
  MyReviews?: boolean;
}

const MyReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray,reviews, MyReviews = false }) => {

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
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {metaDataArray.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <motion.div
            className=""
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {metaDataArray.map((metaData, index) => (
              <motion.div key={index} className="py-2 flex">
                <DomainReviewCard
                  metaData={metaData}
                  reviews={reviews[index]}
                  MyReviews={MyReviews}
                  onReviewDeleted={handleReviewDeleted}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default MyReviewContainer;
