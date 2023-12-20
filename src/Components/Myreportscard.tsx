import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import StarRatingshow from "./StarRatingshow";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";
import { NFTStorage } from "nft.storage";
import eye2 from '../assets/eye2.png';
import doc from '../assets/Blank_alt_fill.png';
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
    createdAt: string;
    category: string;
    description: string;
    projectDomain: string;
    projectName: string;
    status: string;
    title: string;
    id: string;
    userVote: string;
    totalVotes: number;
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

const MyReportsCard: React.FC<ReviewCardProps> = ({
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

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const auth = Cookies.get("platform_token");
    const domainid: string | null = localStorage.getItem('domainId');

    try {
      const formDataObj = new FormData();
    
// Convert FormData to JavaScript Object
const formDataObject: { domainId: string } = {
    domainId: domainid as string
  };

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

console.log("jsonData",jsonData);

  const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/domain/verify`, {
        method: 'PATCH',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });
      const responseData = await response.json();
      console.log("response", responseData);
      if (response.status === 200) {
        // const responseData = await response.json();
        setsuccessMsg(responseData.message);
        // console.log("domain data",responseData);
      } else {
        seterrorMsg(responseData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMsg('error');
    } finally {
      setLoading(false);
    }
  };

  const deleteproject = async (id: string) => {
    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/domain?domainId=${id}`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        }
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

  const gotoprojects = () => {
    window.location.reload()
      }

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
                    </div>
                  </motion.h3>
                  
              <div style={background} className="p-10 rounded-xl">
                  <div className="lg:flex md:flex justify-between">
                    <div>
                  <motion.div
                    className="mt-4 lg:flex md:flex text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    // style={color2}
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
                    <Link to={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.document)}`} target="_blank" className="px-2 pt-1 gap-1 flex">
                  <img src={doc} alt="info" className="w-4 h-4"/>
                    </Link>
                  </motion.div>
                  </div>
                  <div className="text-white flex flex-col text-right text-sm">
                  <div className="flex">
                    <div>Status: &nbsp;</div>
                    {
                       metaData.status === "accepted" && (
                        <div style={color2}>Accepted</div>
                       )
                    }
                    {
                       metaData.status === "rejected" && (
                        <div className="text-red-500">Rejected</div>
                       )
                    }
                    {
                       metaData.status === "running" && (
                        <div>Running</div>
                       )
                    }
                  </div>
                  <div>Total Votes : {metaData.totalVotes}</div>
                  </div>
              </div>
                  

                  {/* <div className="text-white text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {metaData.title}
                    </motion.p>
                  </div> */}

                  <div className="mt-5 text-white text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {metaData.description}
                    </motion.p>
                  </div>

                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </motion.div>
                  </>
                  )}

{
              delproj && ( <div style={bgverify} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative lg:w-1/3 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700 p-16" style={background}>
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-4xl text-center text-white font-bold">
                Are you sure?
                </p>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-md text-center" style={color}>
                Do you really want to delete this project?
This process can not be undone.
                </p>
            </div>
            <div className="flex items-center p-4 md:p-5 rounded-b gap-4">
                <button 
                style={border}
                onClick={() => setdelproj(false)}
                type="button" className="w-full text-white font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
              <button 
                style={backgroundbutton}
                onClick={() => deleteproject(metaData.id)} 
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
              </div>
        </div>          
    </div>
</div>
)
}
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

export default MyReportsCard;
