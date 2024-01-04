"use client"
import google from "../../../public/google.png";
import googletop from "../../../public/googletop.png";
import wallet from "../../../public/wallet.png";
import tick from "../../../public/Subtract.png";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const CLIENT_ID = "699954671747-bqj0rvn0q2296skerds6indulobrv1fv.apps.googleusercontent.com"
const REDIRECT_URI = "http://localhost:3000/login"
const CLIENT_SECRET= "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"
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

const Login = () => {

    const [page, setpage] = useState<string>("wallet");

    const handleLoginClick = () => {
        const state = Math.random().toString(36).substring(7);
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=openid%20profile%20email&state=${state}`;
        window.location.href = authUrl;
      };

      const parseAuthorizationCode = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
      
        if (code) {
          localStorage.setItem("code",code)
          exchangeCodeForToken(code);
          console.log("code", code)
        }
      };
      
      const exchangeCodeForToken = async (code: string) => {
        const tokenEndpoint = 'https://www.googleapis.com/oauth2/v4/token';
      
        const tokenRequestBody = {
          code,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        };
      
        try {
          const response = await fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(tokenRequestBody).toString(),
          });
      
          const tokenData = await response.json();
      
          // Assuming id_token is present in tokenData
          const idToken = tokenData.id_token;
      
          setpage("googlewalletboth");

          // Use idToken in another API call
          await getgoogledata(idToken);
      
          handleTokenData(tokenData);
          console.log("token", tokenData);
        } catch (error) {
          console.error('Token exchange error:', error);
        }
      };
      
      const getgoogledata = async (idToken: string) => {
      
        const auth = Cookies.get("platform_token");
      
        const obj = {"idToken":idToken}
        const jsonData = JSON.stringify(obj);
      
        try {
          const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/account/auth-google`, {
            method: 'POST',
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
            body: jsonData,
          });
      
          const responseData = await response.json();
          Cookies.set("google_token", responseData.payload.token, { expires: 7 });
          Cookies.set("platform_userid", responseData.payload.userId, { expires: 7 });
          console.log('Another API call response:', responseData);
        } catch (error) {
          console.error('Another API call error:', error);
        }
      };
      
      const handleTokenData = (tokenData: any) => {
        window.history.replaceState({}, document.title, window.location.pathname);
      };
      
      
      useEffect(() => {
        parseAuthorizationCode();
      }, []);

  const loginbox = {
    backgroundColor: "#2229447A",
  };


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
        const userId = await response?.data?.payload?.userId;
            // localStorage.setItem("platform_token", token);
            Cookies.set("platform_token", token, { expires: 7 });
            Cookies.set("platform_wallet", account.address, { expires: 7 });
            Cookies.set("platform_userid", userId, { expires: 7 });

            // setUserWallet(account.address);
            // window.location.reload();
            setpage("google");
      } catch (error) {
        console.error(error);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="pb-40 -mb-4"
      style={{
        backgroundImage: `url(/bglogin.png)`,
        backgroundPosition: "50% 100%",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh"
      }}
    >
      <div
        className="mx-auto max-w-5xl text-center pt-28"
        
      >
        <div className="w-full mx-auto md:w-11/12 xl:w-9/12 pt-40 rounded-xl" style={loginbox}>

          { page == 'google' && (
            <>

            <Image src={googletop} alt="" className="mx-auto"/>

            <h1 className="mb-2 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
            <span className="color: white">1. Sign In</span>
          </h1>
          <div className="pb-14">
            <div className="text-gray-300">
            Use your Google Account
            </div>
          </div>

          <div className="pb-4">
            <button className="text-black bg-white p-2 rounded-lg w-1/2" onClick={handleLoginClick}>
                <div className="flex gap-2 justify-center">
                <div> <Image src={google} alt=""/></div>  
                <div>Sign up with Google</div>
                </div>
            </button>
          </div>

          <div className="pb-40">
            <button className="text-white border p-2 rounded-lg w-1/2" onClick={()=>{setpage("onlywallet")}}>
            <div className="flex gap-2 justify-center">
                <div>Skip</div>
                </div>
            </button>
          </div>

          {/* <div className="pb-40">
            <button className="text-black bg-white p-2 rounded-lg w-1/2">
            <div className="flex gap-2 justify-center">
                <div> <Image src={wallet} alt=""/></div>  
                <div>Connect Wallet</div>
                </div>
            </button>
          </div> */}
          </>
)}

{ page == 'wallet' && (
            <>
            <h1 className="mb-6 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
            <span className="color: white">2. Connect Wallet</span>
          </h1>
          <div className="pb-14">
            <div className="text-gray-300">
            Connect your wallet with petra
            </div>
          </div>

          <div className="pb-40">
            <button className="text-black bg-white p-2 rounded-lg w-1/2" onClick={connectWallet}>
                <div className="flex gap-2 justify-center">
                <div> <Image src={wallet} alt=""/></div>  
                <div>Connect with petra</div>
                </div>
            </button>
          </div>

          </>
)}

{ page == 'onlywallet' && (
            <>
            <Image src={tick} className="mx-auto mb-8" alt=""/>
            <h1 className="mb-6 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
            <span className="color: white">Successful Wallet logged in!</span>
          </h1>
          {/* <div className="pb-14">
            <div className="text-gray-300">
            Create Your Profile for the Next Step, <br/>Submitting Reviews
            </div>
          </div> */}

          <div className="pb-32">
            <Link href="/dashboard">
            <button className="text-black bg-white p-2 rounded-lg w-1/2">
            <div className="flex gap-2 justify-center"> 
                <div>Go to Dashboard</div>
                </div>
            </button>
            </Link>
          </div>
          </>
)}


{ page == 'googlewalletboth' && (
            <>
            <Image src={tick} className="mx-auto mb-8" alt=""/>
            <h1 className="mb-6 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-4xl md:tracking-tight">
            <span className="color: white">Successful logged in!</span>
          </h1>
          {/* <div className="pb-14">
            <div className="text-gray-300">
            Create Your Profile for the Next Step, <br/>Submitting Reviews
            </div>
          </div> */}

          <div className="pb-32">
            <Link href="/dashboard">
            <button className="text-black bg-white p-2 rounded-lg w-1/2">
            <div className="flex gap-2 justify-center"> 
                <div>Go to Dashboard</div>
                </div>
            </button>
            </Link>
          </div>
          </>
)}


        </div>
      </div>
    </div>
  );
};

export default Login;
