import { checkWalletAuth } from '../modules/connect_to_metamask';
import { checkJwtToken } from '../modules/authentication';
import { useAccount, useSigner } from 'wagmi';
import { setJwtToken, setWalletData } from '../actions/walletActions';
import store from '../store';
import Loader from '../Components/Loader';
import WalletNotFound from '../Components/MyReviews/walletNotFound';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";

export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

interface FormData {
  name: string;
  discord: string;
  twitter: string;
  country: string;
  profilePicture: File | null;
}

const Profile = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const storedSubmissionProfile = localStorage.getItem('submissionProfile');
      if (storedSubmissionProfile === 'true') {
        setprofileset(true);
      }
      setLoading(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, [msg]);

  const bg = {
    backgroundColor: "#222944",
  };

  const border = {
    backgroundColor: "#222944",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const initialFormData: FormData = {
    name: '',
    country: '',
    profilePicture: null,
    discord: '',
    twitter: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('country', formData.country);
      formDataObj.append('discord', formData.discord);
      formDataObj.append('twitter', formData.twitter);
      if (formData.profilePicture) {
        formDataObj.append('profilePicture', formData.profilePicture);
      }

      // Convert FormData to JavaScript Object
const formDataObject: { [key: string]: string | File | null } = {};
formDataObj.forEach((value, key) => {
  formDataObject[key] = value;
});

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

      const response = await fetch('https://testnet.gateway.netsepio.com/api/v1.0/profile', {
        method: 'PATCH',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        setFormData(initialFormData);
        setMsg('success');
        localStorage.setItem('submissionProfile', 'true');
      } else {
        setMsg('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMsg('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="py-10"
    >
      <section className="pt-24 mb-10">
        <div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
           
            { !profileset && (<section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Set Your Profile</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={handleSubmit}
                  >
                    <div className="lg:flex md:flex justify-between">

                      <div className="block lg:hidden md:hidden">
                    <div className="flex items-center -mt-10 mb-10 justify-center">
            <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
              {/* <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" /> */}
            </div>
          </div>
          </div>

                      <div className="mb-10 lg:w-2/3 md:w-2/3">
                        <input
                          type="text"
                          id="name"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Your Name"
                          value={formData.name}
              onChange={handleInputChange}
                          required
                        />
                      </div>

                      {/* {profileDetails?.profilePictureUrl ? (
          <div className="flex items-center justify-start -mt-24 ml-16">
            <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
              <img
                className="text-3xl text-gray-500 w-48 h-48 rounded-full"
                alt=""
                src={`https://cloudflare-ipfs.com/ipfs/${removePrefix(
                  profileDetails?.profilePictureUrl
                )}`}
              />
            </div>
          </div> */}
        {/* ) : ( */}
          <div className="flex items-center justify-start -mt-24 ml-16 mb-10 hidden lg:block md:block">
            <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
              {/* <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" /> */}
            </div>
          </div>
        {/* )} */}
                      
                    </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="discord"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Discord"
                          value={formData.discord}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="twitter"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Twitter"
                          value={formData.twitter}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="country"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Country"
                          value={formData.country}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>

                    <div className="text-center pt-10">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          type="submit"
                          value="submit"
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Set Profile
                        </button>
                      </div>
                    </div>
                  </form>

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
            </div>
          </div>
        </div>)}
            {
              msg == "success" && (
                <p className="text-green-500">Your profile details has been updated successfully.</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">There is some issue in updating your profile. Try again after sometime.</p>
              )
            }
                </div>
              </div>
            </section>
            )}












{
  profileset && (
    <>
    <h1 className="mb-8 text-start text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Basic Information</span>
                  </h1>
            <section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  

                  <form
                    id="myForm"
                    className="rounded pt-10"
                   
                  >
                    <div className="lg:flex md:flex justify-between gap-10">

                    <div className="">
                    <div className="flex items-center -mt-10 mb-10 justify-center">
                      <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
                        {/* <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" /> */}
                      </div>
                    </div>
                    </div>

                    <div>
                      <div className="mb-10">
                        <input
                          type="text"
                          id="title"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Your Name"
                          required
                        />
                      </div>

                      <div className="mb-10">
                        <input
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Country"
                          required
                        />
                      </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Discord"
                          required
                        />

                  
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Twitter"
                          required
                        />

                  
                      </div>
                      </div>

                      </div>
                    </div>

                    

                     

                    <div className="text-center pt-10">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          type="submit"
                          value="submit"
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </form>

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
            </div>
          </div>
        </div>)}
                </div>
              </div>
            </section>
    </>
  )
}
            
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Profile
