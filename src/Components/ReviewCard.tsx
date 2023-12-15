import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { DeleteReview } from './Delete_Review';
// import { ReviewCreated } from '../graphql/types';
import { motion } from 'framer-motion';
import StarRatingshow from "./StarRatingshow";
import eye from '../assets/carbon_view.png';

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
      <motion.div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-72 p-5 bg-center bg-cover" style={{ display: "flex", alignItems: "center" }}>
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
    className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="w-full h-full p-5 bg-center bg-cover rounded-lg"
    // shadow-xl shadow-green-400/30 shadow-md
    style={background}
    >
      <motion.div className="flex flex-col h-full justify-between" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.4 }}>
    {/* <Link to={`/reviews/${metaData.domainAddress.replace(/^https:\/\//, '')}`}> */}
        <div>
          {showDescription ? (
            <div>
              <motion.h3
                className="text-2xl leading-12 font-bold mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
                style={color}
              >
                {metaData.name}
              </motion.h3>
              <div className="mt-5 text-white">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  {metaData.description}
                </motion.p>
              </div>
            </div>
          ) : (
            <div>
<div className="justify-end flex">
<Link to={`/reviews/${metaData.domainAddress.replace(/^https:\/\//, '').replace(/^www\./, '')}`}>
<img src={eye} alt="info" className=""/>
</Link>
</div>

{ metaData.siteRating && 
              (<div className="mt-4">
              <StarRatingshow totalStars={10} rating={metaData.siteRating} /></div>)
}

<div className="flex gap-2 mt-4">
<motion.h3
                className="text-lg leading-12 mb-2 text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
                // style={color}
              >
                {
                       reviews?.name ? (
                        <div>{reviews?.name}</div>
                       ): (
                        <div>{reviews?.voter.slice(0, 2)}..{reviews?.voter.slice(-2)}</div>
                        
                       )}
                
              </motion.h3>

              <div className="text-white text-lg">reviewed</div>

              <motion.h3
                className="text-lg leading-12 mb-2"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4 }}
                style={color}
              >
                <Link to={`/reviews/${metaData.domainAddress.replace(/^https:\/\//, '').replace(/^www\./, '')}`}>
                {/* <a href={metaData.siteUrl} target="_blank"> */}
                  <div>
                  {metaData.name}
                  </div>
                  {/* </a> */}
                </Link>
                
              </motion.h3>
              </div>
              {/* <motion.p className='mt-4 bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold text- rounded-lg p-2' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <a href={metaData.siteUrl}>{metaData.domainAddress}</a>
              </motion.p> */}

              {/* <motion.div className='grid grid-rows-2 grid-flow-col gap-4 mt-6 text-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.category}</button>
                <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteSafety}</button>
                <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteTag}</button>
                <button className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2">{metaData.siteType}</button>
              </motion.div> */}

<div className="mt-5 text-white">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                  "{metaData.description}"
                </motion.p>
              </div>
            </div>
          )}
        </div>

        {/* </Link> */}

        {/* <div>
          {MyReviews && metaData.ipfsUrl ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <DeleteReview uri={metaData.ipfsUrl} id={metaData.id} onDelete={handleDelete} />
            </motion.div>
          ) : null}
        </div> */}

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

export default ReviewCard;