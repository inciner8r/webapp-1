// ReviewContainer.tsx
import React from 'react';
import MyVpnCardDedicated from './MyvpncardDedicated';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean;
}

const VpnContainerDedicated: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {

  const handleReviewDeleted = () => {
    window.location.reload();
  };

  const renderNoReviewsFound = () => (
    <div
      className="w-full text-center py-10"
      
    >
      <h2 className="text-4xl font-semibold text-gray-700">No Dedicated VPNs</h2>
    </div>
  );

  return (
    <>
      <div
        className="container mx-auto py-2"
        
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            
          >
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="py-2 flex">
                <MyVpnCardDedicated
                  metaData={metaData}
                  MyReviews={MyReviews}
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

export default VpnContainerDedicated;