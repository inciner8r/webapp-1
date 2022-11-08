import { useQuery } from '@apollo/client';
import React, { ChangeEvent, useState } from 'react';
import { GET_ALL_REVIEWS } from '../../src/graph-ql/queries/GET_ALL_REVIEWS/getAllReviews';
import { GetAllReviews } from '../../src/graph-ql/queries/GET_ALL_REVIEWS/__generated__/GetAllReviews';
import { useAccount } from "wagmi"
import Card from '../../components/CardForAllReviews';
import { useRouter } from 'next/router';

const AllReviews = () => {
  const [filter, setFilter] = useState('');
  const [all, setAll] = useState('');

  let user = useAccount()
  const {
    loading,
    data,
    error,
  } = useQuery<GetAllReviews>(GET_ALL_REVIEWS, {
    variables: {
      filter: filter,
      siteType_contains: all
    },
  });

  const searchText = (event:ChangeEvent<HTMLInputElement>) =>{
    setFilter(event.target.value);    
  }

  return (
    <>
      <div className='flex mt-32 justify-around flex-wrap'>
      <div className="md:w-96">
        <input onChange={searchText} type="search" placeholder="Search..." className="border-2 dark:border-none pl-5 pr-3 py-2 md:w-96 ml-2 xs:mt-1 rounded-full text-xl focus:outline-none" />
      </div>
      <div className='md:flex justify-around w-3/5 xs:hidden bg-gray-200 dark:bg-gray-400/25 rounded-t-3xl'>
        <button onClick={()=>setAll('')} className="dark:hover:text-yellow-300 hover:text-red-600">All</button>
        <button onClick={()=>setAll('Common Website')} className="dark:hover:text-yellow-300 hover:text-red-600">Common Website</button>
        <button onClick={()=>setAll('Social Media')} className="dark:hover:text-yellow-300 hover:text-red-600">Social Media</button>
        <button onClick={()=>setAll('Software')} className="dark:hover:text-yellow-300 hover:text-red-600">Software</button>
        <button onClick={()=>setAll('Wallet Address')} className="dark:hover:text-yellow-300 hover:text-red-600">Wallet Address</button>
        <button onClick={()=>setAll('Company')} className="dark:hover:text-yellow-300 hover:text-red-600">Company</button>
        <button onClick={()=>setAll('DeFi Project')} className="dark:hover:text-yellow-300 hover:text-red-600">DeFi Project</button>
      </div>
      </div>

      {loading&&(<div className='text-center'>
      <img src="/loading.gif" alt="Loading" className='w-12 h-12 my-52 mx-auto'/>
      </div>)}
     

      <div className='flex flex-wrap text-white justify-start pl-14 '>
        {data?.reviews.map(e => <Card data={e} key={e.id}></Card>)} 
      </div>

      <div className='w-44 mx-auto mt-36 mb-52'>     
        {data?.reviews.length===0&&(
          <>
          <img src="/not-found.png" alt="no-results" className='h-44 ml-5'/>
          <h1 className='dark:text-gray-300 text-black text-2xl mt-5 w-64'>Can't find any review!!</h1>
          </>
        )}
      </div>
    </>
  )
}

export default AllReviews