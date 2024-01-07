"use client"
import React, { useState } from "react";
import { saveAs } from "file-saver";
import {
  FaDownload,
  FaQrcode,
} from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import QrCode from "./qrCode";
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

interface ReviewCardProps {
  metaData: {
    UUID: string;
    name: string;
    region: string;
    walletAddress: number;
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

const handleDownload = async (clientId: string, name: string, region: string) => {
  try {
    const auth = Cookies.get("platform_token");

    const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/config/${region}/${clientId}`, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
    });
    console.log(response)
    const config = response.data;
    const blob = new Blob([config], { type: "text/plain;charset=utf-8" });
    saveAs(blob, `${name}.conf`);
  } catch (error) {}
};

const MyVpnCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [qr, setqr]= useState(false);

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
    <div
      className="w-full"
      
    >
      <div
        className="w-full h-full lg:px-10 md:px-10 lg:py-4 md:py-4 p-4 border-t border-gray-500"
        style={{backgroundColor:'#30385F'}}
      >
                <div className="w-full px-4 flex justify-between">
                  <div
                    className="text-l leading-12 font-bold mb-2 text-white w-1/4"
                    
                  >
                    <div className="flex">
                      <div>{metaData.UUID.slice(0, 4)}...{metaData.UUID.slice(-4)}</div>
                    </div>
                  </div>

                  <div className="lg:flex md:flex justify-between w-1/4">
                  <div
                    
                  > 
                    <button className="text-lg rounded-lg pr-1 text-white">
                       <a target="_blank" style={color2}>
                       {metaData.name}</a>
                    </button>    
                  </div>
              </div>
                  
              <button className="text-lg rounded-lg pr-1 text-white flex w-1/4 btn bg-blue-gray-700" onClick={()=>handleDownload(metaData.UUID, metaData.name, metaData.region)}>
                       <div className="flex cursor-pointer">
                       {/* Config */}
                       <FaDownload style={color2} className="ml-2 mt-1"/>
                       </div>
                    </button> 

                  <div className="text-white text-lg w-1/4 btn bg-blue-gray-700">
                      <div className="ml-4">

                        <div className="flex cursor-pointer" onClick={() => {

                        }}>
                       <button onClick={()=>{setqr(true)}}>
                          <FaQrcode style={color2} className="ml-2 mt-1"/>
                       </button>
                          </div>  
                      </div>
                    
                  </div>
                </div>
                </div>
                {
              qr && ( <div style={{backgroundColor:'#222944E5'}} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative lg:w-1/3 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700 p-16" style={{backgroundColor:'#445088'}}>
            <div className="p-4 md:p-5 flex">
                <p className="text-2xl text-center text-white">
                Scan QR Code
                </p>
                <button 
                    onClick={() => setqr(false)}
                    type="button" 
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <QrCode clientId={metaData.UUID} name={metaData.name} region={metaData.region} />
            
        </div>          
    </div>
</div>
)
}
    </div>
  );
};

export default MyVpnCard;
