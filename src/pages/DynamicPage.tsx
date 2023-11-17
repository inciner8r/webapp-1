import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import DomainReviewContainer from '../Components/Domainreviewcontainer';
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
import StarRatingshow from "../Components/StarRatingshow";

const DynamicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [siteUrl, setsiteurl] = useState<string>("");
  const [siteRating, setsiterating] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const connectWallet = async () => {
    navigate('/my-reviews');
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchReviews = async () => {
      const auth = Cookies.get("platform_token");

      try {

        const config = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };

        const reviewResults = await axios.get(
          `https://testnet.gateway.netsepio.com/api/v1.0/getreviews?page=1&domain=${id}`,
          config
        );
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
      setsiteurl(metaDataResults[0]?.siteUrl);

      // Calculate the average siteRating
      const totalSiteRating = metaDataResults.reduce((sum, metaData) => sum + (metaData?.siteRating || 0), 0);
      const averageSiteRating = metaDataResults.length > 0 ? totalSiteRating / metaDataResults.length : 0;
      console.log("averageSiteRating", averageSiteRating);
      setsiterating(averageSiteRating);

      console.log("siteUrl", siteUrl);
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

        <div className="mx-auto max-w-8xl px-16">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12">
        <h1 className="text-white text-3xl font-bold">Reviews for {id?.replace('.com', '')}</h1>
        <div className="flex gap-6">
          <div>
        <a href={siteUrl} target="_blank"><p className='my-4' style={style}>{siteUrl}</p></a>
        </div>
        <div className="-mt-2">
        {siteRating && (
                          <div className="mt-4">
                            <StarRatingshow
                              totalStars={10}
                              rating={siteRating}
                            />
                          </div>
                        )}
                        </div>
          </div>
        </div>
        </div>

        {loading ? <Loader /> : <DomainReviewContainer metaDataArray={metaDataArray} MyReviews={false}/>}

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

export default DynamicPage;
