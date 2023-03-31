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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{metaData.name}</h3>
      <p>{metaData.description}</p>
      <p>Category: {metaData.category}</p>
      {/*<img src={metaData.image} alt={metaData.name} />*/}
      <p>Domain Address: {metaData.domainAddress}</p>
      {/*<p>Site URL: {metaData.siteUrl}</p>*/}
      <p>Site Type: {metaData.siteType}</p>
      <p>Site Tag: {metaData.siteTag}</p>
      <p>Site Safety: {metaData.siteSafety}</p>
    </div>
  );
};

export default ReviewCard;
