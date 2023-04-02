Fix issue in ReviewCard.tsx to render DeleteReview if MyReviews is true:

## /home/adimis/Desktop/Netsepio/webapp/src/Components/delete_review.tsx
// /home/adimis/Desktop/Netsepio/webapp/src/Components/delete_review.tsx
import React from 'react';
import { ReviewCreated } from '../graphql/types';
import { deleteMyReview } from '../modules/delete_my_review';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';

interface DeleteReviewProps {
  review: ReviewCreated;
  onDelete: () => void;
}

export const DeleteReview: React.FC<DeleteReviewProps> = ({ review, onDelete }) => {
  const handleDeleteReview = async () => {
    const ipfsUrl = createIpfsUrl(review.metadataURI);
    const metadata = await fetchMetadataFromIPFS(ipfsUrl);
    
    if (metadata) {
      const success = await deleteMyReview(review.id);
      if (success) {
        onDelete();
      } else {
        console.error('Error deleting review');
      }
    } else {
      console.error('Error fetching metadata from IPFS');
    }
  };

  return (
    <button onClick={handleDeleteReview}>
      Delete Review
    </button>
  );
};

## /home/adimis/Desktop/Netsepio/webapp/src/Components/ReviewCard.tsx
import React, { useState } from 'react';
import { DeleteReview } from './delete_review';

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
  } | null;
  MyReviews?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ metaData, MyReviews = false }) => {
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

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="w-full h-full p-5 bg-gradient-to-r from-black via-gray-900 to-black shadow-xl shadow-green-400/30 bg-center bg-cover rounded-lg shadow-md">
        <div className="flex flex-col h-full justify-between">

          <div>
            {showDescription ? (
              <div>
                <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">{metaData.name}</h3>
                <div className="mt-5 text-white">
                  <p>{metaData.description}</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">{metaData.name}</h3>
                <p className='mt-8 bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold text- rounded-lg p-2'>
                  <a href={metaData.siteUrl}>{metaData.domainAddress}</a>
                </p>

                <div className='grid grid-rows-2 grid-flow-col gap-4 mt-10 text-center'>
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
            {MyReviews ? (
              <DeleteReview/>
            ) : (
              <div>
              </div>
            )}
          </div>         


        </div>
      </div>
    </div>
  );
};

export default ReviewCard;