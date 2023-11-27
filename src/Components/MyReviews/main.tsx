import React, { useEffect, useState } from "react";
import ReviewContainer from "../../Components/ReviewContainer";
import { fetchMetadataFromIPFS } from "../../modules/fetch_metadata_from_ipfs";
import { createIpfsUrl } from "../../modules/ipfs_url_creator";
import { fetchMetadataURIByUser } from "../../modules/fetch_metadataURI_from_graphql";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import StarRating from "../../Components/StarRating"
import SubmitReview from "../../Components/SubmitReview";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { storeMetaData, createReview } from "../../modules/submit-review";

const MyReviews: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  // const [category] = useState<string>("website");
  const [siteTag, setSiteTag] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [siteSafety, setSiteSafety] = useState<string>("");
  const [siteType, setSiteType] = useState<string>("");
  const [msg, setmsg] = useState<string>("");

  const wallet = Cookies.get("platform_wallet");

  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [selectedRating, setSelectedRating] = useState<number>(0);

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
  };

  // State to check if the user is connected to Metamask:
  const walletData = useSelector((state: RootState) => state.wallet.walletData);

  const walletAddress = walletData;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      if (walletAddress) {
        const reviewCreateds = await fetchMetadataURIByUser(walletAddress);
        if (reviewCreateds) {
          const metaDataPromises = reviewCreateds.map((reviewCreated) =>
            fetchMetadataFromIPFS(
              createIpfsUrl(reviewCreated.metadataURI),
              reviewCreated.tokenId
            )
          );
          const allMetaData = await Promise.all(metaDataPromises);
          setMetaDataArray(allMetaData);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [walletAddress]); // Change the dependency to walletAddress

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
      siteRating: selectedRating
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
      const response = await fetch(`https://testnet.gateway.netsepio.com/api/v1.0/delegateReviewCreation`, {
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
                          placeholder="URL"
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
                          <option value="">Select site type</option>
                          <option value="Website">Website</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="Browser Extension">
                            Browser Extension
                          </option>
                          <option value="Software">Software</option>
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
                          <option value="">Select safety rating</option>
                          <option value="Safe">Safe</option>
                          <option value="Mostly Safe">Mostly Safe</option>
                          <option value="Adware Issues">Adware Issues</option>
                          <option value="Malware Threats">Malware Threats</option>
                          <option value="Spyware Risks">Spyware Risks</option>
                          <option value="Phishing concerns">Phishing concerns</option>
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
                          <option value="">Select Category</option>
                          <option value="DeFi">DeFi</option>
                          <option value="NFT Tooling">NFT Tooling</option>
                          <option value="Gaming">Gaming</option>
                          <option value="Wallets">Wallets</option>
                          <option value="Tooling">Tooling</option>
                          <option value="Stablecoins">Stablecoins</option>
                          <option value="Security">Security</option>
                          <option value="Marketplaces">Marketplaces</option>
                          <option value="Launchpads">Launchpads</option>
                          <option value="Infra">Infra</option>
                          <option value="Explorers">Explorers</option>
                          <option value="Bridges">Bridges</option>
                          <option value="Social">Social</option>
                          <option value="Others">Others</option>
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
                          <option value="">Select Site Tag</option>
                          <option value="Genuine">Genuine</option>
                          <option value="Hate">Hate</option>
                          <option value="Scam">Scam</option>
                          <option value="Fake">Fake</option>
                          <option value="Stereotype">Stereotype</option>
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
                      <textarea
                        style={border}
                        id="message"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your thoughts here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <label className="text-white">Rate the website from 1 to 10</label>
      <StarRating totalStars={10} onRatingChange={handleRatingChange} />

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

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
              {/* <Loader/> */}
            </div>
          </div>
        </div>)}
{
   msg == "success" && (
    <p className="text-green-500">Thankyou! Your review has been submitted successfully.</p>
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
