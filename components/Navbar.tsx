import { useState } from "react";
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <>
        <nav className="w-full fixed top-0 left-0 z-30 md:bg-green-400 xs:bg-black shadow md:rounded-b-full">
            <div className="justify-between px-4 py-1 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <a href="javascript:void(0)">
                            <h1 className="NetSepio text-4xl font-extrabold md:text-emerald-900 xs:text-white">NetSepio</h1>
                        </a>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
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
                                        className="w-6 h-6 text-white"
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
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-12 md:space-y-0">
                            <li className="text-white text-xl hover:text-orange-600">
                                <Link href="/myreviews"> My Reviews </Link>
                            </li>
                            <li className="text-white text-xl hover:text-orange-600">
                                <Link href="/#">Explorer</Link>
                            </li>
                        </ul>                        
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">                  
                    <span className='py-3'>
                        <ConnectButton/>
                    </span>
                </div>
            </div>
        </nav>

        <div className="fixed top-0 left-0 right-5 z-20 md:h-40 xs:h-36 w-full flex justify-between md:px-36 xs:px-3 md:pt-28 xs:pt-24 pb-5 md:text-lg xs:text-sm font-medium bg-gray-400/25 backdrop-blur-3xl">

        <div>
          <label className='text-white md:mr-5 xs:mr-1'>Safety:</label>
          <select className='rounded-md py-1 px-1 cursor-pointer'>
            <option>Any</option>
            <option>Phishing</option>
            <option>Adware</option>
            <option>Malware</option>
            <option>Spyware</option>
            <option>Safe</option>
          </select>
          </div>

          <div>
          <label className='text-white md:mr-5 xs:mr-1'>Type:</label>
          <select className='rounded-md py-1 px-1 cursor-pointer'>
            <option value="">Any</option>
            <option value="">Common Website</option>
            <option value="">Social Media</option>
            <option value="">Software</option>
            <option value="">Wallet Address</option>
            <option value="">Company</option>
            <option value="">DeFi Project</option>
          </select>
          </div>

        </div>
        <div className="md:hidden inline-block relative top-40 left-1/3">                  
                    <span className='py-3'>
                        <ConnectButton/>
                    </span>
        </div>
        </>
    );
}