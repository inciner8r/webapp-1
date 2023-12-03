import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import MyReviewContainer from '../Components/Myreviewcontainer';
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
import noreview from '../assets/noreviews.png';
import ButtonNavigation from '../Components/Buttonnavigation';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const ViewMyReviews: React.FC = () => {
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
      const wallet = Cookies.get("platform_wallet");

      try {

        const config = {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        };

        const reviewResults = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/getreviews?page=${page}&voter=${wallet}`,
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
          const ipfsUrl = `https://nftstorage.link/ipfs/${review.metaDataUri.split('ipfs://')[1]}`;
          const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
          return metaData;
        }
        return null;
      });
  
      const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
      console.log("metaDataResults",metaDataResults);
      setMetaDataArray(metaDataResults);
    };
  
    if (reviews?.length > 0) {
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
  
//   const handleSearch = async (siteURL: string) => {
//     const reviewResults = await fetchMetadataURIBySiteURL(siteURL);
//     if (reviewResults) {
//       setReviews(reviewResults);
//       const metaDataPromises = reviewResults.map(async (review) => {
//         if (review.metadataURI && review.metadataURI.startsWith('ipfs://')) {
//           const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
//           const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
//           return metaData;
//         }
//         return null;
//       });
//       const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
//       setMetaDataArray(metaDataResults);
//     } else {
//       setMetaDataArray([]);
//     }
//   };

//   const style = {
//     color: '#11D9C5',
// };

const style2 = {
  backgroundColor: '#11D9C5',
};

const style3 = {
  backgroundColor: '#222944',
};

const background = {
  backgroundColor: '#141a31'
}

const myreviews = async () => {
  const count=metaDataArray?.length;
  navigate('/my-reviews',{ state: { count } });
};

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};


const handleNavigation = (page: string) => {
  console.log(`Navigating to ${page} page from ReviewsPage...`);
  // Additional navigation logic if needed
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
        {/* <SearchBar onSearch={handleSearch} /> */}
        {/* <FilterButton onFilterChange={handleFilterChange} /> */}
        {/* <div className="inline-flex items-center justify-center w-full">
        <button className="text-white border rounded-full py-2 px-6 mt-10">My reviews</button>
        </div>
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Your Path to Safe and Secure Browsing</h1>
        </div> */}

        {/* <div className="inline-flex items-center justify-center w-full gap-4 mb-10">
        <button className="text-white border rounded-lg px-10 py-8">Reviews</button>
        <button className="text-white border rounded-lg px-10 py-8">Projects</button>
        <button className="text-white border rounded-lg px-12 py-8">VPNs</button>
        </div> */}

<ButtonNavigation onNavigate={handleNavigation} count={metaDataArray? metaDataArray.length : 0}/>
<div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-start text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">My Reviews</span>
                  </h1>
                  </div>
                  </div>

        {loading ? (
            <Loader />
          ) : !reviews || reviews?.length == 0 ? (
            <motion.div
            className="w-full max-w-5xl mx-auto py-10 rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={style3}
          >
             <div className='lg:flex md:flex lg:p-20 md:p-20 p-10'>
              <div className='lg:w-1/3 md:w-1/3 w-full'>
              <img src={noreview}/>
              </div>
              <div className='lg:w-2/3 md:w-2/3 w-full'>
              <h2 className="text-4xl font-semibold text-white">Ready to make a difference with your reviews?</h2>
              <div className='mt-10'>
                <button style={style2} onClick={myreviews} className='py-4 px-10 rounded-lg font-bold'>Submit Reviews</button>
              </div>
              </div>
            </div>
          </motion.div>
          ) : (
            <MyReviewContainer metaDataArray={metaDataArray} MyReviews={false}/>
          )}

{ reviews && reviews?.length > 0 && (
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

          { reviews && reviews?.length > 0 && (
          <div className='text-center mt-10'>
            <button style={style2} onClick={myreviews} className='py-4 px-10 rounded-lg font-bold'>Add more reviews</button>
          </div>
          )}

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