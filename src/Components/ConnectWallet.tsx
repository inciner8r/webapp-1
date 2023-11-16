import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import nacl from 'tweetnacl';

const ConnectWalletButton = () => {

  const loggedin = Cookies.get("platform_token");
  const wallet = Cookies.get("platform_wallet");

  const [profileId, setProfileId] = useState<string | null>(null);
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [aptBalance, setAptBalance] = useState<string | null>(null);
  const [value, setValue] = useState<boolean | null>(true);

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return (window as any).aptos;
    } else {
      window.open('https://petra.app/', '_blank');
    }
  }

  const connectWallet = async () => {
    const wallet = getAptosWallet();
    try {
      const response = await wallet.connect();

      const account = await wallet.account();
      console.log("account",account)

      const { data } = await axios.get(`https://testnet.gateway.netsepio.com/api/v1.0/flowid?walletAddress=${account.address}`);
      console.log(data);

      const message = data.payload.eula;
      const nonce = data.payload.flowId;
      const publicKey = account.publicKey;

      const { signature, fullMessage } = await wallet.signMessage({
        message,
        nonce
      });
      console.log("sign", signature, "full message", fullMessage);



      const authenticationData = {
        "flowId": nonce,
        "signature": `0x${signature}`,
        "pubKey": publicKey,
      };

      const authenticateApiUrl = 'https://testnet.gateway.netsepio.com/api/v1.0/authenticate';

      const config = {
        url: authenticateApiUrl,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: authenticationData,
      };

      try {
        const response = await axios(config);
        console.log("auth data", response.data);
        const token = await response?.data?.payload?.token;
            // localStorage.setItem("platform_token", token);
            Cookies.set("platform_token", token, { expires: 7 });
            Cookies.set("platform_wallet", account.address, { expires: 7 });

            setUserWallet(account.address);

            const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNhYjYxMDViLWVjMGQtNGI4Ny1hNThiLWI5ZDcwMjZkNzU4YyIsIm9yZ0lkIjoiMzYzNDM0IiwidXNlcklkIjoiMzczNTE1IiwidHlwZUlkIjoiMTc3ZGVlZGMtOTdhMi00YjA0LWEyZTYtZTIwMmYzODVkMjE0IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTkyMDQ5ODYsImV4cCI6NDg1NDk2NDk4Nn0.0B8k4sEUUYCLTBPjO9d86yb1Cln6wZMhPDuToCmtyAc";
        
            const options = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                "X-API-Key": MORALIS_API_KEY,
              },
            };
        
            fetch(`https://mainnet-aptos-api.moralis.io/wallets/coins?limit=10&owner_addresses[0]=${account.address}`, options)
              .then(response => response.json())
              .then(response => {
                console.log(response);
                // Handle the API response data here
              })
              .catch(err => {
                console.error(err);
                // Handle any errors here
              });

      } catch (error) {
        console.error(error);
      }

    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteCookie = () => {
    // Replace 'your_cookie_name' with the actual name of the cookie you want to delete
    Cookies.remove('platform_wallet');
    Cookies.remove('platform_token');
    setValue(false);
  };

  return (
    <>
      <div className='text-white font-bold text-center text-xl md:ml-30'>
        {/* <ConnectButton /> */}
        {loggedin && wallet && value ? (
        <>
          {/* <h2>APT Balance:</h2>
      {aptBalance !== null ? (
        <p>{aptBalance} APT</p>
      ) : (
        <p>Loading balance...</p>
      )} */}
          <h3>{wallet.slice(0, 4)}...{wallet.slice(-4)}</h3>
          <button 

          onClick={handleDeleteCookie}>Logout</button>
        </>
      ) : (
        <button 
        className="bg-green-500 text-black p-2 rounded-lg"
        onClick={connectWallet}> Connect Wallet</button>
      )}
      </div>
    </>
  );
    
}

export default ConnectWalletButton
