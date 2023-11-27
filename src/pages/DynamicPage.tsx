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
import { removePrefix } from "../modules/Utils/ipfsUtil";

interface DomainData {
  category: string;
  title: string;
  blockchain: string;
  description: string;
  headline: string;
  logoHash: string;
  creatorName:string;
}

const DynamicPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [domaindata, setdomaindata] = useState<DomainData | null>(null);
  const [siteUrl, setsiteurl] = useState<string>("");
  const [siteRating, setsiterating] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const connectWallet = async () => {
    navigate('/my-reviews');
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchReviews = async (page: number) => {
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
          `https://testnet.gateway.netsepio.com/api/v1.0/getreviews?page=${page}&domain=${id}`,
          config
        );
        console.log(reviewResults);
        const reviewsData = await reviewResults.data.payload;
        if (reviewResults.data.message === "No reviews found") {
          console.log("No reviews found");
          setReviews([]);
        } else {
          setReviews(reviewsData);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchReviewsData = async () => {
      await fetchReviews(currentPage);
    };
  
    fetchReviewsData().finally(() => setLoading(false));
  }, [currentPage]);

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


  useEffect(() => {
    const getdomaindata = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(`https://testnet.gateway.netsepio.com/api/v1.0/domain?page=1&verified=true&domainName=${id}`, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
            // Filter the data based on the domain ID
            // const domainid = localStorage.getItem('domainId');
            const payload: any[] = response.data.payload;
    const filteredData = payload.filter(item => item?.domainName === id);
    setdomaindata(filteredData.length > 0 ? filteredData[0] : null);
          console.log("domain data", filteredData)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    getdomaindata();
  }, []);

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

const background2 = {
  backgroundColor: '#222944'
}

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

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

{ domaindata && (
        <div className="mx-auto max-w-8xl px-16">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12">
            <div className="flex">
              <div className="w-1/4">
          <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(domaindata?.logoHash)}`}
                      className=""
                      width="200"
                      height="200"
                    />
                    </div>
                    <div className="w-3/4">
        <h1 className="text-white text-3xl font-bold">{id?.replace(/^www\.|\.com$/g, '')}</h1>
        <div className="flex gap-6">
        <div>
        <p className='my-4' style={style}>{domaindata?.title}</p>
        </div>
          <div>
        <a href={siteUrl} target="_blank"><p className='my-4' style={style}>{siteUrl}</p></a>
        </div>
        <div>
        <p className='my-4' style={style}>{domaindata?.category}</p>
        </div>
        <div>
        <p className='my-4' style={style}>{domaindata?.blockchain}</p>
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
          <div className='text-white'>Creator Name : {domaindata?.creatorName}</div>
          <div style={background2} className='p-6 mt-10 rounded-xl'>
          <div className='text-white'>Headline : {domaindata?.headline}</div>
          <div className='text-white'>Description : {domaindata?.description}</div>
          </div>
          </div>
          </div>
        </div>
        </div>
        )}

        <div className="mx-auto max-w-8xl px-16">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12">
          <h1 className="text-white text-3xl font-bold mt-20">Reviews for {id?.replace(/^www\.|\.com$/g, '')}</h1>
       { !domaindata && ( 
          <div className="flex gap-8">
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
)} 
        </div>
        </div>
        

        {loading ? (
            <Loader />
          ) : reviews.length == 0 ? (
            <motion.div
            className="w-full text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-semibold text-gray-700">No Reviews Found</h2>
          </motion.div>
          ) : (
            <DomainReviewContainer metaDataArray={metaDataArray} reviews={reviews} MyReviews={false}/>
          )}

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
