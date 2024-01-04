"use client"
import React, { useState, useEffect } from 'react';
import MyReviewContainer from '../../../components/Myreviewcontainer';
import { fetchMetadataFromIPFS } from '../../../modules/fetch_metadata_from_ipfs';
import Loader from '../../../components/Loaderallreviews';
import Main from '../../../components/MyReviews/main';
import Cookies from 'js-cookie';
import axios from "axios";
import aptos from '../../../public/Protocolicon.png';
import noreview from '../../../public/noreviews.png';
import Image from 'next/image'
import WalletNotFound from '../../../components/MyReviews/walletNotFound';
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

const ViewMyReviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagestatus, setpagestatus] = useState<string>("my");
  
  const navigate1 = (path: string) => {
    window.location.href = path;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);

  const connectWallet = async () => {
    navigate1('/my-reviews');
  };
  
  useEffect(() => {
    setLoading(true);
    const fetchReviews = async (page: number) => {

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


const style2 = {
  backgroundColor: '#11D9C5',
};

const style3 = {
  backgroundColor: '#222944',
};

const background = {
  backgroundColor: '#141a31'
}

const navigate = (path: string, state: Record<string, any>) => {
    const queryString = new URLSearchParams(state).toString();
    const urlWithState = queryString ? `${path}?${queryString}` : path;
    window.location.href = urlWithState;
  };
  
  const myreviews = async () => {
    const count = metaDataArray?.length;
    navigate('/my-reviews', { count });
  };

const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};


const handleNavigation = (page: string) => {
  console.log(`Navigating to ${page} page from ReviewsPage...`);
};

const loggedin = Cookies.get("platform_token");
  const wallet = Cookies.get("platform_wallet");

  if (!loggedin && !wallet) {
    return (
      <div>
        <WalletNotFound />
      </div>
    )
  }
  

  return (
    <div
        className=""
        style={background}
      >
      <div
        className=""
      >

        <div className="flex text-white ml-10 text-2xl font-bold">Reviews</div>

{/* <ButtonNavigation onNavigate={handleNavigation} count={metaDataArray? metaDataArray.length : 0}/> */}
<div className="flex p-6 text-white ml-4 text-xs">
                    <button className="p-4 px-3 rounded-l-lg" 
                    style={{
                      backgroundColor: pagestatus === 'submit' ? '#4B5995' : '#222944',
                    }}
                     onClick={()=>setpagestatus("submit")}>Submit Reviews</button>
                    <button className="p-4 px-6 rounded-r-lg" 
                    style={{
                      backgroundColor: pagestatus === 'my' ? '#4B5995' : '#222944',
                    }}
                     onClick={()=>setpagestatus("my")}>My Reviews</button>
                  </div>

{
   pagestatus=='my' && (
<>
{/* <div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 className="mb-8 text-start text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">My Reviews</span>
                  </h1>
                  </div>
                  </div> */}

        {loading ? (
            <Loader />
          ) : !reviews || reviews?.length == 0 ? (
            <div
            className="w-full max-w-5xl mx-auto py-10 rounded-xl"
            style={style3}
          >
             <div className='lg:flex md:flex lg:p-20 md:p-20 p-10'>
              <div className='lg:w-1/3 md:w-1/3 w-full'>
              <Image src={noreview} alt=""/>
              </div>
              <div className='lg:w-2/3 md:w-2/3 w-full'>
              <h2 className="text-4xl font-semibold text-white">Ready to make a difference with your reviews?</h2>
              <div className='mt-10'>
                <button style={style2} onClick={myreviews} className='py-4 px-10 rounded-lg font-bold'>Submit Reviews</button>
              </div>
              </div>
            </div>
          </div>
          ) : (
            <MyReviewContainer metaDataArray={metaDataArray}/>
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

          {/* { reviews && reviews?.length > 0 && (
          <div className='text-center mt-10 mb-20'>
            <button style={style2} onClick={myreviews} className='py-4 px-10 rounded-lg font-bold'>Add more reviews</button>
          </div>
          )} */}

</>
          )
        }

{
   pagestatus == 'submit' && (
<Main/>
   )
}

      </div>
    </div>
  );  
};

export default ViewMyReviews;