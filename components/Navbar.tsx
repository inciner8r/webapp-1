import { useEffect, useState } from "react";
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export default function Navbar(this: any) {
    const [navbar, setNavbar] = useState(false);
    const { systemTheme, theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderThemeChanger = () => {

        if (!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;
        if (currentTheme === 'dark') {
            return (
                <SunIcon className='w-7 h-7' role='button' onClick={() => setTheme
                    ('light')} />
            )
        }
        else {
            return (
                <MoonIcon className='w-7 h-7' role='button' onClick={() => setTheme
                    ('dark')} />
            )
        }
    }

    return (
        <>
            <nav className="w-full fixed top-0 left-0 z-30 shadow bg-white dark:bg-black">
                <div className="justify-around px-4 py-1 mx-5 lg:max-w-full md:items-center md:flex md:px-1">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                            <Link href="/myreviews">
                                <h1 className="NetSepio text-4xl font-extrabold text-black dark:text-white cursor-pointer">
                                    <img src="/icon-dark-transparent.png" alt="NetSepio Logo" className="h-10 inline-block mr-3 dark:hidden" />
                                    <img src="/icon-light-transparent.png" alt="NetSepio Logo" className="h-10 hidden dark:inline-block mr-3" />
                                    NetSepio
                                </h1>
                            </Link>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-black dark:text-white"
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
                                            className="w-6 h-6 text-black dark:text-white"
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
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                                }`} >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-12 md:space-y-0 nav-items-bg md:pb-0 xs:pb-8">
                                <li className="text-black dark:text-white text-xl hover:text-orange-600 md:hover:scale-110 duration-500 xs:pt-8 md:pt-0 md:border-none xs:border-t-2 xs:border-t-black xs:dark:border-t-white nav-items ">
                                    <Link href="/#">Explorer</Link>
                                </li>
                                <li className="text-black dark:text-white text-xl hover:text-orange-600 md:hover:scale-110 duration-500 nav-items">
                                    <Link href="/myreviews"> My Reviews </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="hidden space-x-2 md:inline-block button-1">
                        <span className='py-3 dark:text-black'>
                            <ConnectButton />
                        </span>
                    </div>

                    <div>
                    {renderThemeChanger()}
                    </div>
               

                </div>
            </nav>

            <div className="flex justify-start ml-5 mr-14 px-1 relative top-28 left-10">

                <div className="button-2 md:hidden">
                    <span className='py-3'>
                        <ConnectButton />
                    </span>
                </div>

                <div>
                    <input type="search" placeholder="Search" className="border-none shadow-md px-3 py-1 md:w-72 xs:w-40 ml-28 md:mt-5 xs:mt-1 md:mr-32 rounded-full" />
                </div>

            </div>
        </>
    );
}