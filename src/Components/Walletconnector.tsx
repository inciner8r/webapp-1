import React, { useState, useEffect } from 'react';
import { useWallet,WalletName, WalletReadyState } from '@aptos-labs/wallet-adapter-react';
import axios from 'axios';
import Cookies from 'js-cookie';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const WalletConnector = () => {
    const {
        connect,
        account,
        connected,
        wallets,
        signMessage,
      } = useWallet();

  const [walletSelectorModalOpen, setWalletSelectorModalOpen] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isConnected) {
      connectWallet();
    }
  }, [isConnected]);

  const handleConnect = async (wallet: WalletName) => {
    try {
      await connect(wallet);
      setIsConnected(true);
      setWalletSelectorModalOpen(false);
    } catch (error) {
      console.error('Error during wallet connection:', error);
    }
  };


  const connectWallet = async () => {
    try {

      if(account?.address){
      const { data } = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/flowid?walletAddress=${account.address}`);
      console.log(data);

      const message = data.payload.eula;
      const nonce = data.payload.flowId;
      const publicKey = account.publicKey;

      const { signature, fullMessage } = await signMessage({
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
            Cookies.set("platform_token", token, { expires: 7 });
            if (account?.address) {
            Cookies.set("platform_wallet", account.address, { expires: 7 });
            }
            window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseModal = () => {
    setWalletSelectorModalOpen(false);
  };

//   const onWalletButtonClick = () => {
//       setWalletSelectorModalOpen(true);
//   };

  const style2 = {
    backgroundColor: '#11D9C5',
  };

  return (
    <div className="flex p-2">

      {/* <button onClick={onWalletButtonClick} className="text-black p-2 rounded-lg">
        {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </button> */}

      {walletSelectorModalOpen && (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
        //   <div className="bg-white p-4 rounded-lg">
        //     <div className="flex p-2">
        //       {wallets.map((wallet) => (
        //         <div key={wallet.name} className="flex flex-col items-center cursor-pointer" onClick={() => handleConnect(wallet.name)}>
        //           <img src={wallet.icon} alt={wallet.name} width={28} />
        //           <span className="mt-1">{wallet.name}</span>
        //         </div>
        //       ))}
        //     </div>
        //   </div>
        // </div>
        <div className="bg-gray-800 bg-opacity-50 flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative p-4 lg:w-1/3 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700 bg-white">
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                <h3 className="text-2xl font-semibold text-black">
                Connect Wallet
                </h3>
                <button 
                    onClick={() => setWalletSelectorModalOpen(false)}
                    type="button" 
                    className="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            {!connected && (
          <div className="p-2">
            {wallets.map((wallet) => {
              return (
                <div
                  key={wallet.name}
                  onClick={
                    wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable
                      ? () => handleConnect(wallet.name)
                      : () => window.open(wallet.url)
                  }
                >
                  <div className="flex justify-between text-black m-4 p-4 bg-gray-300 rounded-lg">
                    <div className="flex">
                      <img
                        src={wallet.icon}
                        width={28}
                        style={{ marginRight: 10 }}
                      />
                      <div className="mt-1">
                        {wallet.name}
                      </div>
                    </div>
                    {wallet.readyState === WalletReadyState.Installed || wallet.readyState === WalletReadyState.Loadable ? (
                      <button className="px-2 py-1 rounded-md" style={style2}>
                        <div className="">
                          Connect
                        </div>
                      </button>
                    ) : (
                      <div className="">Install</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
            )}
        </div>          
    </div>
</div>
      )}
    </div>
  );
};

export default WalletConnector;
