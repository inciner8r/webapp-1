import React, { useEffect, useState } from 'react';
import ReviewContainer from '../Components/ReviewContainer';
import { connectToMetamask, checkWalletAuth } from '../modules/connect_to_metamask';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataURIByUser } from '../modules/fetch_metadataURI_from_graphql';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MyReviews: React.FC = () => {
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const walletData = useSelector((state: RootState) => state.wallet.walletData);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
  
      if (!checkWalletAuth()) {
        await connectToMetamask();
      }
  
      if (walletData && walletData.walletAddress) {
        const walletAddress = walletData.walletAddress;
        const reviewCreateds = await fetchMetadataURIByUser(walletAddress);
        if (reviewCreateds) {
          const metaDataPromises = reviewCreateds.map((reviewCreated) =>
            fetchMetadataFromIPFS(createIpfsUrl(reviewCreated.metadataURI),reviewCreated.id),
          );
          const allMetaData = await Promise.all(metaDataPromises);
          setMetaDataArray(allMetaData);
        }
      }
  
      setLoading(false);
    }
  
    fetchData();
  }, [walletData]);

  return (
    <div>
      <section className="pt-24 mb-10">
            <div className="px-5 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">Manage Your Reviews</span><br/>Securely Monitor and Manage Your Feedback<br/>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
                    Monitor your submitted reviews with NetSepio, the decentralized cybersecurity platform designed to ensure the security and privacy of your online activities.
                    </p>

                    <div>
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                          <Link to="/all-reviews" className='inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-black bg-green-300 rounded-2xl sm:w-auto sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80'>All Reviews</Link>
                      </div>
                    </div>

                </div>
            </div>
        </section>
      {loading ? (<Loader />) : (<ReviewContainer metaDataArray={metaDataArray} MyReviews={true}/>)}
    </div>
  );
};

export default MyReviews;
