You are a frontend developer and you have to perform the following task.

In this conversation you just have to read and review all the provided code and instructions and reply with a summary of what I do and what you would do.

# What I will do:

I will rewrite the following [Instructions] one by one in my next prompts.

# What you will do:

You will will have to review them and re-write the [Current-Code] or write new [Code] with reference to the provided [Current-Code-Logic] and provided [Instructions]

[Instructions:]

1. Replace localStorage with Redux-Store:
- Modify connectToMetamask function in [connect_to_metamask.ts] to dispatch an action instead of using localStorage
- Remove localStorage usage from [MyReviews.tsx] and [Profile.tsx] components
- Replace checkWalletAuth() with a Redux selector to access the wallet data

2. Create a new MetamaskButton component:
- Create a new file [metamask_button.tsx] under src/components
- Implement the component to connect to Metamask and display user's balance
- Dispatch an action to store the wallet data in Redux-Store

3. Update MyReviews.tsx and Profile.tsx components:
- Remove connectToMetamask function call and replace with the new MetamaskButton component
- Update the components to use Redux-Store to access the wallet data

4. Remove unnecessary functions and imports from [connect_to_metamask.ts]:
- Remove the checkWalletAuth function and any related imports

[Current-Code:]

## src/actions/walletActions.ts
import { WalletData } from '../modules/connect_to_metamask';

export const SET_WALLET_DATA = 'SET_WALLET_DATA';

export interface SetWalletDataAction {
  type: typeof SET_WALLET_DATA;
  payload: WalletData;
}

export type WalletActionTypes = SetWalletDataAction;

export const setWalletData = (walletData: WalletData): SetWalletDataAction => ({
  type: SET_WALLET_DATA,
  payload: walletData,
});

## src/reducers/walletReducer.ts
import { WalletActionTypes, SET_WALLET_DATA } from '../actions/walletActions';
import { WalletData } from '../modules/connect_to_metamask';

export interface WalletState {
  walletData: WalletData | null;
}

const initialState: WalletState = {
  walletData: null,
};

export const walletReducer = (state = initialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case SET_WALLET_DATA:
      return {
        ...state,
        walletData: action.payload,
      };
    default:
      return state;
  }
};

## src/store.ts
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { walletReducer } from './reducers/walletReducer';

const rootReducer = combineReducers({
  wallet: walletReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

## /home/adimis/Desktop/Netsepio/webapp/src/modules/connect_to_metamask.ts
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export interface WalletData {
  walletAddress: string;
  chainId: number;
  balance: ethers.BigNumber;
}

export const WALLET_DATA_KEY = 'walletData';

export async function connectToMetamask(): Promise<WalletData | null> {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      const chainId = await provider.getNetwork().then(network => network.chainId);
      const balance = await provider.getBalance(walletAddress);

      const walletData = {
        walletAddress,
        chainId,
        balance
      };

    // Only store the necessary data in local storage
    localStorage.setItem(WALLET_DATA_KEY, JSON.stringify({
      walletAddress,
      chainId,
      balance: balance.toString()
    }));
    console.log("Wallet data stored in local storage.");

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
  console.log("Checking if wallet is authenticated...")
  const check = localStorage.getItem(WALLET_DATA_KEY) !== null;
  console.log("Wallet authentication: ", check)
  return check
}

## /home/adimis/Desktop/Netsepio/webapp/src/Components/Profile.tsx
import {useState,useEffect} from 'react';
import { ethers } from 'ethers';
import { connectToMetamask, checkWalletAuth, WALLET_DATA_KEY } from '../modules/connect_to_metamask';

interface WalletData {
  walletAddress: string;
  chainId: number;
  balance: ethers.BigNumber;
}

const Profile: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  function getNetworkName(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      case 80001:
        return 'Polygon Mumbai Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 56:
        return 'Binance Smart Chain Mainnet';
      case 97:
        return 'Binance Smart Chain Testnet';
      case 100:
        return 'xDAI Chain';
      case 128:
        return 'Huobi ECO Chain Mainnet';
      case 256:
        return 'Huobi ECO Chain Testnet';
      case 43114:
        return 'Avalanche Mainnet C-Chain';
      case 43113:
        return 'Avalanche Fuji Testnet C-Chain';
      case 1666600000:
        return 'Harmony Mainnet Shard 0';
      case 1666700000:
        return 'Harmony Testnet Shard 0';
      default:
        return `Unknown Network (Chain ID: ${chainId})`;
    }
  }  

  useEffect(() => {
    async function fetchData() {
      if (checkWalletAuth()) {
        const storedWalletData = JSON.parse(localStorage.getItem(WALLET_DATA_KEY) || '{}') as WalletData;
        setWalletData(storedWalletData);
      } else {
        const walletData = await connectToMetamask();
        if (walletData) {
          localStorage.setItem(WALLET_DATA_KEY, JSON.stringify(walletData));
          setWalletData(walletData);
        }
      }
    }

    fetchData();
  }, []);

  if (!walletData) {
    return null;
  }
  
  return (
    <div className="modal-box bg-black text-gray-200">
      <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">Profile</h3>
      </div>
      <div className="py-4">
        <div className="bg-gray-900 p-2 rounded-md mb-2">
          <p className="text-xs mb-1 text-green-200">Address</p>
          <p className="font-bold text-sm truncate">{walletData.walletAddress}</p>
        </div>
        <div className="flex justify-between items-center mb-2 mt-14">
          <p className="font-bold text-green-200">Balance</p>
          <p>{ethers.utils.formatEther(walletData.balance)} ETH</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-green-200">Network</p>
          <p>{getNetworkName(walletData.chainId)}</p>
        </div>
      </div>
      <div className="modal-action">
        <label htmlFor="my-modal" className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5">
          Close
        </label>
      </div>
    </div>

  );
};

export default Profile;

## /home/adimis/Desktop/Netsepio/webapp/src/pages/MyReviews.tsx
import React, { useEffect, useState } from 'react';
import ReviewContainer from '../Components/ReviewContainer';
import { connectToMetamask, checkWalletAuth, WALLET_DATA_KEY } from '../modules/connect_to_metamask';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataURIByUser } from '../modules/fetch_metadataURI_from_graphql';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

const MyReviews: React.FC = () => {
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
  
      if (!checkWalletAuth()) {
        const walletData = await connectToMetamask();
        if (walletData) {
          localStorage.setItem(WALLET_DATA_KEY, JSON.stringify(walletData));
        }
      }
  
      const storedWalletData = JSON.parse(localStorage.getItem(WALLET_DATA_KEY) || "{}");
  
      if (storedWalletData && storedWalletData.walletAddress) {
        const walletAddress = storedWalletData.walletAddress;
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
      <section className="pt-24 mb-10">
            <div className="px-5 mx-auto max-w-7xl">
                <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                    <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">Protect Your Online Presence with NetSepio</span><br/>The Ultimate Cybersecurity Solution<br/>
                    </h1>
                    <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
                        Say Goodbye to Malware and Scams with NetSepio - The Decentralized Cybersecurity Platform
                    </p>

                    <div>
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                          <Link to="/all-reviews" className='inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-black bg-green-300 rounded-2xl sm:w-auto sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80'>All Reviews</Link>
                      </div>
                    </div>

                </div>
            </div>
        </section>
      {loading ? (<Loader />) : (<ReviewContainer metaDataArray={metaDataArray} />)}
    </div>
  );
};

export default MyReviews;


According to the [Current-Code] and [Instructions] I want you all write code necessary according to my fourth [Instruction]:

4. Remove unnecessary functions and imports from [connect_to_metamask.ts]:
- Remove the checkWalletAuth function and any related imports