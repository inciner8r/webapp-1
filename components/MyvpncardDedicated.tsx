"use client"
import React, { useState } from "react";
import Cookies from "js-cookie";
import eye from '../public/carbon_view.png';
import dlt from '../public/dlt.png';
import {
  FaCopy,
} from "react-icons/fa";
import Image from 'next/image';
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

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

const MyVpnCardDedicated: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const deletevpn = async (id: string) => {
    setLoading(true);

    const auth = Cookies.get("platform_token");

    const jsonData = {
      "vpnId":id
    }

    try {
      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/vpn`, {
        method: 'DELETE',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(jsonData),
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
      className="w-full"
      
    >
      <div
        className="w-full h-full lg:px-10 md:px-10 lg:py-4 md:py-4 p-4 border-t border-gray-500"
        style={{backgroundColor:'#30385F'}}
      >
                <div className="w-full px-4 flex justify-between">
                  <h3
                    className="text-2xl leading-12 font-bold mb-2 text-white w-1/4"
                    
                  >
                    <div className="flex text-lg">
                      <div>{metaData.vpn_id}</div>
                    </div>
                  </h3>

                  <div className="lg:flex md:flex justify-between w-1/4 pl-10">
                  <div
                    
                  > 
                    <button className="text-lg rounded-lg pr-1 text-white">
                       <a href={`https://${metaData.vpn_endpoint}`} target="_blank" style={color2}>
                       Link</a>
                    </button>    
                  </div>
              </div>
                  
              <button className="text-lg rounded-lg pr-1 text-white flex w-1/4 pl-14">
                       <a href={`https://${metaData.firewall_endpoint}`} target="_blank" style={color2}>
                          Link</a>
                    </button> 

                  <div className="text-white text-lg w-1/4">
                    <p
                     
                      className="flex-col"
                    >
                      <Image src={eye} alt="" onClick={togglePasswordVisibility} className="h-5 w-5 mt-1 cursor-pointer"/>

                      <div className="">
                      {showPassword ? (

                        <div className="flex cursor-pointer" onClick={() => {
                          navigator.clipboard.writeText(
                            metaData? metaData.dashboard_password : ''
                          );
                        }}>
                          {metaData.dashboard_password}
                          <FaCopy style={color2} className="ml-2 mt-1"/>
                          </div>
                      ) : (
                        <span></span>
                      )}
                      </div>
                    </p>
                    
                  </div>

                  <div className="lg:flex md:flex justify-between w-1/8">
                  <div
                    
                  > 
                    <button className="text-lg rounded-lg pr-1 text-white" onClick={() => deletevpn(metaData.vpn_id)}>  
                    <Image src={dlt} alt="info" className="w-4 h-4"/>
                    </button>    
                  </div>
              </div>

                </div>
                </div>
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

export default MyVpnCardDedicated;