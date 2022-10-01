import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { GET_MY_REVIEWS } from '../../src/graph-ql/queries/GET_MY_REVIEWS/getMyReviews';
import { GetMyReviews } from '../../src/graph-ql/queries/GET_MY_REVIEWS/__generated__/GetMyReviews';
import {useAccount} from "wagmi"
import Card from '../../components/Card';

const Content = () => {

  let user = useAccount()
  const {
    loading,
    data,
    error,
  } = useQuery<GetMyReviews>(GET_MY_REVIEWS, {
    variables: {
      reviewBy:user?.address?.toLowerCase()
    },
  });

  if(user?.address===undefined){
    return <> <div className='flex h-screen'>
    <img src="/astronot.gif" alt="Loading"/>
    <h1 className='text-gray-600 dark:text-gray-300 text-center text-4xl my-auto mr-10'>Please connect a wallet to get all your reviews ;)</h1> 
    </div>
    </>
  }

  if (loading) {
    return <div className='text-center'>
      <img src="/loading.gif" alt="Loading" className='w-12 h-12 my-72 mx-auto'/>
    </div>  
  }

  // console.log(data)

  return (
    <>

    <div className='flex flex-wrap text-white justify-center mt-14'>
      {data?.reviews.map(e=> <Card data={e} key={e.id}></Card>)}

    </div>
    
    </>
  )
}

export default Content
