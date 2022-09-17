import { useState } from "react";
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);


    return (
        <>
        <nav className="w-full fixed top-0 left-0 z-30 shadow">
            <div className="justify-between px-4 py-1 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/#">
                            <h1 className="NetSepio text-4xl font-extrabold md:text-emerald-700 xs:text-black cursor-pointer font">NetSepio</h1>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
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
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-12 md:space-y-0 nav-items-bg md:pb-0 xs:pb-8">
                            <li className="text-black text-xl hover:text-orange-600 md:hover:scale-110 duration-500 md:border-none xs:border-t-2 xs:border-t-black xs:pt-8 md:pt-0 nav-items">
                                <Link href="/myreviews"> My Reviews </Link>
                            </li>
                            <li className="text-black text-xl hover:text-orange-600 md:hover:scale-110 duration-500 nav-items">
                                <Link href="/#">Explorer</Link>
                            </li>
                        </ul>                        
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block button-1">                  
                    <span className='py-3'>
                        <ConnectButton/>
                    </span>
                </div>
            </div>
        </nav>

       
        <ul className="dropdown-container xs:hidden fixed top-0 left-0 right-5 z-20 md:h-36 xs:h-36 w-full md:flex md:px-36 xs:px-3 md:pt-28 xs:pt-24 pb-5 bg-gray-400/25 backdrop-blur-3xl">

    <li className="dropdown-main md:inline-block xs:hidden text-white text-2xl"> Safety <span className="thick-arrow-down md:ml-12 xs:ml-3"></span>
      <ul className="dropdown">
        <li><span className="dropdown-items">Phishing</span></li>
        <li><span className="dropdown-items">Adware</span></li>
        <li><span className="dropdown-items">Malware</span></li>
        <li><span className="dropdown-items">Spyware</span></li>
        <li><span className="dropdown-items">Safe</span></li>
      </ul>
    </li>

    <li className="dropdown-main md:inline-block xs:hidden text-white text-2xl"> Type <span className="thick-arrow-down md:ml-12 xs:ml-3"></span>
      <ul className="dropdown">
        <li><span className="dropdown-items">Common Website</span></li>
        <li><span className="dropdown-items">Social Media</span></li>
        <li><span className="dropdown-items">Software</span></li>
        <li><span className="dropdown-items">Wallet Address</span></li>
        <li><span className="dropdown-items">Company</span></li>
        <li><span className="dropdown-items">DeFi Project</span></li>
      </ul>
    </li>

  </ul>

        <div className="md:hidden inline-block relative top-40 left-1/3 button-2">                  
                    <span className='py-3'>
                        <ConnectButton/>
                    </span>
        </div>
        </>
    );
}