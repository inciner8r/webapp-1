import React from 'react';
import { deleteMyReview } from '../modules/delete_my_review';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';

interface DeleteReviewProps {
  uri: string;
  id: string;
  onDelete: () => void;
}

export const DeleteReview: React.FC<DeleteReviewProps> = ({ uri, id, onDelete }) => {
  const handleDeleteReview = async () => {
    const ipfsUrl = uri.replace('ipfs://', '');
    const metadata = await fetchMetadataFromIPFS(ipfsUrl, id);
    
    if (metadata) {
      const success = await deleteMyReview(id);
      if (success) {
        onDelete();
      } else {
        console.error('Error deleting review');
      }
    } else {
      console.error('Error fetching metadata from IPFS');
    }
  };

  return (
    <button onClick={handleDeleteReview} className='bg-gradient-to-r from-red-700 to-red-500 text-black font-semibold rounded-lg p-2 w-full text-center mt-5'>
      Delete Review
    </button>
  );
};
