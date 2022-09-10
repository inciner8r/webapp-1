import { useQuery } from '@apollo/client';
import React from 'react'
import { GET_MY_REVIEWS } from '../src/graph-ql/queries/GET_MY_REVIEWS/getMyReviews';
import { GetMyReviews } from '../src/graph-ql/queries/GET_MY_REVIEWS/__generated__/GetMyReviews';
import { MetaData } from '../src/types/metadata';
import Card from './Card';


const Content = () => {
  const {
    loading,
    data,
    error,
  } = useQuery<GetMyReviews>(GET_MY_REVIEWS, {
    variables: {
      reviewBy:"0x7e871cf393d599d4aefc94be8c5e172573e51e22"
    },
  });
  console.log(data)
  
  return (
    <>
    <div className='flex flex-wrap text-white justify-center mt-14'>

      {data?.reviews.map(e=> <Card data={e}></Card>)}

    </div>
    </>
  )
}

export default Content