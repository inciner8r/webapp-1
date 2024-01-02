"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import ReviewContainer from '../../components/ReviewContainer';
import { fetchMetadataFromIPFS } from '../../modules/fetch_metadata_from_ipfs';
import Loader from '../../components/Loaderallreviews';
// import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from "axios";
import aptos from '../../public/Protocolicon.png';
import google from '../../public/googlecloud.png';
import icon from '../../public/Group.png';
import landing1 from '../../public/landing1.png';
import landing2 from '../../public/landing2.png';
import landing3 from '../../public/landing3.png';
import landing4 from '../../public/landing4.png';
import netsepio from '../../public/netsepio_logo_light.png';
import Navbar from '../../components/Navbar';
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

export default function Home() {

  const [reviews, setReviews] = useState<any[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [myreviews, setmyReviews] = useState<any[]>([]);
  const [mymetaDataArray, setmyMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isNextPageDisabled, setNextPageDisabled] = useState<boolean>(false);

  const navigate = (path: string, state: Record<string, any>) => {
    const queryString = new URLSearchParams(state).toString();
    const urlWithState = queryString ? `${path}?${queryString}` : path;
    window.location.href = urlWithState;
  };
  
  const connectWallet = async () => {
    const count = mymetaDataArray?.length;
    navigate('/my-reviews', { count });
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
          `${REACT_APP_GATEWAY_URL}api/v1.0/getreviews?page=${page}`,
          config
        );
        console.log("current",reviewResults);
        const reviewsData = await reviewResults.data.payload;

        // const reviewResultsnextpage = await axios.get(
        //   `${REACT_APP_GATEWAY_URL}api/v1.0/getreviews?page=${page+1}`,
        //   config
        // );
        // console.log("next",reviewResultsnextpage);
        // const nextReviewsData = await reviewResultsnextpage.data.payload;

        // if (nextReviewsData.data.message === "No reviews found") {
        //   setNextPageDisabled(true);
        // }

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

        // const reviewResults = await axios.get(
        //   `${REACT_APP_GATEWAY_URL}api/v1.0/getreviews?page=${page}`,
        //   config
        // );
        // console.log("current",reviewResults);
        // const reviewsData = await reviewResults.data.payload;

        const reviewResultsnextpage = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/getreviews?page=${page+1}`,
          config
        );
        console.log("next",reviewResultsnextpage);
        const nextReviewsData = await reviewResultsnextpage.data.payload;

        // if (nextReviewsData.data.message === "No reviews found") {
          // setNextPageDisabled(true);
        // }
        setNextPageDisabled(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setNextPageDisabled(true);
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

const style = {
    color: '#11D9C5',
};

const style2 = {
  backgroundColor: '#11D9C5',
};

const background = {
  backgroundColor: '#141a31'
}

const bgbutton = {
  backgroundColor: 'rgba(255, 255, 255, 0.08)'
}

const bgbutton2 = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)'
}

const graystyle = {
  color: '#788AA3'
}


const handleNextPage = () => {
  setCurrentPage((prevPage) => prevPage + 1);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
};

const containerStyle = {
  backgroundImage: 'radial-gradient(circle, #222944, #141a31, #141a31)',
  height: '100vh',
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
        setmyReviews([]);
      } else {
        setmyReviews(reviewsData);
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
    const metaDataPromises = myreviews.map(async (review) => {
      if (review.metaDataUri && review.metaDataUri.startsWith('ipfs://')) {
        const ipfsUrl = `https://nftstorage.link/ipfs/${review.metaDataUri.split('ipfs://')[1]}`;
        const metaData = await fetchMetadataFromIPFS(ipfsUrl, review.id);
        return metaData;
      }
      return null;
    });

    const metaDataResults = (await Promise.all(metaDataPromises)).filter((result) => result !== null);
    console.log("metaDataResults",metaDataResults);
    setmyMetaDataArray(metaDataResults);
  };

  if (reviews?.length > 0) {
    setLoading(true);
    fetchMetaData().finally(() => setLoading(false));
  }
}, [reviews]);

  return (
    <main className="flex flex-col items-center justify-between">
    <Navbar/>
      <section className="pt-28 px-4" style={containerStyle}>
            <div className="mx-auto my-20 w-full">
                <div className="w-full mx-auto text-left md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl">
                    Discover <span style={style}>Verified Reviews</span><br/>Empower Your Online Security<br/>
                    </h1>
                    <p className="px-0 text-lg text-gray-300 md:text-2xl lg:px-24">
                    Connect wallet now to submit reviews on chain for <span style={style}>FREE</span>
                    </p>
                    <p className="px-0 mb-8 text-lg md:text-md lg:px-24" style={graystyle}>
                    (Wallet address is required to receive “Reviews NFT” minted)
                    </p>
                    <div className='mb-4 space-x-0 md:space-x-2 md:mb-8 inline-flex items-center justify-center w-full px-3 py-2 mb-2 text-md text-black rounded-lg sm:w-auto sm:mb-0 focus:ring focus:ring-green-300 focus:ring-opacity-80' style={style2}>
                      <button onClick={connectWallet}>Submit Reviews</button>
                    </div>
                </div>
            </div>
      </section>

      <section className="mb-40">
            <div className="py-0 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12">
                      <div className="lg:flex md:flex">
                      <div className='lg:w-1/2 md:w-1/2 my-auto'>
                          <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
                          Review as NFT
                        </h1>
                        <p className="pb-20 text-lg text-gray-300 md:text-lg">
                        Review stored as NFT on Aptos chain free, no gas fees included
                        </p>
                      </div>
                      <div className="flex relative lg:w-1/2 md:w-1/2">
                        <Image src={landing1} className="flex-1" alt=""/>
                        <Image src={landing2} alt="" className="absolute lg:right-[-80px] lg:bottom-[-120px] lg:block hidden w-1/2" />
                      </div>

                      </div>
                      <div className="lg:flex md:flex mt-20">
                      <div className="flex relative lg:w-1/2 md:w-1/2">
                        <Image src={landing3} className="flex-1" alt=""/>
                        <Image src={landing4} alt="" className="absolute lg:right-[-160px] lg:bottom-[-80px] lg:block hidden w-2/3" />
                      </div>
                      <div className='lg:w-1/2 md:w-1/2 my-auto'>
                          <h1 className="text-right mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
                          Project owner verification
                        </h1>
                        <p className="text-right pb-20 text-lg text-gray-300 md:text-lg">
                        Vouch and Verify for your project and promote more visibility.
                        </p>
                      </div>
                      </div>
                </div>
            </div>
      </section>

        { metaDataArray && metaDataArray?.length > 0 && (
          <>
        {/* <div className="inline-flex items-center justify-center w-full">
        <div className="text-white border rounded-full py-2 px-6 mt-10">All reviews</div>
        </div> */}
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Your Path to Safe and Secure Browsing</h1>
        </div>
        </>
        )}

<div className="py-0 mx-auto max-w-5xl">
        {loading ? (
            <Loader />
          ) : reviews.length == 0 ? (
            <div
            className="w-full text-center py-40"
          >
            <h2 className="text-4xl font-semibold text-white">Upcoming Reviews</h2>
          </div>
          ) : (
            <ReviewContainer metaDataArray={metaDataArray} reviews={reviews} MyReviews={false}/>
          )}
          </div>

{ metaDataArray && metaDataArray?.length > 0 && (
          <div className="inline-flex items-center justify-center w-full mt-4">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='text-white'>
            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
  <path d="M160,220a11.96287,11.96287,0,0,1-8.48535-3.51465l-80-80a12.00062,12.00062,0,0,1,0-16.9707l80-80a12.0001,12.0001,0,0,1,16.9707,16.9707L96.9707,128l71.51465,71.51465A12,12,0,0,1,160,220Z"/>
</svg>
            </button>
            <span className="mx-2 text-gray-500">Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={isNextPageDisabled} className='text-white'>
            <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
  <path d="M96,220a12,12,0,0,1-8.48535-20.48535L159.0293,128,87.51465,56.48535a12.0001,12.0001,0,0,1,16.9707-16.9707l80,80a12.00062,12.00062,0,0,1,0,16.9707l-80,80A11.96287,11.96287,0,0,1,96,220Z"/>
</svg>
            </button>
          </div>
)}

      {/* link to wiregaurd  */}
      <section>
            <div className="max-w-6xl mx-auto lg:rounded-3xl md:rounded-3xl rounded-none my-40 webappbg py-20">
            <div className="flex lg:flex-row md:flex-row flex-col lg:p-20 md:p-10 p-4">
            <div className="lg:w-2/3 md:w-2/3">
              <h2 className="lg:text-5xl md:text-5xl font-bold text-4xl text-white lg:p-0 md:p-0 p-4 align">
              Secure Your Connection,
Download and Install the 
WireGuard
              </h2>
            </div>
            <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8 lg:w-1/3 md:w-1/3">
              <div className="space-y-4 text-gray-300">
                <a href="https://www.wireguard.com/install/" target="_blank">
                <div className="rounded-lg p-2 bgcolor">
                  <div className="flex ">
                    <div style={bgbutton2} className="rounded-xl p-2">
                      <Image src={icon} alt="" className="h-6 w-6 object-center lg:mt-1 md:mt-4 mt-1"/>
                    </div>
                    <div className="pl-3 pt-3 py-4">
                <p className="text-white font-bold">
                Download Wiregaurd
              </p>
            </div>
          </div>
                </div>
          </a>
            </div>
          </div>
          </div>
          </div>
        </section>

<div className="mb-60 mt-20">
        <div className="inline-flex items-center justify-center w-full my-10">
        <h1 className="text-white text-3xl font-bold">Backed by</h1>
        </div>

        <div className="lg:inline-flex md:inline-flex items-center justify-center w-full gap-10">
          <div className="flex gap-1 justify-between center">
        <Image src={aptos} className="w-26 h-12 -mt-1" alt=""/>
        <h1 className="text-white text-3xl">Aptos</h1>
        </div>
        <div className="flex gap-1 justify-between center">
        <Image src={google} className="w-10 h-8" alt=""/>
        <h1 className="text-white text-3xl">Google Cloud</h1>
        </div>
        </div>
        </div>

        <div className="pt-10 pt-3 sm:pt-3 lg:pt-3 w-full lg:px-20" style={background}>
      <footer className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="lg:flex md:flex items-center pt-6 justify-between max-w-screen-xl mx-auto">
          <nav className="mb-4 flex flex-wrap justify-center md:justify-start">
          <Image src={netsepio} alt="netsepio logo" className="h-10 w-10"/>
            <a href="/" className="text-2xl font-bold leading-12 text-white mt-1">NetSepio</a>
          </nav>
          <nav className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start md:gap-6">
            {/* <a href="https://chrome.google.com/webstore/detail/netsepio/bbkfclgnbddljhepbfpongcollhocghd" className="transition duration-100 text-white"></a> */}
            <a href="https://github.com/NetSepio" target="_blank" className="transition duration-100 text-white">Collaborate</a>
          </nav>
    
          <div className="flex justify-between center">

          <a href="https://discordapp.com/invite/5uaFhNpRF6" target="_blank" className="transition duration-100 hover:text-green-400 active:text-green-600" style={style}>
              <svg width="45" height="40" viewBox="0 0 54 47" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_5999_153)">
                <path d="M31.458 7C31.8427 7 32.3254 7.09488 32.7131 7.18419C34.0648 7.49117 35.6675 7.8721 36.8053 8.67443C37.8644 9.42094 38.6873 10.7228 39.3231 12.0456C40.645 14.8014 41.5645 18.4754 41.8824 21.2689C42.0339 22.5945 42.071 23.9284 41.7992 24.8257C41.6655 25.2666 41.3759 25.5987 41.1724 25.8024C40.5515 26.4205 39.7523 26.8824 38.9621 27.3024L38.57 27.5103C38.3117 27.6453 38.0517 27.7774 37.7902 27.9066L37.0148 28.2833L35.9498 28.7815L35.0927 29.1778C34.7791 29.3253 34.4199 29.3639 34.079 29.2866C33.738 29.2093 33.4371 29.0211 33.2297 28.7553C33.0222 28.4896 32.9216 28.1635 32.9456 27.8347C32.9696 27.506 33.1166 27.1958 33.3608 26.9592L32.7161 25.748C30.8624 26.2772 28.9348 26.5424 26.9974 26.535C24.9624 26.535 23.021 26.2559 21.2787 25.748L20.6355 26.9564C20.8806 27.1926 21.0286 27.5028 21.0533 27.8318C21.078 28.1608 20.9779 28.4874 20.7707 28.7537C20.5634 29.0199 20.2625 29.2086 19.9213 29.2862C19.58 29.3639 19.2205 29.3254 18.9065 29.1778L18.0985 28.801C17.2013 28.3852 16.3042 27.9694 15.4308 27.5103C14.5187 27.0317 13.5518 26.5224 12.8284 25.801C12.5397 25.5269 12.3248 25.192 12.2016 24.8243C11.9282 23.9284 11.9669 22.5959 12.1169 21.2689C12.4348 18.4754 13.3542 14.8014 14.6777 12.0456C15.3119 10.7228 16.1348 9.42094 17.1939 8.67443C18.3317 7.8721 19.9344 7.49117 21.2861 7.18419C21.6738 7.09488 22.1551 7 22.5413 7C22.7549 6.99983 22.966 7.04294 23.1603 7.12641C23.3546 7.20987 23.5274 7.33172 23.667 7.48364C23.8066 7.63555 23.9096 7.81397 23.9691 8.00671C24.0287 8.19944 24.0432 8.40197 24.0118 8.60047C25.0003 8.46308 25.9982 8.39452 26.9974 8.39536C28.0238 8.39536 29.0264 8.46512 29.989 8.60187C29.9573 8.40326 29.9717 8.20058 30.0311 8.00767C30.0905 7.81476 30.1935 7.63617 30.3331 7.48409C30.4727 7.33201 30.6456 7.21003 30.84 7.12649C31.0344 7.04294 31.2442 6.9998 31.458 7ZM33.4692 10.2972C33.2464 10.2302 33.1929 10.2595 33.1127 10.3851L33.0206 10.5414C32.7805 10.928 32.416 11.233 31.9796 11.4126C31.5431 11.5921 31.0573 11.6369 30.592 11.5405C29.4107 11.3023 28.2056 11.1834 26.9974 11.1861C25.7319 11.1861 24.5213 11.3116 23.4028 11.5405C22.9375 11.6369 22.4517 11.5921 22.0152 11.4126C21.5788 11.233 21.2143 10.928 20.9742 10.5414L20.8821 10.3865C20.8034 10.2609 20.7499 10.2316 20.5286 10.2972C19.9998 10.4549 19.4324 10.6237 18.9764 10.907C18.5501 11.207 17.9812 11.9535 17.3855 13.194C16.2477 15.5619 15.3565 19.06 15.0713 21.5661C15.0119 22.0949 14.9807 22.5484 14.9733 22.9224V23.3326C14.9792 23.581 14.9985 23.7777 15.0253 23.9201C15.4025 24.2675 15.869 24.5396 16.3368 24.7894L17.3499 25.3154L18.0124 25.6433L18.553 24.6275C18.2913 24.3984 18.1263 24.0882 18.0886 23.754C18.0508 23.4197 18.1427 23.0839 18.3474 22.8083C18.5521 22.5326 18.8559 22.3356 19.2029 22.2535C19.5498 22.1715 19.9167 22.2098 20.236 22.3615C22.0422 23.214 24.392 23.7443 26.9974 23.7443C29.6013 23.7443 31.9526 23.2112 33.7588 22.3629C34.0645 22.219 34.4136 22.1786 34.7473 22.2485C35.0809 22.3183 35.3787 22.4942 35.5904 22.7463C35.8021 22.9985 35.9148 23.3115 35.9093 23.6326C35.9039 23.9537 35.7807 24.2632 35.5606 24.5089L35.4418 24.6275L35.9824 25.6461C36.4251 25.4312 36.8692 25.2038 37.3148 24.9722C37.8941 24.6708 38.5031 24.354 38.974 23.9215C39.0007 23.7777 39.0186 23.581 39.026 23.3326V22.9224C39.0139 22.4687 38.9812 22.0157 38.9279 21.5647C38.6428 19.06 37.7515 15.5619 36.6137 13.1926C36.0196 11.9535 35.4492 11.207 35.0244 10.907C34.5669 10.6237 33.9995 10.4549 33.4692 10.2972ZM22.1699 16.0698C22.8593 16.0698 23.5205 16.3271 24.008 16.785C24.4955 17.243 24.7693 17.8641 24.7693 18.5117C24.7693 19.1593 24.4955 19.7804 24.008 20.2383C23.5205 20.6963 22.8593 20.9535 22.1699 20.9535C21.4805 20.9535 20.8193 20.6963 20.3319 20.2383C19.8444 19.7804 19.5705 19.1593 19.5705 18.5117C19.5705 17.8641 19.8444 17.243 20.3319 16.785C20.8193 16.3271 21.4805 16.0698 22.1699 16.0698ZM31.8249 16.0698C32.5143 16.0698 33.1755 16.3271 33.6629 16.785C34.1504 17.243 34.4243 17.8641 34.4243 18.5117C34.4243 19.1593 34.1504 19.7804 33.6629 20.2383C33.1755 20.6963 32.5143 20.9535 31.8249 20.9535C31.1355 20.9535 30.4743 20.6963 29.9868 20.2383C29.4993 19.7804 29.2255 19.1593 29.2255 18.5117C29.2255 17.8641 29.4993 17.243 29.9868 16.785C30.4743 16.3271 31.1355 16.0698 31.8249 16.0698Z" fill="#11D9C5"/>
                </g>
                <defs>
                <filter id="filter0_d_5999_153" x="0" y="0" width="54" height="46.3262" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0666667 0 0 0 0 0.85098 0 0 0 0 0.772549 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5999_153"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5999_153" result="shape"/>
                </filter>
                </defs>
                </svg>
            </a> 
            
          <a href="https://twitter.com/NetSepio" target="_blank" className="transition duration-100 hover:text-green-400 active:text-green-600" style={style}>
              <svg width="40" height="38" viewBox="0 0 51 49" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_5999_151)">
                <path d="M33.2375 7H37.3725L28.3388 17.325L38.9662 31.375H30.6437L24.1263 22.8537L16.6687 31.375H12.5312L22.1937 20.3313L12 7H20.5312L26.4225 14.7887L33.235 7H33.2375ZM31.7863 28.9H34.0775L19.2875 9.345H16.8287L31.7863 28.9Z" fill="#11D9C5"/>
                </g>
                <defs>
                <filter id="filter0_d_5999_151" x="0" y="0" width="50.9663" height="48.375" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0666667 0 0 0 0 0.85098 0 0 0 0 0.772549 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5999_151"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5999_151" result="shape"/>
                </filter>
                </defs>
                </svg>
            </a>

            <a href="https://github.com/NetSepio" target="_blank" className="transition duration-100 hover:text-green-400 active:text-green-600" style={style}>
              <svg width="45" height="38" viewBox="0 0 52 51" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_5999_152)">
                <path d="M25.75 7C23.9443 7 22.1563 7.35565 20.4881 8.04666C18.8199 8.73766 17.3041 9.75048 16.0273 11.0273C13.4487 13.6059 12 17.1033 12 20.75C12 26.8275 15.9463 31.9837 21.405 33.8125C22.0925 33.9225 22.3125 33.4963 22.3125 33.125V30.8012C18.5037 31.6262 17.6925 28.9587 17.6925 28.9587C17.06 27.3637 16.1663 26.9375 16.1663 26.9375C14.915 26.085 16.2625 26.1125 16.2625 26.1125C17.6375 26.2087 18.3663 27.5288 18.3663 27.5288C19.5625 29.6187 21.5837 29 22.3675 28.67C22.4913 27.7763 22.8488 27.1712 23.2338 26.8275C20.1812 26.4837 16.9775 25.3013 16.9775 20.0625C16.9775 18.5363 17.5 17.3125 18.3938 16.3363C18.2562 15.9925 17.775 14.5625 18.5312 12.7063C18.5312 12.7063 19.6863 12.335 22.3125 14.1088C23.3988 13.8063 24.5813 13.655 25.75 13.655C26.9187 13.655 28.1012 13.8063 29.1875 14.1088C31.8137 12.335 32.9688 12.7063 32.9688 12.7063C33.725 14.5625 33.2437 15.9925 33.1063 16.3363C34 17.3125 34.5225 18.5363 34.5225 20.0625C34.5225 25.315 31.305 26.47 28.2388 26.8137C28.7338 27.24 29.1875 28.0788 29.1875 29.3575V33.125C29.1875 33.4963 29.4075 33.9363 30.1087 33.8125C35.5675 31.97 39.5 26.8275 39.5 20.75C39.5 18.9443 39.1443 17.1563 38.4533 15.4881C37.7623 13.8199 36.7495 12.3041 35.4727 11.0273C34.1959 9.75048 32.6801 8.73766 31.0119 8.04666C29.3437 7.35565 27.5557 7 25.75 7Z" fill="#11D9C5"/>
                </g>
                <defs>
                <filter id="filter0_d_5999_152" x="0" y="0" width="51.5" height="50.834" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="5"/>
                <feGaussianBlur stdDeviation="6"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.0666667 0 0 0 0 0.85098 0 0 0 0 0.772549 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5999_152"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5999_152" result="shape"/>
                </filter>
                </defs>
                </svg>
            </a>
  
          </div>
        </div>
    
        <div className="py-5 text-center text-sm" style={{color:'white', borderTop: '1px solid #11D9C5'}}>© 2023 - NetSepio. All rights reserved.</div>
      </footer>
    </div>
    </main>
  )
}
