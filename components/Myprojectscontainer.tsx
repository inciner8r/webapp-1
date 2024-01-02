// ReviewContainer.tsx
import React from 'react';
import MyProjectsCard from './Myprojectscard';

interface MyReviewContainerProps {
  metaDataArray: any[];
  // MyReviews?: boolean;
}

const MyProjectsContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray}) => {

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
        className="container mx-auto px-4 py-8"
        
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            
          >
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="py-2 flex">
                <MyProjectsCard
                  metaData={metaData}
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

export default MyProjectsContainer;
