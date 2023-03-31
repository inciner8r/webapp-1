import React, { useEffect, useState } from 'react';
import ReviewContainer from '../Components/ReviewContainer';
import { connectToMetamask } from '../modules/connect_to_metamask';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataURIByUser } from '../modules/fetch_metadataURI_from_graphql';

const MyReviews: React.FC = () => {
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, []);

  return <ReviewContainer metaDataArray={metaDataArray} />;
};

export default MyReviews;
