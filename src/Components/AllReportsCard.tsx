import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import StarRatingshow from "./StarRatingshow";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";
import { NFTStorage } from "nft.storage";
import vote from '../assets/mdi_vote.png';
import upvote from '../assets/thumb_up.png';
import downvote from '../assets/thumb_down.png';
import notsure from '../assets/Question.png';
import doc from '../assets/Blank_alt_fill.png';
import edit from '../assets/editpen.png';
import dlt from '../assets/dlt.png';
import replace from '../assets/replace.png';
import {
  FaCopy,
} from "react-icons/fa";
import emoji from '../assets/EmojiMessage.png';
const API_KEY = process.env.REACT_APP_STORAGE_API || '';
const client = new NFTStorage({ token: API_KEY });
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

interface FormData {
  projectDomain: string;
  projectName: string;
  status: string;
  title: string;
  description: string;
  document:string;
}

interface ReviewCardProps {
  metaData: {
    document: string;
    endTime: string;
    createdBy: string;
    category: string;
    description: string;
    projectDomain: string;
    projectName: string;
    status: string;
    title: string;
    id: string;
    upvotes: number;
    downvotes: number;
    notSure: number;
    totalVotes: number;
    userVote: string;
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

const border2 = {
  backgroundColor: "#222944",
    border: "1px solid #788AA3",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const bgverify = {
  backgroundColor: "#141a31",
}

const errortext= {
  color: "#EE4B2B"
}

const AllReportsCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState(false);
  const [editmode, seteditmode] = useState(false);
  const [verifymode, setverifymode] = useState(false);
  const [delproj, setdelproj] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");
  const [isEditingImage, setIsEditingImage] = useState(true);

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

  const handlevote = async (type: string) => {
    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append('reportID', metaData.id);
      formDataObj.append('voteType', type);

      // Convert FormData to JavaScript Object
    const formDataObject: { [key: string]: string | File | null } = {};
    formDataObj.forEach((value, key) => {
    formDataObject[key] = value;
    });

    // Convert JavaScript Object to JSON string
    const jsonData = JSON.stringify(formDataObject);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/report/vote`, {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        const responseData = await response.json();
        console.log("domain data",responseData);
      } else {
        // setMsg('error');
      }
    } catch (error) {
      console.error('Error:', error);
    //   setMsg('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>    
              { !editmode && (
                <>
                <motion.div
      className="w-full max-w-7xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full lg:p-10 md:p-10 p-4 rounded-lg"
        
      >
            <div>
                <div className="lg:flex m:flex justify-start">
                {/* <div className="w-1/4">
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.document)}`}
                      className=""
                      width="150"
                      height="150"
                    />
                </div> */}
                <div className="w-full lg:px-4 md:px-4">
                  <motion.h3
                    className="leading-12 mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="lg:flex md:flex justify-between">
                      <div className="text-2xl font-bold">{metaData.title}</div>
                      {/* <div className="mt-4 text-white">
                      <div className="text-2xl font-bold">Status: {metaData.status}</div>
                    </div> */}
                    </div>
                  </motion.h3>
                  
              <div style={background} className="p-10 rounded-xl">
                  <div className="lg:flex md:flex justify-between">
                  <motion.div
                    className="mt-4 lg:flex md:flex text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.projectName} /
                    </div> 
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.projectDomain} /
                    </div>     
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.category}
                    </div>
                  </motion.div>
                  <div className="mt-4 text-white flex gap-2 text-xs">
                    {
                      metaData.status === "running" ? (
                        <Link to={`/voting/${metaData.id}`}>
                  <div className="flex py-2 px-1 gap-1 text-black rounded-md" style={backgroundbutton}>
                  <img src={vote} alt="info" className="w-4 h-4"/> Vote Report
                    </div>
                  </Link>
                      ) : (
                  <div>Total Votes: {metaData.totalVotes}</div>
                      )
                    }
                    </div>
              </div>
                  

                  <div className="text-gray-400 text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      Created By: {metaData.createdBy}
                    </motion.p>
                  </div>

                  <div className="mt-5 text-gray-300 text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {metaData.description}
                    </motion.p>
                  </div>

                  {/* <div className="flex text-gray-300 pt-20">
                    <div className="w-1/2 flex justify-between">
                      <div className="flex">
                        <div>Upvote {metaData.upvotes}</div>
                      <button onClick={() =>handlevote("upvote")}><img src={upvote}/></button>
                      </div>
                      <div className="flex">
                        <div>Downvote {metaData.downvotes}</div>
                    <button onClick={() =>handlevote("downvote")}><img src={downvote}/></button>
                    </div>
                    <div className="flex gap-1">
                      <div>Not sure {metaData.notSure}</div>
                    <button onClick={() =>handlevote("notsure")}><img src={notsure}/></button>
                    </div>
                    <Link to={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.document)}`} target="_blank" className="flex gap-1">
                        <div>Check this Doc</div>
                        <img src={doc} className="w-5 h-5 mt-1"/>
                      </Link>
                    </div>
                    <div className="w-1/2 text-right text-red-500">
                    <div>End Time: {metaData.endTime}</div>
                    </div>
                  </div> */}

                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </motion.div>
                  </>
                  )}

            {
              msg == "success" && (
                <p className="text-green-500">Your project details has been updated successfully.</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">There is some issue in updating your project.</p>
              )
            }   
    </>
  );
};

export default AllReportsCard;
