// walletConnector.js

import axios from 'axios';
import Cookies from 'js-cookie';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_DEV_GATEWAY_URL

const connectWallet = async () => {

    const getAptosWallet = () => {
    if ('aptos' in window) {
        return (window as any).aptos;
    } else {
        window.open('https://petra.app/', '_blank');
    }
    }

  const wallet = getAptosWallet();
  try {
    const response = await wallet.connect();

    const account = await wallet.account();
    console.log("account", account);

    const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account.address}`);
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

    const authenticateApiUrl = `${REACT_APP_GATEWAY_URL}api/v1.0/authenticate`;

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
      return true;
    } catch (error) {
      console.error(error);
    }

  } catch (err) {
    console.log(err);
  }
}

export default connectWallet;
