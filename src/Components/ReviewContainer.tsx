// ReviewContainer.tsx
import React from 'react';
import ReviewCard from './ReviewCard';
import { motion, AnimatePresence } from 'framer-motion';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {

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
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {metaDataArray.map((metaData, index) => (
              <motion.div key={index} className="py-2 flex">
                <ReviewCard
                  metaData={metaData}
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

export default ReviewContainer;
