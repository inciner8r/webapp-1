You are a frontend developer and you have to find issues in following code that is not letting user's delete their reviews?

## /home/adimis/Desktop/Netsepio/webapp/src/Components/delete_review.tsx
// /home/adimis/Desktop/Netsepio/webapp/src/Components/delete_review.tsx
import React from 'react';
import { deleteMyReview } from '../modules/delete_my_review';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';

interface DeleteReviewProps {
  uri: string;
  id: string;
  onDelete: () => void;
}

export const DeleteReview: React.FC<DeleteReviewProps> = ({ uri, id, onDelete }) => {
  const handleDeleteReview = async () => {
    const ipfsUrl = createIpfsUrl(uri);
    const metadata = await fetchMetadataFromIPFS(ipfsUrl, id);
    
    if (metadata) {
      const success = await deleteMyReview(id);
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
    <button onClick={handleDeleteReview} className='bg-gradient-to-r from-red-700 to-red-500 text-black font-semibold rounded-lg p-2 w-full text-center mt-5'>
      Delete Review
    </button>
  );
};

## /home/adimis/Desktop/Netsepio/webapp/src/modules/delete_my_review.ts
// /home/adimis/Desktop/Netsepio/webapp/src/graphql/delete_my_review.ts
import { client } from '../graphql/client';
import { DELETE_REVIEW } from '../graphql/queries';

export async function deleteMyReview(reviewId: string): Promise<boolean> {
  try {
    await client.mutate({
      mutation: DELETE_REVIEW,
      variables: {
        id: reviewId,
      },
    });
    console.log('Review deleted:', reviewId);
    return true;
  } catch (error) {
    console.error('Error deleting review:', error);
    return false;
  }
}

## /home/adimis/Desktop/Netsepio/webapp/src/Components/ReviewCard.tsx
import React, { useState } from 'react';
import { DeleteReview } from './delete_review';
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
            {MyReviews && metaData.ipfsUrl ? (
              <DeleteReview uri={metaData.ipfsUrl} id={metaData.id} onDelete={() => {}}/>
            ) : null}
          </div>           


        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

## /home/adimis/Desktop/Netsepio/webapp/src/Components/ReviewContainer.tsx
// ReviewContainer.tsx
import React from 'react';
import ReviewCard from './ReviewCard';

interface MyReviewContainerProps {
  metaDataArray: any[];
  MyReviews?: boolean; // added default prop
}

const ReviewContainer: React.FC<MyReviewContainerProps> = ({ metaDataArray, MyReviews = false }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metaDataArray.map((metaData, index) => (
          <div key={index} className="py-2 flex">
            <ReviewCard metaData={metaData} MyReviews={MyReviews} /> {/* passing MyReviews as prop */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewContainer;

## /home/adimis/Desktop/Netsepio/webapp/src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_ALL_REVIEWS_BY_USER = gql`
  query GetAllReviewsByUser($userWalletAddress: String!) {
    reviewCreateds(where: {receiver: $userWalletAddress}) {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    reviewCreateds {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;

export const GET_REVIEWS_BY_SITE_URL = gql`
  query GetReviewsBySiteURL($siteURL: String!) {
    reviewCreateds(where: {domainAddress: $siteURL}) {
      id
      tokenId
      domainAddress
      metadataURI
      receiver
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
    }
  }
`;

## /home/adimis/Desktop/Netsepio/webapp/src/modules/fetch_metadata_from_ipfs.ts
import axios from 'axios';

export async function fetchMetadataFromIPFS(ipfsUrl: string, id: string): Promise<any> {
  try {
    const response = await axios.get(ipfsUrl);
    const data = {
      ...response.data, 
      ipfsUrl: ipfsUrl,
      id: id,      
    }
    console.log('Metadata fetched from IPFS:', data);
    return data;
  } catch (error) {
    console.error('Error fetching metadata from IPFS:', error);
    return null;
  }
}

## /home/adimis/Desktop/Netsepio/webapp/src/modules/fetch_metadata_from_graphql.ts
import { client } from '../graphql/client';
import { GET_ALL_REVIEWS, GET_ALL_REVIEWS_BY_USER, GET_REVIEWS_BY_SITE_URL } from '../graphql/queries';
import { ReviewCreated } from '../graphql/types';

export async function fetchMetadataURIByUser(walletAddress: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_ALL_REVIEWS_BY_USER,
      variables: { userWalletAddress: walletAddress },
    });
    return data.reviewCreateds;
  } catch (error) {
    console.error('Error fetching metadata URI by user:', error);
    return null;
  }
}

export async function fetchMetadataURIAll(): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({ query: GET_ALL_REVIEWS });
    return data.reviewCreateds;
  } catch (error) {
    console.error('Error fetching all metadata URIs:', error);
    return null;
  }
}

export async function fetchMetadataURIBySiteURL(siteURL: string): Promise<ReviewCreated[] | null> {
  try {
    const { data } = await client.query({
      query: GET_REVIEWS_BY_SITE_URL,
      variables: { siteURL },
    });
    return data.reviewCreateds;
  } catch (error) {
    console.error('Error fetching metadata URI by site URL:', error);
    return null;
  }
}
