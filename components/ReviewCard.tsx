import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StarRatingshow from "./StarRatingshow";
import eye from '../public/carbon_view.png';
import asnft from '../public/asnft.png';

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
    siteRating: number;
    ipfsUrl: string;
    id: string;
  } | null;
  reviews: {
    name: string;
    voter: string;
    transactionHash: string;
  } | null;
  MyReviews?: boolean;
  // review?: ReviewCreated;
  onReviewDeleted?: () => void;
}

const background = {
  // backgroundColor: '#222944',
  // boxShadow: '0 0 5px rgba(0, 166, 143, 0.5)'
  boxShadow: '10px 10px 10px 0px #000', 
}

const color = {
  color: '#11D9C5'
}

const border = {
  border: '1px solid #11D9C5',
}

const backgroundbutton = {
  backgroundColor: '#11D9C5'
}

const ReviewCard: React.FC<ReviewCardProps> = ({ metaData,reviews, MyReviews = false, onReviewDeleted }) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!metaData) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
      >
        <div className="w-full h-72 p-5 bg-center bg-cover" style={{ display: "flex", alignItems: "center" }}>
          <div
            className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"
          ></div>
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
  <div
    className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
  >
    <div className="w-full h-full p-5 bg-center bg-cover rounded-lg"
    style={background}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          {showDescription ? (
            <div>
              <h3
                className="text-2xl leading-12 font-bold mb-2"
                style={color}
              >
                {metaData.name}
              </h3>
              <div className="mt-5 text-white">
                <p>
                  {metaData.description}
                </p>
              </div>
            </div>
          ) : (
            <div>
<div className="justify-end flex">
<Link href={`/reviews/${metaData.domainAddress.replace(/^https:\/\//, '').replace(/^www\./, '')}`}>
<Image src={eye} alt="info" className=""/>
</Link>
</div>

{ metaData.siteRating && 
              (<div className="mt-4">
              <StarRatingshow totalStars={10} rating={metaData.siteRating} /></div>)
}

<div className="flex gap-2 mt-4">
<h3
                className="text-lg leading-12 mb-2 text-white"
                // style={color}
              >
                {
                       reviews?.name ? (
                        <div>{reviews?.name}</div>
                       ): (
                        <div>{reviews?.voter.slice(0, 2)}..{reviews?.voter.slice(-2)}</div>
                        
                       )}
                
              </h3>

              <div className="text-white text-lg">reviewed</div>

              <h3
                className="text-lg leading-12 mb-2"
                style={color}
              >
                <Link href={`/reviews/${metaData.domainAddress.replace(/^https:\/\//, '').replace(/^www\./, '')}`}>
                {/* <a href={metaData.siteUrl} target="_blank"> */}
                  <div>
                  {metaData.name}
                  </div>
                  {/* </a> */}
                </Link>
                
              </h3>
              </div>

<div className="mt-5 text-white">
                <p>
                  "{metaData.description}"
                </p>
              </div>
            </div>  
          )}
        </div>
        <Link href={`https://explorer.aptoslabs.com/txn/${reviews?.transactionHash}/?network=testnet`} target="_blank">
              <button className="mt-10 text-white flex gap-1 py-2 px-2 text-xs rounded-md" style={{backgroundColor:'#11D9C580'}}><Image src={asnft} alt="" className="w-4 h-4"/>Review as NFT</button>
        </Link>

      </div>
    </div>
   
  </div>
);

  
};

export default ReviewCard;