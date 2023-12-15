import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import React from "react";
import eye2 from '../assets/eye2.png';


interface ReviewCardProps {
  metaData: {
    blockchain: string;
    coverImageHash: string;
    createdAt: string;
    category: string;
    description: string;
    domainName: string;
    headline: string;
    logoHash: string;
    title: string;
    verified: boolean;
    creatorName: string;
    id: string;
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

const color2 = {
  color: "#11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const AllProjectsCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
 

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

  return (
    <motion.div
      className="w-full max-w-5xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full lg:p-10 md:p-10 p-4 rounded-lg"
        
      >
            <div>
                <div className="lg:flex m:flex justify-start">
                <div className="w-1/4">
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.logoHash)}`}
                      className=""
                      width="150"
                      height="150"
                    />
                </div>
                <div className="w-full lg:px-4 md:px-4">
                  <motion.h3
                    className="leading-12 mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="lg:flex md:flex justify-between">
                      <div className="text-4xl font-bold">{metaData.title}</div>
                      <div className="mt-4 flex flex-col text-end" style={color}>
                      <div className="text-md rounded-lg">
                      Creator Name : {metaData.creatorName}
                    </div>
                  <div className="text-md rounded-lg">
                      Blockchain : {metaData.blockchain}
                    </div>
                    </div>
                    </div>
                  </motion.h3>

              

              <div style={background} className="p-4 rounded-xl">
                  <div className="lg:flex md:flex justify-between">
                    <div className="">
                  <motion.div
                    className="flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={color}
                  >
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.domainName} /
                    </div>     
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.category}
                    </div>
                  </motion.div>
                  </div>
                  <div className="text-white flex gap-2 text-xs">
                  <Link to={`/reviews/${metaData.domainName.replace(/^https:\/\//, '')}`}>
                  <div className="flex py-2 px-2 gap-1 text-black" style={backgroundbutton}>
                  <img src={eye2} alt="info" className="w-4 h-4"/> View Project
                    </div>
                  </Link>
                    </div>
              </div>
                  

                  <div className="text-lg text-white text-start flex mt-2">
                  <div style={color} className="w-1/5">
                  Headline :  
                  </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-4/5"
                    >
                      {/* Average Rating:  */}
                      
                      {metaData.headline}
                    </motion.p>
                  </div>

                  <div className="text-lg text-white text-start flex mt-2">
                  <div style={color} className="w-1/5">
                  Description : 
                  </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="w-4/5"
                    >
                      {/* Total reviews:  */}
                      
                      {metaData.description}
                    </motion.p>
                  </div>

                  </div>

                </div>
                </div>
            </div>
      </div>
    </motion.div>
  );
};

export default AllProjectsCard;
