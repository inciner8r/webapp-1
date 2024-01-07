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
          <div style={{backgroundColor: '#30385F'}} className=' rounded-2xl mx-6'
          >
            <div className="flex uppercase px-10 text-sm pt-8" style={{color:'#98A8BE'}}>
            <div className="w-1/4">Website name</div>
            <div className="w-1/4">URL</div>
            <div className="w-1/4">Feedback</div>
            <div className="w-1/4">
              <div className="text-right">Delete</div>
            </div>
            </div>
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="flex">
                <MyReviewCard
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

export default MyReviewContainer;
