import { ethers } from 'ethers';
import store from '../store';
import { setWalletData, deleteWalletData } from '../actions/walletActions';

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
  const jwtCheck = store.getState().wallet.jwtToken !== null;
  console.log("Wallet authentication: ", check && jwtCheck);
  return check && jwtCheck;
}

export function deleteWalletDataFromStore(): void {
  // Delete the Wallet Data from the Redux store
  store.dispatch(deleteWalletData());
  console.log("Wallet Data deleted from redux store.");
}