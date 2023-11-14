import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import ReviewContainer from '../Components/ReviewContainer';
import { fetchMetadataURIAll, fetchMetadataURIBySiteURL, fetchMetadataURIBySiteSafety } from '../modules/fetch_metadataURI_from_graphql';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { ReviewCreated } from '../graphql/types';
import Loader from '../Components/Loader';
import FilterButton from '../Components/reviewFilters';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import aptos from '../assets/Protocolicon.png';

const ViewMyReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const connectWallet = async () => {
    navigate('/my-reviews');
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      // const reviewResults = await fetchMetadataURIAll();
      // if (reviewResults) {
      //   setReviews(reviewResults);
      // }

      const auth = Cookies.get("platform_token");

      try {

        const config = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `${auth}`,
          },
        };

        const reviewResults = await axios.get(
          `https://aptos.gateway.netsepio.com/api/v1.0/getreviews`,
          config
        );

        // const reviewResults = await fetch(`https://aptos.gateway.netsepio.com/api/v1.0/getreviews`, 
        
        // { 
        //   method: 'GET', 
        //   headers: {
        //   'Authorization': `Bearer ${auth}`,
        //   'Content-Type': 'application/json', }
        // });
        
        // if (reviewResults.ok) {
        //   const reviewsData = await reviewResults.json();
        //   setReviews(reviewsData);
        // } else {
        //   console.error('Failed to fetch reviews:', reviewResults.statusText);
        // }
        console.log(reviewResults);
        const reviewsData = await reviewResults.data.payload;
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchMetaData = async () => {
      const metaDataPromises = reviews.map(async (review) => {
        if (review.metaDataUri && review.metaDataUri.startsWith('ipfs://')) {
          const ipfsUrl = `https://ipfs.io/ipfs/${review.metaDataUri.split('ipfs://')[1]}`;
          const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
          return metaData;
        }
        return null;
      });
  
      const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
      console.log("metaDataResults",metaDataResults);
      setMetaDataArray(metaDataResults);
    };
  
    if (reviews.length > 0) {
      setLoading(true);
      fetchMetaData().finally(() => setLoading(false));
    }
  }, [reviews]);  

  const handleFilterChange = async (siteSafety: string) => {
    let reviewResults;
  
    if (siteSafety === "all") {
      reviewResults = await fetchMetadataURIAll();
    } else {
      reviewResults = await fetchMetadataURIBySiteSafety(siteSafety);
    }
  
    if (reviewResults) {
      setReviews(reviewResults);
      const metaDataPromises = reviewResults.map(async (review) => {
        if (review.metadataURI && review.metadataURI.startsWith('ipfs://')) {
          const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
          const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
          return metaData;
        }
        return null;
      });
      const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
      setMetaDataArray(metaDataResults);
    } else {
      setMetaDataArray([]);
    }
  };  
  
  const handleSearch = async (siteURL: string) => {
    const reviewResults = await fetchMetadataURIBySiteURL(siteURL);
    if (reviewResults) {
      setReviews(reviewResults);
      const metaDataPromises = reviewResults.map(async (review) => {
        if (review.metadataURI && review.metadataURI.startsWith('ipfs://')) {
          const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
          const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
          return metaData;
        }
        return null;
      });
      const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
      setMetaDataArray(metaDataResults);
    } else {
      setMetaDataArray([]);
    }
  };

  const style = {
    color: '#11D9C5',
};

const style2 = {
  backgroundColor: '#11D9C5',
};

const background = {
  backgroundColor: '#141a31'
}
  

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="py-10"
        style={background}
      >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
        {/* <SearchBar onSearch={handleSearch} /> */}
        {/* <FilterButton onFilterChange={handleFilterChange} /> */}
        <div className="inline-flex items-center justify-center w-full">
        <button className="text-white border rounded-full py-2 px-6 mt-10">My reviews</button>
        </div>
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Your Path to Safe and Secure Browsing</h1>
        </div>

        {loading ? <Loader /> : <ReviewContainer metaDataArray={metaDataArray} MyReviews={false}/>}

<div className="mb-60 mt-20">
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Backed by</h1>
        </div>

        <div className="inline-flex items-center justify-center w-full">
        <img src={aptos} className="w-26 h-10"/>
        <h1 className="text-white text-3xl">Aptos</h1>
        </div>
        </div>

      </motion.div>
    </motion.div>
  );  
};

export default ViewMyReviews;