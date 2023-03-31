import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export async function connectToMetamask(): Promise<string | null> {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      return walletAddress;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return null;
    }
  } else {
    console.error('MetaMask not detected. Please install MetaMask extension.');
    return null;
  }
}
