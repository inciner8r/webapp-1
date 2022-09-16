import React, { useEffect, useState } from 'react'
import { GetMyReviews_reviews } from '../src/graph-ql/queries/GET_MY_REVIEWS/__generated__/GetMyReviews'
import { MetaData } from '../src/types/metadata'
type Props = {
  data:GetMyReviews_reviews
}
const Card = (p:Props) => {
  const [description, setDescription] = useState("")
  useEffect(() => {
    async function get(url:string){
      let result = url.replace("ipfs://", "https://ipfs.io/ipfs/");   
      let data = await fetch(result)
      let  response = await data.json() as MetaData
      console.log(response)     
      setDescription(response.description) 
  } 
  get(p.data.metaDataUri)
  }, [p.data.metaDataUri])
  
  return (
    <div className='card w-96 bg-gray-400/25 p-5 m-5 rounded-3xl backdrop-blur-3xl relative top-32 md:scale-90 md:hover:scale-105 duration-700'>
        <a href="#" className='text-2xl font-semibold block mb-1 text-white'>{p.data.domainAddress}</a> <br />
        <span className='border-b-2 border-white text-3xl font-medium'>N/A</span>
        <p className='my-4 text-xl font-normal'>{description}</p>
        <div className='flex text-2xl font-medium mt-32'>
        <button className='bg-sky-300 text-blue-800 py-1 px-3 rounded-3xl cursor-auto fixed bottom-5 left-5 font-semibold'>{p.data.siteSafety}</button>
        <button className='bg-purple-400 text-purple-900 py-1 px-3 rounded-3xl cursor-auto fixed bottom-5 right-5 font-semibold'>{p.data.siteType}</button>
        </div>
    </div>
  )
}

export default Card