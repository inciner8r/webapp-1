import { ethers } from 'ethers';
import store from '../store';
import { setWalletData, setJwtToken } from '../actions/walletActions';
import { sendSignature } from './authentication'

declare global {
  interface Window {
    ethereum: any;
  }
}
export interface WalletData {
  walletAddress: string;
  chainId: number;
  balance: ethers.BigNumber;
  signer: ethers.providers.JsonRpcSigner;
}

export async function connectToMetamask(): Promise<WalletData | null> {
  if (typeof window.ethereum !== 'undefined') {
    try {
      console.log('Connecting to MetaMask...')
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainId = await provider.getNetwork().then(network => network.chainId);
      const balance = await provider.getBalance(walletAddress);
      
      const walletData = {
        walletAddress,
        chainId,
        balance,
        signer
      };

      // Store the necessary data in the redux store
      store.dispatch(setWalletData(walletData));
      console.log("Wallet data stored in redux store.");

      const jwtToken = await sendSignature();
      console.log('JWT token:', jwtToken)

      // Store the tokenID in the redux store
      console.log("JWT token being stored in redux store.")
      store.dispatch(setJwtToken(jwtToken));
      console.log("JWT token stored in redux store.")
      
      /* 
      ## Code to get jwtToken from redux store:
      
      const jwttoken = store.getState().wallet.jwtToken;
      console.log("JWT token from redux store:", jwttoken)
      */
      
      return walletData;

    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return null;
    }
  } else {
    console.error('MetaMask not detected. Please install MetaMask extension.');
    return null;
  }
}

export function checkWalletAuth(): boolean {
  console.log("Checking if wallet is authenticated...");
  const check = store.getState().wallet.walletData !== null;
  console.log("Wallet authentication: ", check);
  return check;
}
