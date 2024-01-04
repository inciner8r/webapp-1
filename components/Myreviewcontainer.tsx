// ReviewContainer.tsx
import React from 'react';
import MyReviewCard from './Myreviewcard';

interface MyReviewContainerProps {
  metaDataArray: any[];
  // MyReviews?: boolean;
}

const MyReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray}) => {

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
        className="container mx-auto px-4" style={{ overflowY: 'auto', maxHeight: '500px' }}
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
          >
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="py-2 flex">
                <MyReviewCard
                  metaData={metaData}
                  // MyReviews={MyReviews}
                  onReviewDeleted={handleReviewDeleted}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyReviewContainer;
