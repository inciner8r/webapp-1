import React, { useState } from 'react';
import { DeleteReview } from './Delete_Review';
import { ReviewCreated } from '../graphql/types';

interface ReviewCardProps {
  metaData: {
    name: string;
    description: string;
    category: string;
    image: string;
    domainAddress: string;
    siteUrl: string;
    siteType: string;
    siteTag: string;
    siteSafety: string;
    ipfsUrl: string;
    id: string;
  } | null;
  MyReviews?: boolean;
  review?: ReviewCreated;
  onReviewDeleted?: () => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ metaData, MyReviews = false, onReviewDeleted }) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!metaData) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="w-full h-72 p-5 bg-center bg-cover" style={{ display: "flex", alignItems: "center" }}>
          <div className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"></div>
        </div>
      </div>
    );
  }

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleDelete = () => {
    if (onReviewDeleted) {
      onReviewDeleted(); // Call the callback function when a review is deleted
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="w-full h-full p-5 bg-gradient-to-r from-black via-gray-900 to-black shadow-xl shadow-green-400/30 bg-center bg-cover rounded-lg shadow-md">
        <div className="flex flex-col h-full justify-between">
  
          <div>
            {showDescription ? (
              <div>
                <h3 className="text-2xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">{metaData.name}</h3>
                <div className="mt-5 text-white">
                  <p>{metaData.description}</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">{metaData.name}</h3>
                <p className='mt-4 bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold text- rounded-lg p-2'>
                  <a href={metaData.siteUrl}>{metaData.domainAddress}</a>
                </p>
  
                <div className='grid grid-rows-2 grid-flow-col gap-4 mt-6 text-center'>
                  <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.category}</button>
                  <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteSafety}</button>
                  <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteTag}</button>
                  <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteType}</button>
                </div>
              </div>
            )}
          </div>
  
          <button
            className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5"
            onClick={handleClick}
          >
            {showDescription ? 'Go Back' : 'Read More'}
          </button>
          
          <div>
            {MyReviews && metaData.ipfsUrl ? (
              <>
                <DeleteReview uri={metaData.ipfsUrl} id={metaData.id} onDelete={handleDelete} />
              </>
            ) : null}
          </div>
  
        </div>
      </div>
    </div>
  );

  
};

export default ReviewCard;

/*
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="w-full h-full p-5 bg-gradient-to-r from-blue-900 via-gray-900 to-blue-900 shadow-xl shadow-blue-400/30 bg-center bg-cover rounded-lg shadow-md">
        <div className="flex flex-col h-full justify-between">
  
          <div>
            {showDescription ? (
              <div>
                <h3 className="text-2xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-200 to-blue-600 font-bold mb-2">{metaData.name}</h3>
                <div className="mt-5 text-white">
                  <p>{metaData.description}</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-200 to-blue-600 font-bold mb-2">{metaData.name}</h3>
                <p className='mt-4 bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold text- rounded-lg p-2'>
                  <a href={metaData.siteUrl}>{metaData.domainAddress}</a>
                </p>
  
                <div className='grid grid-rows-2 grid-flow-col gap-4 mt-6 text-center'>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.category}</button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteSafety}</button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteTag}</button>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteType}</button>
                </div>
              </div>
            )}
          </div>
  
          <button
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5"
            onClick={handleClick}
          >
            {showDescription ? 'Go Back' : 'Read More'}
          </button>
          
          <div>
            {MyReviews && metaData.ipfsUrl ? (
              <>
                <DeleteReview uri={metaData.ipfsUrl} id={metaData.id} onDelete={handleDelete} />
              </>
            ) : null}
          </div>
  
        </div>
      </div>
    </div>
  );
*/