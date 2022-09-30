import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='relative bottom-0 left-0 bg-gray-300 dark:bg-gray-900 w-full py-7 px-2 mt-24 flex flex-col items-center justify-between'>

                <ul className='w-full flex justify-center'>
                    <li className='mx-3'>
                        <Link href="https://twitter.com/NetSepio">
                            <a target="_blank">
                            <img src="/twitter-light.png" alt="Twitter" className='cursor-pointer h-6 mb-2' />
                            </a> 
                        </Link>
                    </li>
                    
                    <li className='mx-3'>
                        <Link href="https://discord.com/invite/5uaFhNpRF6">
                            <a target="_blank">
                            <img src="/discord-light.png" alt="Discord" className='cursor-pointer h-6 mb-2' />
                            </a> 
                        </Link>
                    </li>

                    <li className='mx-3'>
                        <Link href="https://t.me/NetSepio">
                            <a target="_blank">
                            <img src="/telegram-light.png" alt="Telegram" className='cursor-pointer h-6 mb-2' />
                            </a> 
                        </Link>
                    </li>
                    
                </ul>

                <p className='text-black dark:text-gray-400'>
                © Netsepio 2022. All rights reserved.
                </p>

            </div>

        </>
    )
}

export default Footer