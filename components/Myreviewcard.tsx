"use client"
import React, { useState } from "react";
import Link from "next/link";
import StarRatingshow from "./StarRatingshow";
import Cookies from "js-cookie";
import eye2 from '../public/eye2.png';
import dlt from '../public/dlt.png';
import Image from 'next/image'
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

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
  // MyReviews?: boolean;
  onReviewDeleted?: () => void;
}

const background = {
  backgroundColor: "#222944",
};

const color = {
  color: "#11D9C5",
};

const border = {
  border: "1px solid #11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const bg = {
  backgroundColor: "#222944",
};

const button = {
  backgroundColor: "#11D9C5",
};

const text= {
  color: "#788AA3"
}

const bgverify = {
  backgroundColor: "#141a31",
}

const MyReviewCard: React.FC<ReviewCardProps> = ({
  metaData,
  // MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleterev, setdeleterev] = useState<boolean>(false);

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

  const deletereview = async () => {
    setLoading(true);

    const auth = Cookies.get("platform_token");

    // Extract the last part of the URL
    const urlParts = metaData?.ipfsUrl.split('/');
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
    <div
      className="flex flex-col items-center justify-center w-full px-6 mx-auto"
    >
      <div
        className="w-full h-full bg-center bg-cover p-4"
        // shadow-xl shadow-green-400/30 shadow-md
        style={{backgroundColor:'#30385F'}}
      >
        <div
          className="flex flex-col h-full justify-between border-t border-gray-500"
        >
            <div>
              {showDescription ? (
                <div>
                  <h3
                    className="text-2xl leading-12 font-bold mb-2 text-white"
                    // style={color}
                  >
                    {metaData?.name}
                  </h3>
                  <div className="mt-5 text-white">
                    <p
                    >
                      {metaData?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex">
                  <h3
                    className="text-xl leading-12 mb-2 text-white mt-4 w-1/4"
                  >
                    <div className="">
                    <div className="lg:flex md:flex gap-6 font-bold">
                    <Link href={`/reviews/${metaData?.domainAddress}`}>
                      <button className="border-b mb-2">{metaData?.name}</button>
                    </Link>

                    </div>

                  
                    <div
                    className="flex" style={{color:'#98A8BE'}}
                  >
                    <div className="text-sm rounded-lg pr-1">
                      {metaData?.siteType}/
                    </div>
                    <div className="text-sm rounded-lg pr-1">
                      {metaData?.category}/
                    </div>
                    <div className="text-sm rounded-lg pr-1">
                      {metaData?.siteSafety}/
                    </div>
                    <div className="text-sm rounded-lg pr-1">
                      {metaData?.siteTag}/
                    </div>
                        {metaData?.siteRating && (
                          <div className="text-sm">
                            ({metaData?.siteRating}/10)
                          </div>
                        )}
                  </div>

                    
                    </div>
                  </h3>

                  

                  <div className="w-1/4 mt-4">
                  <p
                    className="mt-4 rounded-lg"
                    style={color}
                  >
                    <a href={metaData?.siteUrl} target="_blank">
                      {metaData?.siteUrl}
                    </a>
                  </p>
                  </div>

                  <div className="text-md w-1/4 mt-4" style={{color:'#98A8BE'}}>
                    <p
                    >
                     &quot;{metaData?.description}&quot;
                    </p>
                  </div>

                  <div className="flex gap-4 lg:mt-0 md:mt-0 mt-4 text-xs w-1/4">
                    {/* <Link href={`/reviews/${metaData?.domainAddress}`}>
                      <div className="flex py-2 px-2 gap-1 text-black" style={backgroundbutton}>
                    <Image src={eye2} alt="info" className="w-4 h-4"/> View Review
                    </div>
                    </Link> */}
                    <button 
                    onClick={()=>setdeleterev(true)}
                    className="px-2 py-1 gap-1 flex pt-2 ml-auto mt-4">
                    <Image src={dlt} alt="info" className="w-4 h-4"/>
                    </button>
                    </div>

                </div>
              )}
            </div>
        </div>
      </div>

      {
              deleterev && ( <div style={{backgroundColor:'#222944E5'}} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative lg:w-1/3 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700 p-16 md:p-20" style={{backgroundColor:'#37406D'}}>
            <div className="p-4">
                <p className="text-4xl text-center text-white font-bold">
                Are you sure?
                </p>
            </div>
            <div className="p-4 md:p-5 mx-auto space-y-4">
                <p className="text-md text-center" style={text}>
                Do you really want to delete this review?
This process can not be undone.
                </p>
            </div>
            <div className="flex items-center p-4 md:p-5 rounded-b gap-4">
                <button 
                style={{border: '1px solid #FF85C2', color:'#FF85C2'}}
                onClick={() => setdeleterev(false)}
                type="button" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cancel</button>
              <button 
                style={button}
                onClick={deletereview} 
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</button>
              </div>
        </div>          
    </div>
</div>
)
}


      {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
            </div>
          </div>
        </div>)}
    </div>
  );
};

export default MyReviewCard;
