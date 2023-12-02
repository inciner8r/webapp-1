import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";

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
  const wallet = Cookies.get("platform_wallet");

  const [profileId, setProfileId] = useState<string | null>(null);
  const [userWallet, setUserWallet] = useState<string | null>(null);
  const [aptBalance, setAptBalance] = useState<string | null>(null);
  const [value, setValue] = useState<boolean | null>(true);
  const [hidefilter, setHideFilter] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCopyClick = () => {
    if (typeof wallet === 'string') {
      navigator.clipboard.writeText(wallet);
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
        { loggedin && wallet && value && (
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
            // localStorage.setItem("platform_token", token);
            Cookies.set("platform_token", token, { expires: 7 });
            Cookies.set("platform_wallet", account.address, { expires: 7 });

            setUserWallet(account.address);
      } catch (error) {
        console.error(error);
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
        {loggedin && wallet && value ? (
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
        <button 
        className="text-black p-2 rounded-lg" style={style2}
        onClick={connectWallet}> Connect Wallet</button>
      )}
      </div>

      {loggedin && wallet && value ?(

<div className="flex flex-row gap-2">
<button 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} 
            data-tooltip-target="tooltip-bottom" data-tooltip-placement="bottom" type="button" className="ms-3 mb-2 md:mb-0 text-white rounded-lg text-xl font-bold px-5 py-2.5 text-center">
          {wallet.slice(0, 4)}...{wallet.slice(-4)}
        {/* </button> */}
        {isHovered ? (
        <div id="tooltip-bottom" role="tooltip" className="p-4 absolute z-10 inline-block text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700
        left-1/2 transform -translate-x-1/4 max-w-xl">
            {wallet}
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
                    
                  {loggedin && wallet && value ?(
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


                    {loggedin && wallet && value ?(
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
          {loggedin && wallet && value ?(
            <>
          <Link to="/view-my-reviews" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Reviews</Link>
          <Link to="/profile" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Profile</Link>
          <Link to="/dashboard" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Projects</Link>
          <Link to="/vpn" className="block px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-lg" style={border}>Vpn</Link>
          </>
          ):null }
          {loggedin && wallet && value ?(
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
        {loggedin && wallet && value ? (
        <>
          <h3 className="mt-6">{wallet.slice(0, 4)}...{wallet.slice(-4)}</h3>
        </>
      ) : (
        <button 
        className="bg-green-500 text-black p-2 rounded-lg" style={style2}
        onClick={connectWallet}> Connect Wallet</button>
      )}
      </div>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}