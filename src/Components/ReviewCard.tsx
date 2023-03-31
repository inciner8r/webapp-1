// src/Components/ReviewCard.tsx
import React from 'react';

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
  } | null;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ metaData }) => {
  if (!metaData) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
        <div className="w-full h-72 p-5 bg-center bg-cover" style={{ display: "flex", alignItems: "center" }}>
          <div className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"></div>
        </div>
      </div>
    );
  }

  return (
  <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="w-full h-full p-5 bg-gradient-to-r from-black via-gray-900 to-black shadow-xl shadow-green-400/30 bg-center bg-cover rounded-lg shadow-md">
        <h3 className="text-2xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">{metaData.name}</h3>
        <p className="text-lg text-gray-200 font-bold mb-2 mt-3">{metaData.siteSafety}</p>
        <p className='bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold text- rounded-lg p-2'>
          <a href={metaData.siteUrl}>{metaData.domainAddress}</a>
        </p>
        <p className="my-5 bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold  rounded-lg p-2">{metaData.description}</p>

        <div className='grid grid-rows-2 grid-flow-col gap-4 my-auto text-center'>
          <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.category}</button>
          <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteTag}</button>
          <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteType}</button>
          <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2"><a href={metaData.siteUrl} target='_blank' rel="noreferrer">Visit</a></button>
        </div>
      </div>
  </div>
  );
};

export default ReviewCard;