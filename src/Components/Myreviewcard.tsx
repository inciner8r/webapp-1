import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StarRatingshow from "./StarRatingshow";
import Cookies from "js-cookie";
import eye from '../assets/carbon_view.png';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

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
  const [loading, setLoading] = useState<boolean>(false);

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

  const deletereview = async () => {
    setLoading(true);

    const auth = Cookies.get("platform_token");

    // Extract the last part of the URL
    const urlParts = metaData.ipfsUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    // Join with the prefix "ipfs://"
    const ipfsUrl = `ipfs://${lastPart}`;

    try {
      const formDataObj = new FormData();
      formDataObj.append('metaDataUri', ipfsUrl);

      const formDataObject: { [key: string]: string | File | null } = {};
      formDataObj.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const jsonData = JSON.stringify(formDataObject);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/deleteReview`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        console.log("success")
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
                  >
                    <div className="lg:flex md:flex justify-between">
                    <div className="lg:flex md:flex gap-6">
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
                    <div className="flex gap-4 lg:mt-0 md:mt-0 mt-4">
                    <Link to={`/reviews/${metaData.domainAddress}`}>
                    <img src={eye} alt="info" className="w-6 h-6 mt-1"/>
                    </Link>
                    <button onClick={deletereview}>dlt</button>
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
        </motion.div>
      </div>
      {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
            </div>
          </div>
        </div>)}
    </motion.div>
  );
};

export default MyReviewCard;
