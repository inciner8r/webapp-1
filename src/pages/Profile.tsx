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
import React, { useEffect, useState } from "react";

export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

const Profile = () => {

  const [loading, setLoading] = useState<boolean>(false);

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
            <section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Set Your Profile</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                   
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
                          id="title"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Your Name"
                          // value={title}
                          // onChange={(e) => setTitle(e.target.value)}
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
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Discord"
                          // value={websiteUrl}
                          // onChange={(e) => setWebsiteUrl(e.target.value)}
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
                          // value={websiteUrl}
                          // onChange={(e) => setWebsiteUrl(e.target.value)}
                          required
                        />

                  
                      </div>
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Country"
                          // value={websiteUrl}
                          // onChange={(e) => setWebsiteUrl(e.target.value)}
                          required
                        />

                  
                      </div>

                    

                    {/* <div className="mb-10">
                      <textarea
                        style={border}
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        // value={description}
                        // onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div> */}

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
{/* {
   msg == "success" && (
    <p className="text-green-500">Thankyou! Your review has been submitted successfully.</p>
   )
}

{
   msg == "error" && (
    <p className="text-red-500">There is some issue in submitting your review. Try again after sometime.</p>
   )
} */}
                </div>
              </div>
            </section>













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
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Profile
