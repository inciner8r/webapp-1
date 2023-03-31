import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface WalletData {
  walletAddress: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
  chainId: number;
  balance: ethers.BigNumber;
}

export async function connectToMetamask(): Promise<{ walletAddress: string, provider: ethers.providers.Web3Provider, signer: ethers.Signer, chainId: number, balance: ethers.BigNumber } | null> {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainId = await provider.getNetwork().then(network => network.chainId);
      const balance = await provider.getBalance(walletAddress);

      return {
        walletAddress,
        provider,
        signer,
        chainId,
        balance
      };
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return null;
    }
  } else {
    console.error('MetaMask not detected. Please install MetaMask extension.');
    return null;
  }
}
