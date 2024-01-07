"use client"
import React, { useState } from "react";
import Link from "next/link";
import StarRatingshow from "./StarRatingshow";

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
  } | null;
  MyReviews?: boolean;
  // review?: ReviewCreated;
  onReviewDeleted?: () => void;
}

const background = {
  backgroundColor: "#222944",
};

const color = {
  color: "#788AA3",
};

const border = {
  border: "1px solid #11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const MyReviewCard: React.FC<ReviewCardProps> = ({
  metaData,
  reviews,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!metaData) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
        
      >
        <div
          className="w-full h-72 p-5 bg-center bg-cover"
          style={{ display: "flex", alignItems: "center" }}
        >
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
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"
      
    >
      <div
        className="w-full h-full p-10 bg-center bg-cover rounded-lg"
        // shadow-xl shadow-green-400/30 shadow-md
        style={background}
      >
        <div
          className="flex flex-col h-full justify-between"
         
        >
          <Link href={`/reviews/${metaData.domainAddress}`}>
            <div>
              {showDescription ? (
                <div>
                  <h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                    
                  >
                    {metaData.name}
                  </h3>
                  <div className="mt-5 text-white">
                    <p
                     
                    >
                      {metaData.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                   
                  >
                    <div className="flex gap-6">
                      {
                       reviews?.name ? (
                        <div>{reviews?.name}</div>
                       ): (
                        <div>{reviews?.voter.slice(0, 4)}...{reviews?.voter.slice(-4)}</div>
                        
                       )}
                      <div className="-mt-4">
                        {metaData.siteRating && (
                          <div className="mt-4">
                            <StarRatingshow
                              totalStars={10}
                              rating={metaData.siteRating}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </h3>

                  <div
                    className="mt-4"
                   
                  >
                    <button className="text-white text-lg rounded-lg pr-1">
                      {metaData.siteType} /
                    </button>
                    <button className="text-white text-lg rounded-lg pr-1">
                      {metaData.category} /
                    </button>
                    <button className="text-white text-lg rounded-lg pr-1">
                      {metaData.siteSafety} /
                    </button>
                    <button className="text-white text-lg rounded-lg pr-1">
                      {metaData.siteTag}
                    </button>
                  </div>

                  <div className="mt-5 text-white text-lg">
                    <p
                     
                    >
                      &quot;{metaData.description}&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MyReviewCard;
