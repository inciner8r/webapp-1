import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { DeleteReview } from "./Delete_Review";
// import { ReviewCreated } from "../graphql/types";
import { motion } from "framer-motion";
import StarRatingshow from "./StarRatingshow";
import eye from '../assets/carbon_view.png';
import {
  FaCopy,
} from "react-icons/fa";

interface ReviewCardProps {
  metaData: {
    vpn_id: string;
    vpn_endpoint: string;
    firewall_endpoint: string;
    vpn_api_port: number;
    vpn_external_port: number;
    dashboard_password: string;
    status: string;
    ID: number;
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

const border = {
  border: "1px solid #11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const MyVpnCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      className="w-full max-w-5xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full lg:p-10 md:p-10 p-4 rounded-lg"
        style={background}
      >
                <div className="w-full px-4 flex justify-between">
                  <motion.h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex">
                      <div>{metaData.vpn_id}</div>
                    </div>
                  </motion.h3>

                  <div className="lg:flex md:flex justify-between">
                    <div className="">
                  <motion.div
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    
                    <button className="text-lg rounded-lg pr-1 text-white">
                       <a href={`https://${metaData.vpn_endpoint}`} target="_blank" style={color2}>
                       Link</a>
                    </button>    
  
                    {/* <button className="text-lg rounded-lg pr-1">
                      {metaData.vpn_api_port} /
                    </button>
                    <button className="text-lg rounded-lg pr-1">
                      {metaData.vpn_external_port} /
                    </button> */}
                  </motion.div>
                  </div>
                  {/* <div className="mt-4 text-white">
                  <button className="text-lg rounded-lg">
                      Status : {metaData.status}
                    </button>
                    </div> */}
              </div>
                  
              <button className="text-lg rounded-lg pr-1 text-white flex">
                       <a href={`https://${metaData.firewall_endpoint}`} target="_blank" style={color2}>
                          Link</a>
                    </button> 

                  <div className="text-white text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img src={eye} onClick={togglePasswordVisibility}/>

                      {showPassword ? (

                        <div className="flex cursor-pointer" onClick={() => {
                          navigator.clipboard.writeText(
                            metaData? metaData.dashboard_password : ''
                          );
                        }}>
                          {metaData.dashboard_password}
                          <FaCopy style={{ marginTop: 6}} className="ml-2" />
                          </div>
                      ) : (
                        <span></span>
                      )}
                    </motion.p>
                    
                  </div>
                </div>
                </div>
    </motion.div>
  );
};

export default MyVpnCard;
