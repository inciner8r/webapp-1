import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import StarRatingshow from "./StarRatingshow";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";
import { NFTStorage } from "nft.storage";
const API_KEY = process.env.REACT_APP_STORAGE_API || '';
const client = new NFTStorage({ token: API_KEY });

interface FormData {
  title: string;
  category: string;
  blockchain: string;
  headline: string;
  description: string;
  logohash:string;
}

interface ReviewCardProps {
  metaData: {
    blockchain: string;
    coverImageHash: string;
    createdAt: string;
    category: string;
    description: string;
    domainName: string;
    headline: string;
    logoHash: string;
    title: string;
    verified: boolean;
    id: string;
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

const MyProjectsCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showDescription, setShowDescription] = useState(false);
  const [editmode, seteditmode] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [isEditingImage, setIsEditingImage] = useState(true);

  const initialFormData: FormData = {
    title: metaData?.title || '',
    category: metaData?.category || '',
    blockchain: metaData?.blockchain || '',
    headline: metaData?.headline || '',
    description: metaData?.description || '',
    logohash: metaData?.logoHash || '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        logohash: `ipfs://${metaHash}`,
      });
      console.log("profilePictureUrl",metaHash)
      setIsEditingImage(false);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }


  const handleSubmit = async (e: FormEvent, id: string) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append('domainId', id);
      formDataObj.append('title', formData.title);
      formDataObj.append('headline', formData.headline);
      formDataObj.append('description', formData.description);
      formDataObj.append('category', formData.category);
      formDataObj.append('blockchain', formData.blockchain);
      formDataObj.append('logohash', formData.logohash);

      // Convert FormData to JavaScript Object
const formDataObject: { [key: string]: string | File | null } = {};
formDataObj.forEach((value, key) => {
  formDataObject[key] = value;
});

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

      const response = await fetch('https://testnet.gateway.netsepio.com/api/v1.0/domain', {
        method: 'PATCH',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        setFormData({
          title: '',
          category: '',
          blockchain: '',
          headline: '',
          description: '',
          logohash:''
        });
        console.log("success")
        setMsg('success');
        window.location.reload();
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

  const handleClick = () => {
    setShowDescription(!showDescription);
  };

  const handleDelete = () => {
    if (onReviewDeleted) {
      onReviewDeleted(); // Call the callback function when a review is deleted
    }
  };

  return (
    <motion.div
      className="w-full max-w-5xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="w-full h-full lg:p-10 md:p-10 p-4 rounded-lg"
        
      >
            <div>
                <div className="lg:flex m:flex justify-start">
                <div className="w-1/4">
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.logoHash)}`}
                      className=""
                      width="150"
                      height="150"
                    />
                </div>
                <div className="w-full lg:px-4 md:px-4">
                  <motion.h3
                    className="leading-12 mb-2 text-white"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="lg:flex md:flex justify-between">
                      <div className="text-4xl font-bold">{metaData.title}</div>
                      <div className="mt-4 text-white">
                  <button className="text-lg rounded-lg">
                      Blockchain : {metaData.blockchain}
                    </button>
                    </div>
                    </div>
                  </motion.h3>

              
              { !editmode && (<div style={background} className="p-4 rounded-xl">
                  <div className="lg:flex md:flex justify-between">
                    <div className="">
                  <motion.div
                    className="mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={color2}
                  >
                    <button className="text-lg rounded-lg pr-1">
                      {metaData.domainName} /
                    </button>     
                    <button className="text-lg rounded-lg pr-1">
                      {metaData.category}
                    </button>
                  </motion.div>
                  </div>
                  <div className="mt-4 text-white">
                  <button className="text-lg rounded-lg" style={color2} onClick={()=>seteditmode(true)}>
                      Edit
                    </button>
                    </div>
              </div>
                  

                  <div className="text-white text-lg flex">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {metaData.headline}
                    </motion.p>
                  </div>

                  <button className="text-lg rounded-lg flex text-white">
                      Verified : {metaData.verified? "True" : "False"}
                    </button>

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
                  )}



                { editmode && (
                  <div style={background} className="p-4 rounded-xl">

              <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={(event) => handleSubmit(event, metaData.id)}
                  >
                    <div className="lg:flex md:flex justify-between">
                  <div className="mb-10 px-10">

                  <div className="lg:flex md:flex justify-between gap-2">

                      <div className="mb-4 w-full">
                        <input
                          type="text"
                          id="title"
                          style={border2}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Project name"
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          id="category"
                          style={border2}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Category"
                          value={formData.category}
                          onChange={handleInputChange}
                        />
                      </div>
                  
                      <div className="mb-4">
                        <input
                          type="text"
                          id="blockchain"
                          style={border2}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Blockchain"
                          value={formData.blockchain}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                    </div>

                      <div className="mb-4">
                        <input
                          type="text"
                          id="headline"
                          style={border2}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Headline"
                          value={formData.headline}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="">
                        <input
                          type="text"
                          id="description"
                          style={border2}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Description"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      </div>
        
                    { !isEditingImage ? (
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(formData.logohash)}`}
                      className="rounded-full"
                      width="200"
                      height="200"
                    />
                  ) :(
                    <>
                    <label
                        htmlFor="upload"
                        className="flex flex-col items-center gap-2 cursor-pointer mt-20 pr-10"
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

                    <div className="w-1/2">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8 flex">
                      <button
                          onClick={()=>seteditmode(false)}
                          style={border}
                          className="py-2 mb-2 text-lg text-white font-semibold rounded-sm w-full sm:mb-0 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Cancel
                        </button>
                        <button
                          style={backgroundbutton}
                          type="submit"
                          value="submit"
                          className="py-2 mb-2 text-lg text-black font-semibold rounded-sm w-full sm:mb-0 bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Save
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
                <p className="text-green-500">Your project details has been updated successfully.</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">There is some issue in updating your project.</p>
              )
            }
                  
                  
                  </div>
                )}



                </div>
                </div>
            </div>
      </div>
    </motion.div>
  );
};

export default MyProjectsCard;
