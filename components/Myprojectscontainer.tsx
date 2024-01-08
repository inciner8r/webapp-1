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
        className="container mx-auto px-4 rounded-xl"
        style={{ overflowY: 'auto', maxHeight: '470px', backgroundColor:'#30385F' }}
      >
        {metaDataArray?.length === 0 ? (
          renderNoReviewsFound()
        ) : (
          <div
            
          >
           <div style={{backgroundColor: '#30385F'}} className='rounded-2xl'
          >
            <div className="flex uppercase text-sm pt-8 mb-2 text-left px-8" style={{color:'#98A8BE'}}>
            <div className="w-1/4">Project Name</div>
            {/* <div className="w-1/4 ml-10">Domain Name</div>
            <div className="w-1/4">Category</div> */}
            <div className="w-1/4 text-center">Blockchain</div>
            <div className="w-1/4">
              <div className="text-right">Edit</div>
            </div>
            <div className="w-1/4">
              <div className="text-right">Delete</div>
            </div>
            </div>
            {metaDataArray?.map((metaData, index) => (
              <div key={index} className="flex">
                <MyProjectsCard
                  metaData={metaData}
                  onReviewDeleted={handleReviewDeleted}
                />
              </div>
            ))}
          </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjectsContainer;
