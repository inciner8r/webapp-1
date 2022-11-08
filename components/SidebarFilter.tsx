import React from 'react'

function SidebarFilter() {
  return (
    <>
    <div className='flex flex-wrap h-96 w-1/3 mr-1 pl-5 mt-10 border-l-2 border-gray-400 fixed right-0'>
    <h2 className='mr-48 mb-5 pl-5 text-3xl'>Site Type</h2>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>All</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>Common Website</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>Social Media</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>Software</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>Wallet Address</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>Company</button>
        <button className='cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-4 rounded-full ml-3 mb-3 w-44 text-base hover:text-yellow-300'>DeFi Project</button>
    </div>
    </>
  )
}

export default SidebarFilter