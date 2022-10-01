import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { GET_ALL_REVIEWS } from '../../src/graph-ql/queries/GET_ALL_REVIEWS/getAllReviews';
import { GetAllReviews } from '../../src/graph-ql/queries/GET_ALL_REVIEWS/__generated__/GetAllReviews';
import {useAccount} from "wagmi"
import Card from '../../components/Card';

const AllReviews = () => {

  let user = useAccount()
  const {
    loading,
    data,
    error,
  } = useQuery<GetAllReviews>(GET_ALL_REVIEWS, {
    variables: {
      reviewBy:user?.address?.toLowerCase()
    },
  });

  if (loading) {
    return <div className='text-center'>
      <img src="/loading.gif" alt="Loading" className='w-12 h-12 my-72 mx-auto'/>
    </div>  
  }

//   console.log(data)

  return (
    <>

    <div className='flex flex-wrap text-white justify-center mt-14'>
      {data?.reviews.map(e=> <Card data={e} key={e.id}></Card>)}

    </div>
    
    </>
  )
}

export default AllReviews