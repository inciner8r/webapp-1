import { ethers } from 'ethers';
import NetSepioABI from '../artifacts/NetSepio.abi.json';
import store from '../store';

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS || '0x67d3104dDDd78A8f04fB445f689Fccf4916a2D20';
console.log('CONTRACT_ADDRESS:', CONTRACT_ADDRESS)

export async function deleteMyReview(tokenID: string): Promise<boolean> {
  try {
    console.log('Deleting review:', tokenID);
    const walletData = store.getState().wallet.walletData;

    if (!walletData) {
      console.error('User not connected to MetaMask');
      return false;
    }

    const walletAddress = walletData.walletAddress;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner(walletAddress);

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


