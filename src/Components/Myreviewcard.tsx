import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteReview } from "./Delete_Review";
import { ReviewCreated } from "../graphql/types";
import { motion } from "framer-motion";
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
  MyReviews?: boolean;
  review?: ReviewCreated;
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
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);

  if (!metaData) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-full h-72 p-5 bg-center bg-cover"
          style={{ display: "flex", alignItems: "center" }}
        >
          <motion.div
            className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        </div>
      </motion.div>
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
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full p-10 bg-center bg-cover rounded-lg"
        // shadow-xl shadow-green-400/30 shadow-md
        style={background}
      >
        <motion.div
          className="flex flex-col h-full justify-between"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to={`/reviews/${metaData.domainAddress}`}>
            <div>
              {showDescription ? (
                <div>
                  <motion.h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                    // style={color}
                  >
                    {metaData.name}
                  </motion.h3>
                  <div className="mt-5 text-white">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {metaData.description}
                    </motion.p>
                  </div>
                </div>
              ) : (
                <div>
                  <motion.h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                    // style={color}
                  >
                    <div className="flex gap-6">
                      <div>{metaData.name}</div>
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
                  </motion.h3>
                  <motion.p
                    className="mt-4 rounded-lg"
                    style={color}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <a href={metaData.siteUrl}>
                      {/* {metaData.domainAddress} */}
                      {metaData.siteUrl}
                    </a>
                  </motion.p>

                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
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
                  </motion.div>

                  <div className="mt-5 text-white text-lg">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      "{metaData.description}"
                    </motion.p>
                  </div>
                </div>
              )}
            </div>
          </Link>

          <div>
            {MyReviews && metaData.ipfsUrl ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <DeleteReview
                  uri={metaData.ipfsUrl}
                  id={metaData.id}
                  onDelete={handleDelete}
                />
              </motion.div>
            ) : null}
          </div>

          {/* <motion.button
          className="text-white font-semibold rounded-lg p-2 w-full text-center mt-5"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={border}
        >
          {showDescription ? 'Go Back' : 'Read More'}
        </motion.button> */}
        </motion.div>
        {/* </Link> */}
      </div>
    </motion.div>
  );
};

export default MyReviewCard;
