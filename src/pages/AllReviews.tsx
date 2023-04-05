import React, { useState, useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import ReviewContainer from '../Components/ReviewContainer';
import { fetchMetadataURIAll, fetchMetadataURIBySiteURL } from '../modules/fetch_metadataURI_from_graphql';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { ReviewCreated } from '../graphql/types';
import Loader from '../Components/Loader';
import ConnectWallet from '../Components/ConnectWalletButton';

const AllReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewCreated[]>([]);
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewResults = await fetchMetadataURIAll();
      if (reviewResults) {
        setReviews(reviewResults);
      }
    };

    setLoading(true);
    fetchReviews().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const fetchMetaData = async () => {
      const metaDataPromises = reviews.map(async (review) => {
        const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
        const metaData = await fetchMetadataFromIPFS(ipfsUrl,review.id);
        return metaData;
      });

      const metaDataResults = await Promise.all(metaDataPromises);
      setMetaDataArray(metaDataResults);
    };

    if (reviews.length > 0) {
      setLoading(true);
      fetchMetaData().finally(() => setLoading(false));
    }
  }, [reviews]);

  const handleSearch = async (siteURL: string) => {
    const reviewResults = await fetchMetadataURIBySiteURL(siteURL);
    if (reviewResults) {
      setReviews(reviewResults);
      const metaDataPromises = reviewResults.map(async (review) => {
        const ipfsUrl = `https://ipfs.io/ipfs/${review.metadataURI.split('ipfs://')[1]}`;
        const metaData = await fetchMetadataFromIPFS(ipfsUrl,review.id);
        return metaData;
      });
      const metaDataResults = await Promise.all(metaDataPromises);
      setMetaDataArray(metaDataResults);
    } else {
      setMetaDataArray([]);
    }
  };

  return (
    <div>
      <section className="pt-24 mb-10">
          <div className="px-5 mx-auto max-w-7xl">
              <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">Explore All Reviews</span><br/>Strengthening Your Digital Defense<br/>
                </h1>
                <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
                  Browse through a wealth of verified website reviews on NetSepio, the decentralized platform built to help you choose the right solutions for a secure online presence.
                </p>

                <ConnectWallet />
              </div>
          </div>
      </section>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Loader /> : <ReviewContainer metaDataArray={metaDataArray} MyReviews={false}/>}
    </div>
  );
};

export default AllReviews;
