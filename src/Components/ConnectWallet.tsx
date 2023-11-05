import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import nacl from 'tweetnacl';

const ConnectWalletButton = () => {

  const [profileId, setProfileId] = useState<string | null>(null);
  const [userWallet, setUserWallet] = useState<string | null>(null);

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

      const { data } = await axios.get(`https://aptos.gateway.netsepio.com/api/v1.0/flowid?walletAddress=${account.address}`);
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

      const authenticateApiUrl = 'https://aptos.gateway.netsepio.com/api/v1.0/authenticate';

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
      } catch (error) {
        console.error(error);
      }

      setProfileId("");
      setUserWallet("");

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className='text-white font-bold text-center text-xl md:ml-30'>
        {/* <ConnectButton /> */}
        {profileId ? (
        <>
          <h3>Profile ID: {profileId}</h3>
          <h3>Wallet Address: {userWallet}</h3>
          <button onClick={() => setProfileId(null)}>Logout</button>
        </>
      ) : (
        <button onClick={connectWallet}> Connect Wallet</button>
      )}
      </div>
    </>
  );
    
}

export default ConnectWalletButton
