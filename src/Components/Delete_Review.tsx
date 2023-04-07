import React from 'react';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { ethers } from 'ethers';
import NetSepioABI from '../artifacts/NetSepio.abi.json';
import store from '../store';
import { useSigner } from 'wagmi'

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x67d3104dDDd78A8f04fB445f689Fccf4916a2D20';
console.log('CONTRACT_ADDRESS:', CONTRACT_ADDRESS)

interface DeleteReviewProps {
  uri: string;
  id: string;
  onDelete: () => void;
}

export const DeleteReview: React.FC<DeleteReviewProps> = ({ uri, id, onDelete }) => {
  const { data: signer } = useSigner()
  const Signer = signer;
  console.log("Signer", Signer);

  async function deleteMyReview(tokenID: string): Promise<boolean> {
    try {
      console.log('Deleting review:', tokenID);
      const walletData = store.getState().wallet.walletData;
  
      if (!walletData) {
        console.error('User not connected to MetaMask');
        return false;
      }
  
      const signer = Signer;

      if (!signer) {
        console.error('Signer is null or undefined');
        return false;
      }
  
      const contract = new ethers.Contract(CONTRACT_ADDRESS, NetSepioABI, signer);
  
      const reviewId = tokenID
      console.log('reviewId:', reviewId)
  
      const tx = await contract.deleteReview(reviewId);
      await tx.wait();
  
      console.log('Review deleted:', reviewId);
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  }
  
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
