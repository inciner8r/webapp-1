import React, { useEffect, useState } from 'react';
import ReviewContainer from '../Components/ReviewContainer';
import { connectToMetamask } from '../modules/connect_to_metamask';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataURIByUser } from '../modules/fetch_metadataURI_from_graphql';
import Loader from '../Components/Loader';

const MyReviews: React.FC = () => {
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const walletAddress = await connectToMetamask();
      if (walletAddress) {
        const reviewCreateds = await fetchMetadataURIByUser(walletAddress);
        if (reviewCreateds) {
          const metaDataPromises = reviewCreateds.map((reviewCreated) =>
            fetchMetadataFromIPFS(createIpfsUrl(reviewCreated.metadataURI)),
          );
          const allMetaData = await Promise.all(metaDataPromises);
          setMetaDataArray(allMetaData);
        }
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (<Loader />) : (<ReviewContainer metaDataArray={metaDataArray} />)}
    </div>
  );
};

export default MyReviews;
