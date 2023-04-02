You are frontend developer and you have to perform following task:

- Create a new component for [Connect_Wallet_Button]
- Add [Connect_Wallet_Button] in the navbar on the left of [More] Button that will store the {walletData} in local storage and also pass {walletData} as prop to <Profile/> Component.
- Modify the `App.jsx` to check if the {walletData} is present in the local storage when user tries to navigate to [My_Reviews] Page or [Profile] Component and if {walletData} is in the localstorage then redirect to the [My_Reviews] page or [Profile] Component and pass {walletData} as prop to the [My_Reviews] Page or pass {walletData} as prop to <Profile/> Component and if {walletData} is not present in local storage then I want a UI optimized modal popup to come up and ask user to click on [Connect_Wallet_Button] before redirecting them to [My_Reviews] Page or [Profile] Component.
- Generate your response after referencing all the information and Code about the project I provided below.

# Current Code:

## /home/adimis/Desktop/Netsepio/webapp/src/Components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { WalletData } from '../modules/connect_to_metamask';

interface NavbarProps {
  walletData: WalletData | null;
}

const Navbar: React.FC<NavbarProps> = ({ walletData }) => {
  return (
    <div className="navbar">
    <div className="flex-1">
      <a href="/" className="btn btn-ghost normal-case text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 text-3xl">Netsepio</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <button className='bg-gradient-to-r from-green-200 to-green-400'>
            More
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </button>
          <ul className="-p-20">
            <li><Link to="/my-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>My Reviews</Link></li>
            <li><Link to="/all-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>All Reviews</Link></li>
            <li><label htmlFor="my-modal" className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400">Profile</label></li>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">{walletData && <Profile walletData={walletData} />}</div>

          </ul>
        </li>
      </ul>
    </div>
    </div>
  )
};

export default Navbar;

## /home/adimis/Desktop/Netsepio/webapp/src/pages/MyReviews.tsx
import React, { useEffect, useState } from 'react';
import ReviewContainer from '../Components/ReviewContainer';
import { WalletData } from '../modules/connect_to_metamask';
import { fetchMetadataFromIPFS } from '../modules/fetch_metadata_from_ipfs';
import { createIpfsUrl } from '../modules/ipfs_url_creator';
import { fetchMetadataURIByUser } from '../modules/fetch_metadataURI_from_graphql';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

interface MyReviewsProps {
  walletData: WalletData | null;
}

const MyReviews: React.FC<MyReviewsProps> = ({ walletData }) => {
  const [metaDataArray, setMetaDataArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (walletData) {
        const walletAddress = walletData.walletAddress;
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
  }, [walletData]);

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

## /home/adimis/Desktop/Netsepio/webapp/src/Components/Profile.tsx

import React from 'react';
import { ethers } from 'ethers';

interface WalletData {
  walletAddress: string;
  provider: ethers.providers.Web3Provider;
  signer: ethers.Signer;
  chainId: number;
  balance: ethers.BigNumber;
}

interface ProfileProps {
  walletData: WalletData;
}

const Profile: React.FC<ProfileProps> = ({ walletData }) => {
  const { walletAddress, chainId, balance } = walletData;
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
  
  return (
    <div className="modal-box bg-black text-gray-200">
      <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">Profile</h3>
      </div>
      <div className="py-4">
        <div className="bg-gray-900 p-2 rounded-md mb-2">
          <p className="text-xs mb-1 text-green-200">Address</p>
          <p className="font-bold text-sm truncate">{walletAddress}</p>
        </div>
        <div className="flex justify-between items-center mb-2 mt-14">
          <p className="font-bold text-green-200">Balance</p>
          <p>{ethers.utils.formatEther(balance)} ETH</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-green-200">Network</p>
          <p>{getNetworkName(chainId)}</p>
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

## /home/adimis/Desktop/Netsepio/webapp/src/App.tsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyReviews from './pages/MyReviews';
import AllReviews from './pages/AllReviews';
import Footer from './Components/Footer';
import { connectToMetamask, WalletData } from './modules/connect_to_metamask';

const App: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const walletData = await connectToMetamask();
      if (walletData) {
        setWalletData(walletData);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Navbar walletData={walletData} />
        <Routes>
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/my-reviews" element={<MyReviews walletData={walletData} />} />
          <Route path="/" element={<AllReviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

## /home/adimis/Desktop/Netsepio/webapp/src/modules/connect_to_metamask.ts
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
