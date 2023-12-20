// ReviewContainer.tsx
import React from 'react';
import AllReportsCard from './AllReportsCard';
import { motion } from 'framer-motion';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
}

const AllReportsContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {

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
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <motion.div
            className=""
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {metaDataArray?.map((metaData, index) => (
              <motion.div key={index} className="py-2 flex">
                <AllReportsCard
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

export default AllReportsContainer;
