import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import ReviewContainer from '../Components/ReviewContainer';
// import { fetchMetadataURIAll, fetchMetadataURIBySiteURL, fetchMetadataURIBySiteSafety } from '../modules/fetch_metadataURI_from_graphql';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
// import { ReviewCreated } from '../graphql/types';
import Loader from '../Components/Loader';
import FilterButton from '../Components/reviewFilters';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import aptos from '../assets/Protocolicon.png';

const AllReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const connectWallet = async () => {
    navigate('/my-reviews');
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchReviews = async (page: number) => {
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
            Authorization: `Bearer ${auth}`,
          },
        };

        const reviewResults = await axios.get(
          `https://testnet.gateway.netsepio.com/api/v1.0/getreviews?page=${page}`,
          config
        );

        // const reviewResults = await fetch(`https://testnet.gateway.netsepio.com/api/v1.0/getreviews`, 
        
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
          return { transactionHash: review.transactionHash, metaData };
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

  // const handleFilterChange = async (siteSafety: string) => {
  //   let reviewResults;
  
  //   if (siteSafety === "all") {
  //     reviewResults = await fetchMetadataURIAll();
  //   } else {
  //     reviewResults = await fetchMetadataURIBySiteSafety(siteSafety);
  //   }
  
  //   if (reviewResults) {
  //     setReviews(reviewResults);
  //     const metaDataPromises = reviewResults.map(async (review) => {
  //       if (review.metadataURI && review.metadataURI.startsWith('ipfs://')) {
  //         const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
  //         const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
  //         return metaData;
  //       }
  //       return null;
  //     });
  //     const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
  //     setMetaDataArray(metaDataResults);
  //   } else {
  //     setMetaDataArray([]);
  //   }
  // };  
  
  // const handleSearch = async (siteURL: string) => {
  //   const reviewResults = await fetchMetadataURIBySiteURL(siteURL);
  //   if (reviewResults) {
  //     setReviews(reviewResults);
  //     const metaDataPromises = reviewResults.map(async (review) => {
  //       if (review.metadataURI && review.metadataURI.startsWith('ipfs://')) {
  //         const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
  //         const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
  //         return metaData;
  //       }
  //       return null;
  //     });
  //     const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
  //     setMetaDataArray(metaDataResults);
  //   } else {
  //     setMetaDataArray([]);
  //   }
  // };

  const style = {
    color: '#11D9C5',
};

const style2 = {
  backgroundColor: '#11D9C5',
};

const background = {
  backgroundColor: '#141a31'
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
      <section className="pt-12">
            <div className="py-20 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
                    Discover <span style={style}>Verified Reviews</span><br/>Empower Your Online Security<br/>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
                    Your go-to for reinforcing online security
                    </p>
                    <div className='mb-4 space-x-0 md:space-x-2 md:mb-8 inline-flex items-center justify-center w-full font-bold px-6 py-3 mb-2 text-lg text-black rounded-2xl sm:w-auto sm:mb-0 focus:ring focus:ring-green-300 focus:ring-opacity-80' style={style2}>
                      <button onClick={connectWallet}>Submit Reviews</button>
                    </div>
                </div>
            </div>
      </section>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
        {/* <SearchBar onSearch={handleSearch} /> */}
        {/* <FilterButton onFilterChange={handleFilterChange} /> */}
        <div className="inline-flex items-center justify-center w-full">
        <div className="text-white border rounded-full py-2 px-6 mt-10">All reviews</div>
        </div>
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Your Path to Safe and Secure Browsing</h1>
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
            <ReviewContainer metaDataArray={metaDataArray} reviews={reviews} MyReviews={false}/>
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

export default AllReviews;