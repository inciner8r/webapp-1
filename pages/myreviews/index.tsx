import { useQuery } from '@apollo/client';
import React from 'react'
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
  console.log(data)
  return (
    <>

    <div className='flex flex-wrap text-white justify-center mt-14'>

      {data?.reviews.map(e=> <Card data={e} key={e.id}></Card>)}

    </div>
    </>
  )
}

export default Content