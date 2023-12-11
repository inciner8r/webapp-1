import React, { useEffect, useState } from "react";
import ReviewContainer from "../../Components/ReviewContainer";
// import { fetchMetadataFromIPFS } from "../../modules/fetch_metadata_from_ipfs";
// import { createIpfsUrl } from "../../modules/ipfs_url_creator";
// import { fetchMetadataURIByUser } from "../../modules/fetch_metadataURI_from_graphql";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { RootState } from "../../store";
import StarRating from "../../Components/StarRating"
// import SubmitReview from "../../Components/SubmitReview";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { storeMetaData } from "../../modules/submit-review";
import ButtonNavigation from '../Buttonnavigation';
import emoji from '../../assets/EmojiMessage.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const MyReviews: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [blockchain, setblockchain] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  // const [category] = useState<string>("website");
  const [siteTag, setSiteTag] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [siteSafety, setSiteSafety] = useState<string>("");
  const [siteType, setSiteType] = useState<string>("");
  const [msg, setmsg] = useState<string>("");

  const wallet = Cookies.get("platform_wallet");
  const navigate = useNavigate();

  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  // State to check if the user is connected to Metamask:
  // const walletData = useSelector((state: RootState) => state.wallet.walletData);

  // const walletAddress = walletData;

  // useEffect(() => {
  //   async function fetchData() {
  //     setLoading(true);

  //     if (walletAddress) {
  //       const reviewCreateds = await fetchMetadataURIByUser(walletAddress);
  //       if (reviewCreateds) {
  //         const metaDataPromises = reviewCreateds.map((reviewCreated) =>
  //           fetchMetadataFromIPFS(
  //             createIpfsUrl(reviewCreated.metadataURI),
  //             reviewCreated.tokenId
  //           )
  //         );
  //         const allMetaData = await Promise.all(metaDataPromises);
  //         setMetaDataArray(allMetaData);
  //       }
  //     }

  //     setLoading(false);
  //   }

  //   fetchData();
  // }, []); // Change the dependency to walletAddress

  const bg = {
    backgroundColor: "#222944",
  };

  const bgverify = {
    backgroundColor: "#141a31",
  }

  const text= {
    color: "#788AA3"
  }

  const border = {
    backgroundColor: "#222944",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const domainAddress = new URL(`${websiteUrl}`).hostname;
    let metaData = {
      name: title,
      description: description,
      category: category,
      image:
        "ipfs://bafybeica7pi67452fokrlrmxrooazsxbuluckmcojascc5z4fcazsuhsuy",
      domainAddress: domainAddress,
      siteUrl: websiteUrl,
      siteType: siteType,
      siteTag: siteTag,
      siteSafety: siteSafety,
      siteRating: selectedRating,
      blockchain: blockchain,
    };
    let [CID] = await storeMetaData(metaData);
    let metaDataUri = `ipfs://${CID}`.split(',')[0];

    let reviewData = {
      category: category,
      domainAddress: domainAddress,
      siteUrl: websiteUrl,
      siteType: siteType,
      siteTag: siteTag,
      siteSafety: siteSafety,
      metaDataUri: metaDataUri,
      voter: wallet || "",
      siteIpfsHash: "a"
    };

    console.log("review data", reviewData);
    console.log('Submitted Rating:', selectedRating);

    try {
      const auth = Cookies.get("platform_token");
      // Make the POST request
      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/delegateReviewCreation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth}`
        },
        body: JSON.stringify(reviewData),
      });
  
      if (response.ok) {
        // Request was successful, handle the response if needed
        setLoading(false);
        console.log('Review data submitted successfully');
        setTitle("");
        setDescription("");
        setblockchain("");
        setWebsiteUrl("");
        setSiteType("");
        setCategory("");
        setSiteSafety("");
        setSiteTag("");
        setSelectedRating(0);
        setmsg("success");
      } else {
        // Handle error response
        setLoading(false);
        console.error('Error submitting review data:', response.status, response.statusText);
        setmsg("error")
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error:', error);
    }

    // let [error] = await createReview(reviewData);
    // if (error) {
    // } else {
    //   window.location.reload();
    // }
  };

  const handleNavigation = (page: string) => {
    console.log(`Navigating to ${page} page from vpnPage...`);
    // Additional navigation logic if needed
  };

  const gotoreviews = async () => {
    navigate('/view-my-reviews');
  };

  const location = useLocation();
  const count = location.state?.count || 0;

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

          <div className='-mt-10'>
          <ButtonNavigation onNavigate={handleNavigation} count={count}/>
          </div>

            <section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">Share Your Insights</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={(e) => {
                      // e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    <div className="lg:flex md:flex justify-between gap-2">
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="text"
                          id="title"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Website Name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />

                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Website name"
                          value={title} onChange={(e) => setTitle(e.target.value)}
                          required
                        /> */}
                      </div>
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <input
                          type="url"
                          id="websiteUrl"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="URL (Enter http link)"
                          value={websiteUrl}
                          onChange={(e) => setWebsiteUrl(e.target.value)}
                          required
                        />

                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="account"
                          type="text"
                          placeholder="url"
                          value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)}
                          required
                        /> */}
                      </div>
                    </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <select
                          id="siteType"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={siteType}
                          onChange={(e) => setSiteType(e.target.value)}
                          required
                        >
                          <option className="bg-white text-black" value="">Select site type</option>
                          <option className="bg-white text-black" value="Website">Website</option>
                          <option className="bg-white text-black" value="Mobile App">Mobile App</option>
                          <option className="bg-white text-black" value="Browser Extension">
                            Browser Extension
                          </option>
                          <option className="bg-white text-black" value="Software">Software</option>
                        </select>
                        {/* <input
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="wallet"
                          type="text"
                          placeholder="type"
                          value={siteType} onChange={(e) => setSiteType(e.target.value)} required
                        /> */}
                      </div>
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <select
                          id="siteType"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={siteSafety}
                          onChange={(e) => setSiteSafety(e.target.value)}
                          required
                        >
                          <option className="bg-white text-black" value="">Select safety rating</option>
                          <option className="bg-white text-black" value="Safe">Safe</option>
                          <option className="bg-white text-black" value="Mostly Safe">Mostly Safe</option>
                          <option className="bg-white text-black" value="Adware Issues">Adware Issues</option>
                          <option className="bg-white text-black" value="Malware Threats">Malware Threats</option>
                          <option className="bg-white text-black" value="Spyware Risks">Spyware Risks</option>
                          <option className="bg-white text-black" value="Phishing concerns">Phishing concerns</option>
                        </select>
                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="wallet"
                          type="text"
                          placeholder="safety"
                          value={siteSafety} onChange={(e) => setSiteSafety(e.target.value)} required
                        /> */}
                      </div>
                    </div>

                    <div className="lg:flex md:flex justify-between gap-2">
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <select
                          id="category"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          required
                        >
                          <option className="bg-white text-black" value="">Select Category</option>
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
                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="wallet"
                          type="text"
                          placeholder="category"
                          value={siteCat} onChange={(e) => setSiteCat(e.target.value)} required
                        /> */}
                      </div>
                      <div className="mb-10 lg:w-1/2 md:w-1/2">
                        <select
                          id="siteTag"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={siteTag}
                          onChange={(e) => setSiteTag(e.target.value)}
                          required
                        >
                          <option className="bg-white text-black" value="">Select Site Tag</option>
                          <option className="bg-white text-black" value="Genuine">Genuine</option>
                          <option className="bg-white text-black" value="Abandoned">Abandoned</option>
                          <option className="bg-white text-black" value="Scam">Scam</option>
                          <option className="bg-white text-black" value="Fake">Fake</option>
                          <option className="bg-white text-black" value="Unsure">Unsure</option>
                        </select>
                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="wallet"
                          type="text"
                          placeholder="tag"
                          value={siteTag} onChange={(e) => setSiteTag(e.target.value)} required
                        /> */}
                      </div>
                    </div>

                    <div className="mb-10">
                    <input
                          type="text"
                          id="blockchain"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Blockchain"
                          value={blockchain}
                          onChange={(e) => setblockchain(e.target.value)}
                        />
                    </div>

                    <div className="mb-10">
                      <textarea
                        style={border}
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Additional feedback"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <label className="text-white">Overall rating</label>
      <StarRating totalStars={10} onRatingChange={handleRatingChange} />

      {loading && (
                    <div className="flex justify-center items-center">
                    <div className="top-0 right-0 z-50 flex justify-center items-center p-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-200"></div>
                    </div>
                    <div className="text-green-200 text-center text-lg font-bold">Signing transaction on chain…</div>
                    </div>
                  )}

                    <div className="text-center pt-10">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          type="submit"
                          value="submit"
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>

                  
{
   msg == "success" && (
    <div style={bgverify} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative p-4 lg:w-1/4 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow bg-white">
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                {/* <h3 className="text-2xl font-semibold">
                Verify Your Registration
                </h3> */}
                <button 
                    onClick={gotoreviews}
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
                Thank you for making the online world safer and more transparent.
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
                onClick={gotoreviews}
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">My reviews</button>
              </div>

        </div>          
    </div>
</div>
)
}

{
   msg == "error" && (
    <p className="text-red-500">There is some issue in submitting your review. Try again after sometime.</p>
   )
}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      {/* <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16"
        >
          {loading ? (<Loader />) : (<ReviewContainer metaDataArray={metaDataArray} MyReviews={true}/>)}
        </motion.div> */}
    </motion.div>
  );
};

export default MyReviews;
