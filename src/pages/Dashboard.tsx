// import { checkWalletAuth } from '../modules/connect_to_metamask';
// import { checkJwtToken } from '../modules/authentication';
// import { useAccount, useSigner } from 'wagmi';
// import { setJwtToken, setWalletData } from '../actions/walletActions';
// import store from '../store';
import Loader from '../Components/Loader';
import WalletNotFound from '../Components/MyReviews/walletNotFound';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import {
  FaCopy,
} from "react-icons/fa";
import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import MyProjectsContainer from '../Components/Myprojectscontainer';
import ButtonNavigation from '../Components/Buttonnavigation';
import { NFTStorage } from "nft.storage";
import noproject from '../assets/noprojects.png';
import emoji from '../assets/EmojiMessage.png';
const API_KEY = process.env.REACT_APP_STORAGE_API || '';
const client = new NFTStorage({ token: API_KEY });
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

interface FormData {
  domainName: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  profilePictureUrl: string;
  coverImageHash:string;
  yourname:string;
  role:string;
  blockchain:string;
}

const Projects = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [buttonset, setbuttonset] = useState<boolean>(false);
  const [projectsData, setprojectsData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [verify,setverify] = useState<boolean>(false);

  const txtvalue = localStorage.getItem('txtvalue');

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const storedSubmissionProfile = localStorage.getItem('submissionProfile');
      if (storedSubmissionProfile === 'true') {
        setprofileset(true);
      }
      else
      {
        setprofileset(false);
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

  const text= {
    color: "#788AA3"
  }

  const successtext= {
    color: "#11D9C5"
  }

  const errortext= {
    color: "#EE4B2B"
  }

  const bgverify = {
    backgroundColor: "#141a31",
  }

  const initialFormData: FormData = {
    domainName: '',
    title: '',
    category: '',
    headline: '',
    description: '',
    profilePictureUrl: '',
    coverImageHash:'',
    yourname:'',
    role:'',
    blockchain:''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files![0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setFormData({
        ...formData,
        profilePictureUrl: `ipfs://${metaHash}`,
      });
      console.log("profilePictureUrl",metaHash)
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function uploadcoverImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files![0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setFormData({
        ...formData,
        coverImageHash: `ipfs://${metaHash}`,
      });
      console.log("coverImageHash",metaHash)
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append('domainName', formData.domainName);
      formDataObj.append('title', formData.title);
      formDataObj.append('category', formData.category);
      formDataObj.append('headline', formData.headline);
      formDataObj.append('description', formData.description);
      formDataObj.append('logohash', formData.profilePictureUrl);
      formDataObj.append('coverImageHash', formData.coverImageHash);
      formDataObj.append('adminName', formData.yourname);
      formDataObj.append('adminRole', formData.role);
      formDataObj.append('blockchain', formData.blockchain);

      // Convert FormData to JavaScript Object
const formDataObject: { [key: string]: string | File | null } = {};
formDataObj.forEach((value, key) => {
  formDataObject[key] = value;
});

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/domain`, {
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
        setFormData(initialFormData);
        // setMsg('success');
        console.log("domain data",responseData);
        localStorage.setItem('domainId', responseData.payload.domainId);
        localStorage.setItem('txtvalue',responseData.payload.txtValue);
        setverify(true);
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



  useEffect(() => {
    const fetchProjectsData = async (page: number) => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/domain?page=${page}&onlyAdmin=true`, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
            // Filter the data based on the domain ID
            const wallet = Cookies.get("platform_wallet");
            const payload: any[] = response.data.payload;
    const filteredData = payload.filter(item => item.createdBy === wallet);
    setprojectsData(payload);
          console.log(filteredData)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchprojData = async () => {
      await fetchProjectsData(currentPage);
    };
  
    fetchprojData().finally(() => setLoading(false)); 
  }, [buttonset, currentPage]);





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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNavigation = (page: string) => {
    console.log(`Navigating to ${page} page from projectsPage...`);
    // Additional navigation logic if needed
  };

  const gotoprojects = () => {
    setbuttonset(false);
      }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="py-10"
    >
      <section className="pt-24 mb-10">
        <div className="px-5 mx-auto max-w-8xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">

<div className='-mt-10'>
          <ButtonNavigation onNavigate={handleNavigation} count={projectsData? projectsData.length : 0}/>
          </div>
           
            { buttonset && (
            <section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Verify your project</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={handleSubmit}
                  >
                    <div className="lg:flex md:flex justify-between">

          <div className="flex items-center lg:justify-start md:justify-start justify-center lg:-mt-80 md:-mt-80 lg:mb-10 md:mb-10 mb-10">
                    <div className="rounded-full h-48 w-48 ring-1 ring-black bg-gray-200">
                  {
                    formData.profilePictureUrl ? (
                      <>
                      <div className="text-gray-400 -mt-10 mb-4 text-center">Project logo</div>
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(formData.profilePictureUrl)}`}
                      className="rounded-full"
                      width="200"
                      height="200"
                    />
                    </>
                  ) :(
                  <>
                  <div className="text-gray-400 -mt-10 pb-4 text-center">Project logo</div>
                  <label
                        htmlFor="upload"
                        className="flex flex-col items-center gap-2 cursor-pointer mt-20"
                      >
                      <input id="upload" type="file" className="hidden" 
                      onChange={uploadImage}
                      accept="image/*"
                      />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 fill-white stroke-indigo-500"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </label>
                  </>
                      )}
                    </div>
                  </div>
                  

                      <div className="mb-10 lg:w-2/3 md:w-2/3 lg:border-l md:border-l lg:pl-6 md:pl-6">

                      <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="title"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Project Name"
                          value={formData.title}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="category"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Category"
                          value={formData.category}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>
                      </div>

                        <div>
                        <input
                          type="text"
                          id="domainName"
                          style={border}
                          className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Domain Name"
                          value={formData.domainName}
              onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <input
                          type="text"
                          id="blockchain"
                          style={border}
                          className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Blockchain (optional)"
                          value={formData.blockchain}
              onChange={handleInputChange}
                        />
                      </div>

                      

                      <div className="mb-10">
                        <input
                          type="text"
                          id="headline"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Headline (optional)"
                          value={formData.headline}
              onChange={handleInputChange}
                          // required
                        />
                      </div>

                      <div className="mb-10">
                      <textarea
                        style={border}
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Show description of your project (50 words)"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="yourname"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Your Name"
                          value={formData.yourname}
              onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="role"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Your role"
                          value={formData.role}
              onChange={handleInputChange}
                          required
                        />
                      </div>
                      </div>

                      <div className="text-gray-400">Project page cover photo</div>

                    <div className="flex items-center lg:justify-start md:justify-start justify-center">
                    <div className="w-full h-48 ring-1 ring-gray-200 rounded-md">
                  {
                    formData.coverImageHash ? (
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(formData.coverImageHash)}`}
                      className="w-full h-full"
                    />
                  ) :(<label
                        htmlFor="uploadbg"
                        className="flex flex-col items-center gap-2 cursor-pointer mt-20"
                      >
                      <input id="uploadbg" type="file" className="hidden" 
                      onChange={uploadcoverImage}
                      accept="image/*"
                      />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 fill-none stroke-white"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </label>)}
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
                          Register
                        </button>
                      </div>
                    </div>
                  </form>

                  {
              verify && ( <div style={bgverify} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700" style={bg}>
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                <h3 className="text-2xl font-semibold text-white">
                Verify Your Registration
                </h3>
                <button 
                    onClick={() => setbuttonset(false)}
                    type="button" 
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-md text-center" style={text}>
                Your domain has been registered successfully! Copy the 
text below and paste it in your DNS settings, then 
click the 'verify' button.
                </p>

                {/* <div className="p-4 md:p-5 space-y-4">
                <p className="text-lg text-center text-white">
                  {txtvalue}
                </p>
            </div> */}

            <div
                  className="flex cursor-pointer py-4 justify-center" style={successtext}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      txtvalue? txtvalue : ''
                    );
                  }}
                >
                  <p className="text-xl ml-2 text-white">
                    Text
                  </p>
                  <FaCopy style={{ marginTop: 6}} className="ml-2" />
            </div>

                <div className="text-lg text-center text-red-500">
<a href="/#/verification-steps" target="_blank">Proceed to instructions</a>
            </div>
            </div>

              {/* {
                successmsg && (<p style={successtext} className="p-4">{successmsg}</p>)
              } */}
              {
              errormsg && !successmsg && (<p style={errortext} className="p-4">{errormsg}.
               Try again in 3-5 mins if already added txt in dns.</p>)
              }

            <div className="flex items-center p-4 md:p-5 rounded-b">
                <button 
                style={button}
                onClick={handleVerify}
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Verify</button>
              </div>

        </div>          
    </div>
</div>
)
}

{
                successmsg && (
<div style={bgverify} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative p-4 lg:w-1/4 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow bg-white">
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                {/* <h3 className="text-2xl font-semibold">
                Verify Your Registration
                </h3> */}
                <button 
                    onClick={() => setbuttonset(false)}
                    type="button" 
                    className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <img src={emoji} alt="info" className="mx-auto"/>

            <div className="p-4 md:p-5 space-y-4">
            <p className="text-3xl text-center font-bold">
            Successfully Verified 
                </p>
                <p className="text-md text-center" style={text}>
                You are all set, Registration is successfully completed.
                </p>
            </div>
{/* <div className="p-4 md:p-5 space-y-4">
                <p className="text-lg text-center text-white">
                  {txtvalue}
                </p>
            </div>
            <p style={successtext} className="p-4">{successmsg}</p>
            
            {
              errormsg && !successmsg && (<p style={errortext} className="p-4">{errormsg}. 
              Try again in 3-5 mins if already added txt in dns.</p>)} */}

            <div className="flex items-center p-4 md:p-5 rounded-b">
                <button 
                style={button}
                onClick={gotoprojects}
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">My Projects</button>
              </div>

        </div>          
    </div>
</div>
)
}

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
          </div>
        </div>)}
            {
              msg == "success" && (
                <p className="text-green-500">Verified successfully.</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">Not verified</p>
              )
            }
                </div>
              </div>
            </section>
         )}












{
  !buttonset && (
    <>
    <h1 className="mb-8 text-start text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white lg:ml-20 md:ml-20 ml-10">My Projects</span>
                  </h1>
            <section className="pb-10 rounded-xl">
              
            {loading ? (
            // <Loader />
            <div className="min-h-screen"></div>
          ) : !projectsData || projectsData?.length == 0 ? (
            <motion.div
            className="w-full max-w-5xl mx-auto py-10 rounded-xl text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={bg}
          >
             <div className='lg:flex md:flex lg:p-20 md:p-20 p-10'>
              <div className='lg:w-1/3 md:w-1/3 w-full'>
              <img src={noproject}/>
              </div>
              <div className='lg:w-2/3 md:w-2/3 w-full'>
              <h2 className="text-4xl font-semibold text-white">Enhance Your Project's Integrity, 
Verification Needed</h2>
              <div className='mt-10'>
                <button style={button} onClick={() => setbuttonset(true)} className='py-4 px-10 rounded-lg font-bold'>Verify your project</button>
              </div>
              </div>
            </div>
          </motion.div>
          ) : (
            <MyProjectsContainer metaDataArray={projectsData} MyReviews={false}/>
          )}

{ projectsData && projectsData?.length > 0 && (
          <div className="inline-flex items-center justify-center w-full mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='text-white'>
            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
  <path d="M160,220a11.96287,11.96287,0,0,1-8.48535-3.51465l-80-80a12.00062,12.00062,0,0,1,0-16.9707l80-80a12.0001,12.0001,0,0,1,16.9707,16.9707L96.9707,128l71.51465,71.51465A12,12,0,0,1,160,220Z"/>
</svg>
            </button>
            <span className="mx-2 text-gray-500">Page {currentPage}</span>
            <button onClick={handleNextPage} className='text-white'>
            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
  <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z"/>
</svg>
            </button>
          </div>
)}
                     

                     { projectsData && projectsData?.length > 0 && (
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 mt-10">
                        <button
                          style={button}
                          onClick={() => setbuttonset(true)}
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg lg:w-1/3 md:w-1/3 w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Add More Project
                        </button>
                      </div>
                    )}


                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
          </div>
        </div>)}
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

export default Projects
