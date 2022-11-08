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

  // const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; 
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const time = new Date(p.data.createdAt*100)
  const formatedTime = months[time.getMonth()] + " " + time.getDate() + ", [" + time.getHours() + ":" + time.getMinutes() + "]"
  
  return (
  <>
    <div className='card w-96 bg-gray-200 dark:bg-gray-400/25 p-5 m-5 rounded-2xl dark:backdrop-blur-3xl relative top-16 md:scale-90 md:hover:scale-100 duration-500'>
        <a href="#" className='text-xl font-semibold block mb-1 text-blue-600 dark:text-white'>{p.data.domainAddress}</a> <br />
        <span className='border-b-2 border-black dark:border-gray-200 text-3xl font-medium text-black dark:text-gray-200'>N/A</span>
        <p className='my-4 text-xl font-normal text-gray-700 dark:text-gray-300'>{description}</p>
        <div className='flex flex-col text-center text-xl font-medium mt-32'>
        <button className='bg-sky-300 text-blue-800 py-1 px-3 my-1 rounded-3xl cursor-auto font-semibold fixed bottom-24'>{p.data.siteSafety}</button>
        <button className='bg-purple-400 text-purple-900 py-1 px-3 my-2 rounded-3xl cursor-auto font-semibold fixed bottom-12'>{p.data.siteType}</button>
        </div>
        <p className='text-black dark:text-white fixed bottom-5 right-5'>{formatedTime.toString()}</p>
        </div>
    </>
  )
}


export default Card