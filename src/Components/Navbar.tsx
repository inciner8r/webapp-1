import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { useWallet, WalletName, WalletReadyState} from "@aptos-labs/wallet-adapter-react";
import netsepioLogo from '../assets/netsepio.png';
import netsepio from '../assets/netsepio_logo_light.png';
import netsepioname from '../assets/productname.png';
// import LogoutButton from './Logout';
// import ConnectWalletButton from './ConnectWallet';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import nacl from 'tweetnacl';
const REACT_APP_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
 
export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  const loggedin = Cookies.get("platform_token");
  const mywallet = Cookies.get("platform_wallet");

  const [profileId, setProfileId] = useState<string | null>(null);
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [aptBalance, setAptBalance] = useState<string | null>(null);
  const [value, setValue] = useState<boolean | null>(true);
  const [hidefilter, setHideFilter] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [walletSelectorModalOpen, setWalletSelectorModalOpen] = useState(false);

  const {
    connect,
    account,
    network,
    connected,
    disconnect,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
  } = useWallet();

  // Log the useWallet object to the console
  console.log("useWallet:", {
    connect,
    disconnect,
    account,
    network,
    connected,
    wallet,
    wallets,
    signAndSubmitTransaction,
    signTransaction,
    signMessage,
  });

  const onWalletButtonClick = () => {
    if (connected) {
      disconnect();
    } else {
      setWalletSelectorModalOpen(true);
    }
  };

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isConnected) {
      connectWallet();
    }
  }, [isConnected]);

  const onWalletSelected = async(wallet: WalletName) => {
      try {
      await connect(wallet);
      setIsConnected(true);
      setWalletSelectorModalOpen(false);
    } catch (error) {
      console.error("Error during wallet connection:", error);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCopyClick = () => {
    if (typeof mywallet === 'string') {
      navigator.clipboard.writeText(mywallet);
      setIsHovered(false);
      // alert('Address copied to clipboard!');
    }
  };
 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navigate = useNavigate();

  const myreviews = async () => {
    navigate('/my-reviews');
  };

  const navMain = async () => {
    navigate('/');
  };

  const seemyreviews = async () => {
    navigate('/view-my-reviews');
  };
 
  const handleDeleteCookie = () => {
    // Replace 'your_cookie_name' with the actual name of the cookie you want to delete
    if (connected) {
        disconnect();
    }
    Cookies.remove('platform_wallet');
    Cookies.remove('platform_token');
    setValue(false);
    window.location.href = '/';
  };

  const style = {
    color: '#11D9C5',
};

const style2 = {
  backgroundColor: '#11D9C5',
};

const border = {
  border: '1px solid #11D9C5',
}

const [hovered, setHovered] = useState(false);

const logout = {
  color: hovered ? 'red' : '#11D9C5',
}

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 text-md"
      >
        { loggedin && mywallet && value && (
          <>
         <button onClick={seemyreviews} className="z-10 font-bold leading-12 text-white p-2 rounded-lg mr-2" style={border}>My Reviews</button>
          </>
        )}
          <button onClick={myreviews} className="z-10 font-bold leading-12 text-black p-2 rounded-lg" style={style2}>Submit Reviews</button>

      </Typography>
      {/*
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-bold text-lg"
      >
        <Link to="/" className='bg-black z-10 font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>
          All Reviews
        </Link>
      </Typography>
      */}
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-semibold text-lg"
      >
        {loggedin && wallet && value ?(
          <button onClick={handleDeleteCookie} className="hover:text-red-400" style={logout} onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>Logout</button>
        ): null}
      </Typography> */}
      
    </ul>
  );

  const getAptosWallet = () => {
    if ('aptos' in window) {
      return (window as any).aptos;
    } else {
      window.open('https://petra.app/', '_blank');
    }
  }

  const connectWallet = async () => {
    setValue(true);
    // const wallet = getAptosWallet();
    try {
      // const response = await wallet.connect();

      // const account = await wallet.account();
      // console.log("account",account)

      // connect(wallet);

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
            // localStorage.setItem("platform_token", token);
            Cookies.set("platform_token", token, { expires: 7 });
            if (account?.address) {
            Cookies.set("platform_wallet", account.address, { expires: 7 });
            }

            // setUserWallet(account?.address);
            window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
    } catch (err) {
      console.log(err);
    }
  }

  const background = {
    backgroundColor: '#141a31',
    borderColor: '#141a31'
  }
 
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4" style={background}>
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-bold"
        >
          <div>
            <div className="flex flex-row items-center">
              <img src={netsepio} alt="netsepio logo" className="h-12 w-12 mr-2"/>
              <div onClick={navMain} className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 text-3xl">
              <img src={netsepioname} className="w-26 h-8"/>
              </div>
            </div>
          </div>
        </Typography>
        
        {/* <div className="hidden lg:inline-block p-1 md:ml-5"><ConnectWalletButton/></div> */}

        <div className='text-white font-bold text-center text-xl md:ml-30 hidden lg:inline-block '>
        {loggedin && mywallet && value ? (
        <>
        {/* <button 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" className="ms-3 mb-2 md:mb-0 text-white rounded-lg text-xl font-bold px-5 py-2.5 text-center">
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
        {isHovered ? (
        <div id="tooltip-bottom" role="tooltip" className="p-4 absolute z-10 inline-block text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
            {wallet}
            <div className="cursor-pointer w-1/4 rounded-lg mx-auto py-1 my-4" style={border} onClick={handleCopyClick}>copy</div>
        </div>
        ):''}
        </button> */}
          {/* <h3>{wallet.slice(0, 4)}...{wallet.slice(-4)}</h3> */}
        </>
      ) : (
        <>
        <button className="text-black p-2 rounded-lg" style={style2} onClick={() => onWalletButtonClick()}>
        {connected ? `${account?.address.slice(0, 4)}...${account?.address.slice(-4)}` : "Connect Wallet"}
        </button>
        </>
      )}
      </div>

{
  walletSelectorModalOpen && (
<div className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
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
                      ? () => onWalletSelected(wallet.name)
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
  )
}

      {loggedin && mywallet && value ?(

<div className="flex flex-row gap-2">
<button 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" className="ms-3 mb-2 md:mb-0 text-white rounded-lg text-xl font-bold px-5 py-2.5 text-center">
          {mywallet.slice(0, 4)}...{mywallet.slice(-4)}
        {/* </button> */}
        {isHovered ? (
        <div id="tooltip-bottom" role="tooltip" className="p-4 absolute z-10 inline-block text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700
        left-1/2 transform -translate-x-1/4 max-w-xl">
            {mywallet}
            <div className="cursor-pointer w-1/4 rounded-lg mx-auto py-1 my-4" style={border} onClick={handleCopyClick}>copy</div>
        </div>
        ):''}
        </button>
<button className="hidden lg:block" 
onClick={() => { setHideFilter(!hidefilter);}}>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            </button>
            </div>
        ): null}


            {
              hidefilter && (
                <>
                  {/* Dropdown menu */}
                  <div id="dropdown" className="z-10 bg-white w-36 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 top-24 lg:right-60 md:right-20 absolute">
                    
                  {loggedin && mywallet && value ?(
                      <>
                      <div className="py-2">
                      <div className="dark:hover:bg-gray-600 hover:bg-gray-100 flex flex-row">
                        {/* <BsHeart className="text-lg mt-2 ml-2 dark:text-white dark:text-black" /> */}
                        <Link to="/view-my-reviews" onClick={()=>setHideFilter(false)} className="mx-auto block px-2 py-0 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Reviews</Link>
                      </div>

                    </div>

                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li className="flex flex-row dark:hover:bg-gray-600 hover:bg-gray-100">
                        {/* <FaUserCircle className="text-lg mt-2 ml-2" /> */}
                        <Link to="/profile" onClick={()=>setHideFilter(false)} className="mx-auto block px-2 py-0 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                      </li>
                    </ul>

                    <div className="py-2 ">
                      <div className="dark:hover:bg-gray-600 hover:bg-gray-100 flex flex-row">
                        {/* <BsHeart className="text-lg mt-2 ml-2 dark:text-white dark:text-black" /> */}
                        <Link to="/dashboard" onClick={()=>setHideFilter(false)} className="mx-auto block px-2 py-0 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Projects</Link>
                      </div>

                    </div>

                    <div className="py-2 ">
                      <div className="dark:hover:bg-gray-600 hover:bg-gray-100 flex flex-row">
                        {/* <BsHeart className="text-lg mt-2 ml-2 dark:text-white dark:text-black" /> */}
                        <Link to="/vpn" onClick={()=>setHideFilter(false)} className="mx-auto block px-2 py-0 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Vpn</Link>
                      </div>

                    </div>
                    </>
                  ): null}


                    {loggedin && mywallet && value ?(
                    <div className="py-2 px-2 text-sm">
                      <div className="flex flex-row">
                      <button onClick={handleDeleteCookie} className="mx-auto hover:text-red-400 text-gray-700" onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>Logout</button>
                      </div>
                    </div>
                     ): null}
       
                    {/* <div className="py-2 ">
                      <div className="dark:hover:bg-gray-600 hover:bg-gray-100 flex flex-row">
                        <BsHeart className="text-lg mt-2 ml-2 dark:text-white dark:text-black" />
                        <Link href="/marketplace" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Marketplaces</Link>
                      </div>

                    </div>
                    <div className="py-2">
                      <div className="dark:hover:bg-gray-600 hover:bg-gray-100 flex flex-row">
                        <FaCog className="text-lg mt-2 ml-2 dark:text-white dark:text-black" />
                        <Link href="/logout" className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</Link>
                      </div>
                    </div> */}
                  </div>
{/* ): null} */}
                </>
              )
            }

        <IconButton
          variant="text"
          className="mr-2 mb-5 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {/* {navList} */}
          <div className="flex justify-between">
          {loggedin && mywallet && value ?(
            <>
          <Link to="/view-my-reviews" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Reviews</Link>
          <Link to="/profile" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Profile</Link>
          <Link to="/dashboard" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Projects</Link>
          <Link to="/vpn" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Vpn</Link>
          </>
          ):null }
          {loggedin && mywallet && value ?(
                    <div className="">
                      <div className="">
                      <button onClick={handleDeleteCookie} className="hover:text-red-400 text-white p-2 rounded-lg" style={border} onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>Logout</button>
                      </div>
                    </div>
                     ): null}
          </div>
          <div className="mx-auto">
            {/* <ConnectWalletButton/> */}
            <div className='text-white font-bold text-center text-xl md:ml-30'>
        {loggedin && mywallet && value ? (
        <>
          <h3 className="mt-6">{mywallet.slice(0, 4)}...{mywallet.slice(-4)}</h3>
        </>
      ) : (
        <button 
        className="bg-green-500 text-black p-2 rounded-lg" style={style2}
        // onClick={connectWallet}
        > Connect Wallet</button>
      )}
      </div>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}