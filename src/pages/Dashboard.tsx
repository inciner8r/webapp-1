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
import { removePrefix } from "../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw"
const client = new NFTStorage({ token: API_KEY });

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
}

const Profile = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");

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
    color: "#141a31"
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
    role:''
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

      // Convert FormData to JavaScript Object
const formDataObject: { [key: string]: string | File | null } = {};
formDataObj.forEach((value, key) => {
  formDataObject[key] = value;
});

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

      const response = await fetch('https://testnet.gateway.netsepio.com/api/v1.0/domain', {
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
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get('https://testnet.gateway.netsepio.com/api/v1.0/domainName?page=1', {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
            // Filter the data based on the domain ID
            const domainid = localStorage.getItem('domainId');
            const payload: any[] = response.data.payload;
    const filteredData = payload.filter(item => item.id === domainid);
          setProfileData(filteredData[0]);
          console.log(filteredData)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileset]);





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

  const response = await fetch('https://testnet.gateway.netsepio.com/api/v1.0/domain/verify', {
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
           
            {/* { !profileset && ( */}
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

                      {/* <div className="block lg:hidden md:hidden">
                    <div className="flex items-center -mt-10 mb-10 justify-center">
            <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
            </div>
          </div>
          </div> */}

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
                  ) :(<label
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
                      </label>)}
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

                      

                      <div className="mb-10">
                        <input
                          type="text"
                          id="headline"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Headline"
                          value={formData.headline}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>

                      {/* <div className="mb-10">
                        <input
                          type="text"
                          id="description"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Description"
                          value={formData.description}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div> */}



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
                      // width="400"
                      // height="200"
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
          </div>
        ) : (
          <div className="flex items-center justify-start -mt-24 ml-16">
            <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
              <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" />
            </div>
          </div>
        )} */}


                  
                      
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
                    onClick={() => setverify(false)}
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
                  Your domain has been registered successfully!
                  Add below TXT in DNS and then click verify button.
                </p>
            </div>
<div className="p-4 md:p-5 space-y-4">
                <p className="text-lg text-center text-white">
                  {/* The TXT value is :  */}
                  {txtvalue}
                </p>
            </div>
            <p style={successtext} className="p-4">{successmsg}</p>
            
            {
              errormsg && !successmsg && (<p style={errortext} className="p-4">{errormsg}. Try again in 3-5 mins if already added txt in dns.</p>)}

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

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
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
            {/* )} */}












{/* {
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
                    <div className="lg:flex md:flex justify-between gap-2">

                    <div className="lg:w-1/3 md:w-1/3">
                    <div className="flex items-center mb-10 justify-center">
                    {
                    profileData?.logoHash ? (
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(profileData?.logoHash)}`}
                      className=""
                      width="200"
                      height="200"
                    />
                  ) :(
                      <div className="rounded-full h-48 w-48 ring-offset-2 ring-1 ring-black bg-gray-200">
                      </div>
                  )}
                    </div>
                    </div>

                    <div className="lg:w-2/3 md:w-2/3">
                      
                      <div className="lg:flex md:flex justify-between gap-2">
                    <div style={border} className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight">
                    {profileData?.domainName}
                      </div>

                      <div style={border} className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight">
                    {profileData?.category}
                      </div>
                      </div>
                      <div style={border} className="mb-10 rounded w-full py-4 px-3 text-gray-200 leading-tight">
                    {profileData?.title}
                      </div>
                      <div style={border} className="mb-10 rounded w-full py-4 px-3 text-gray-200 leading-tight">
                    {profileData?.headline}
                      </div>
                      <div style={border} className="mb-10 rounded w-full py-4 px-3 text-gray-200 leading-tight">
                    {profileData?.description}
                      </div>
                      </div>
                    </div>

                    

                     

                    <div className="text-center pt-10">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          onClick={handleVerify}
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Verify Domain
                        </button>
                      </div>
                    </div>
                  </form>

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
          </div>
        </div>)}
                </div>
              </div>
            </section>
    </>
  )
} */}
            
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Profile
