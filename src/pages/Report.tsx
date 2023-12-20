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
import connectWallet from '../modules/connectwallet';
import { removePrefix } from "../modules/Utils/ipfsUtil";
import AllProjectsContainer from '../Components/Allprojectscontainer';
import MyReportsContainer from '../Components/MyReportsContainer';
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
  tags: string;
  name: string;
  document: string;
}

const Report = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [buttonset, setbuttonset] = useState<boolean>(false);
  const [projectsData, setprojectsData] = useState<any>(null);
  const [verifiedprojectsData, setverifiedprojectsData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [verify,setverify] = useState<boolean>(false);
  const [Verifiedproj, setVerifiedproj] = useState<boolean>(false);
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

  function extractDomain(domain: string): string {
    // Remove protocol (http://, https://)
    domain = domain.replace(/^(https?:\/\/)?/i, '');
  
    // Remove www. at the beginning
    domain = domain.replace(/^www\./i, '');
  
    // Remove paths, query strings, and fragments
    domain = domain.replace(/\/.*$/, '');
    domain = domain.replace(/\?.*$/, '');
    domain = domain.replace(/#.*$/, '');
  
    // Split the domain into parts
    const parts = domain.split('.');
  
    // If the domain has at least two parts (e.g., sharks.io), use the last two parts
    if (parts.length >= 2) {
      domain = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
    }

    // Remove .com or .com/ from the end
    domain = domain.replace(/\.com\/?$/i, '');
  
    return domain;
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
    blockchain:'',
    tags:'',
    name:'',
    document:''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  async function uploadDocument(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files![0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setFormData({
        ...formData,
        document: `ipfs://${metaHash}`,
      });
      console.log("Document",metaHash)
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
    const tagsArray = formData.tags.split(',').map(tags => tags.trim());
    console.log("tagsArray",tagsArray);

    // Convert the string to an array
    const coverImageArray = [formData.coverImageHash];
    const categoryArray = [formData.category];

    try {

    const requestData = {
        title: formData.title,
        description: formData.description,
        document: formData.document,
        categories: categoryArray,
        tags: tagsArray,
        images: coverImageArray,
        projectName: formData.name,
        projectDomain: extractDomain(formData.domainName),
      };

    // Convert JavaScript Object to JSON string
    const jsonData = JSON.stringify(requestData);

    console.log("data to send in report", jsonData);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/report/`, {
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
        console.log("domain data",responseData);
        setsuccessMsg(responseData.message);
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

        const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/report/`, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
            // Filter the data based on the domain ID
            const userId = Cookies.get("platform_userid");
            const payload: any[] = response.data.payload;
    const filteredData = payload.filter(item => item.createdBy === userId);
    setprojectsData(filteredData);
          console.log("my reports", filteredData)
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


  useEffect(() => {
    const fetchProjectsData = async (page: number) => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/domain?page=${page}&verified=true`, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
            const wallet = Cookies.get("platform_wallet");
            const payload: any[] = response.data.payload;
    // const filteredData = payload.filter(item => item.createdBy === wallet);
    setverifiedprojectsData(payload);
          console.log("all proj",payload)
        }
      } catch (error) {
        console.error('Error fetching all projects data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchprojData = async () => {
      await fetchProjectsData(currentPage);
    };
  
    fetchprojData().finally(() => setLoading(false)); 
  }, [currentPage]);





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

  const gotoreports = () => {
    setbuttonset(false);
      }

  const loggedin = Cookies.get("platform_token");
  const wallet = Cookies.get("platform_wallet");

  useEffect(() => {
    const handleConnectWallet = async () => {
      if (!loggedin && !wallet) {
        try {
          const isConnect = await connectWallet();
          if (isConnect) {
            window.location.reload();
          }
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      }
    };
    handleConnectWallet();
  }, [loggedin, wallet]);

  if (!loggedin && !wallet) {
    return (
      <div className='min-h-screen text-center text-white'>
        <div style={{ marginTop: '30vh' }} className='text-2xl'>Wallet not connected, please authorize to view the content.</div>
      </div>
    )
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
  { Verifiedproj ? (
<ButtonNavigation onNavigate={handleNavigation} count={verifiedprojectsData? verifiedprojectsData.length : 0}/>
  ): (
<ButtonNavigation onNavigate={handleNavigation} count={projectsData? projectsData.length : 0}/>
  )}
          </div>
           
            { buttonset && (
            <section className="pb-10 rounded-xl max-w-4xl mx-auto" style={bg}>
              <div className="px-5 mx-auto max-w-3xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Submit Your Report</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={handleSubmit}
                  >
                      <div className="mb-10">

                        <div>
                        <input
                          type="text"
                          id="title"
                          style={border}
                          className="mb-6 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Title"
                          value={formData.title}
              onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-6">
                      <textarea
                        style={border}
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-md text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description in max 50 words"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-6 lg:w-1/2 md:w-1/2">
                        <select
                          id="category"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option className="bg-white text-black" value="">
                            <div className="flex gap-10">
                            <div>Category</div>
                            <div className="text-right">&nbsp; &nbsp; &#129131;</div>
                            </div> 
                          </option>
                          <option className="bg-white text-black" value="DeFi">DeFi</option>
                          <option className="bg-white text-black" value="NFT Tooling">NFT Tooling</option>
                          <option className="bg-white text-black" value="Gaming">Gaming</option>
                          <option className="bg-white text-black" value="Wallets">Wallets</option>
                          <option className="bg-white text-black" value="Tooling">Tooling</option>
                          <option className="bg-white text-black" value="Stablecoins">Stablecoins</option>
                          <option className="bg-white text-black" value="Security">Security</option>
                          <option className="bg-white text-black" value="Marketplaces">Marketplaces</option>
                          <option className="bg-white text-black" value="Launchpads">Launchpads</option>
                          <option className="bg-white text-black" value="Infra">Infra</option>
                          <option className="bg-white text-black" value="Explorers">Explorers</option>
                          <option className="bg-white text-black" value="Bridges">Bridges</option>
                          <option className="bg-white text-black" value="Social">Social</option>
                          <option className="bg-white text-black" value="NFT">NFT</option>
                          <option className="bg-white text-black" value="Others">Others</option>
                        </select>
                      </div>

                      <div className="mb-6 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="tags"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Tags (separate your tags with a comma)"
                          value={formData.tags}
              onChange={handleInputChange}
                          required
                        />
                      </div>
                      </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                    <div className="mb-0 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="name"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Project Name"
                          value={formData.name}
              onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="mb-0 lg:w-1/2 md:w-1/2">
                      <input
                          type="text"
                          id="domainName"
                          style={border}
                          className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Project Domain"
                          value={formData.domainName}
              onChange={handleInputChange}
                          required
                        />
                      </div>
                      </div>

<div className="flex gap-4">
                    <div className="flex items-center lg:justify-start md:justify-start justify-center w-1/2">
                    <div className="w-full h-48 border border-dashed rounded-md">
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
                          className="h-4 w-4 fill-none stroke-white"
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
                        <div className='text-gray-400 text-md'>Cover Image</div>
                        <div className='text-gray-400 text-sm'>Optimal dimensions 1500 x 500px</div>
                      </label>)}
                    </div>
                  </div>


                  <div className="flex items-center lg:justify-start md:justify-start justify-center w-1/2">
                    <div className="w-full h-48 border border-dashed rounded-md">
                  {
                    formData.document ? (
                    <iframe title="Document Viewer" width="100%" height="190px" src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(formData.document)}`} />
                  ) :(<label
                        htmlFor="uploaddoc"
                        className="flex flex-col items-center gap-2 cursor-pointer mt-20"
                      >
                      <input id="uploaddoc" type="file" className="hidden" 
                      onChange={uploadDocument}
                      accept=".pdf, .doc"
                      />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 fill-none stroke-white"
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
                        <div className='text-gray-400 text-md'>Upload Document</div>
                        <div className='text-gray-400 text-sm'>PDF / Doc, max 20MB </div>
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
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-2/3 sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>

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
            Submitted! 
                </p>
                <p className="text-md text-center" style={text}>
                Congrats, your report is successfully submited.
                </p>
            </div>

            <div className="flex items-center p-4 md:p-5 rounded-b">
                <button 
                style={button}
                onClick={gotoreports}
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">My Reports</button>
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
                <p className="text-green-500">submitted successfully.</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">Submission failed</p>
              )
            }
                </div>
              </div>
            </section>
         )}












{
  !buttonset && (
    <>
    <h1 className="mb-8 text-start lg:text-4xl md:text-4xl text-xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight lg:flex md:flex">
                    <button onClick={() => setVerifiedproj(false)} className={`text-white lg:ml-20 md:ml-20 ml-10`}>My Reports</button>
                  </h1>
            <section className="pb-10 rounded-xl">
              
            {loading ? (
            // <Loader />
            <div className="min-h-screen"></div>
          ) : ((!projectsData || projectsData?.length == 0) && (!Verifiedproj) )? (
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
              <h2 className="text-4xl font-semibold text-white">Effortless Report Sharing, 
Submit Your Findings Today!</h2>
              <div className='mt-10'>
                <button style={button} onClick={() => setbuttonset(true)} className='py-4 px-10 rounded-lg font-bold'>Submit your Report</button>
              </div>
              </div>
            </div>
          </motion.div>
          ) : (
            <>
            {
              Verifiedproj ? (
                <AllProjectsContainer metaDataArray={verifiedprojectsData} MyReviews={false}/>
              ) : (
                <MyReportsContainer metaDataArray={projectsData} MyReviews={false}/>
              )
            }
            </>
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
                          Submit more Report
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

export default Report
