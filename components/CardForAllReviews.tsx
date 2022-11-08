import React, { useEffect, useState } from 'react'
import { GetAllReviews_reviews } from '../src/graph-ql/queries/GET_ALL_REVIEWS/__generated__/GetAllReviews'
import { MetaData } from '../src/types/metadata'
type Props = {
  data:GetAllReviews_reviews
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
  // const max = formatedTime.slice(0, 3);

  // const [filter, setFilter] = useState('');
  // const searchText = (event: { target: { value: React.SetStateAction<string> } }) =>{
  //   setFilter(event.target.value);
  // }
  // console.warn(filter); 
  // let dataSearch = p.data.domainAddress.filter(item=>{
  //   return Object.keys(item).some(key=>
  //     item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
  //     )
  // })

  // {dataSearch?.map((item, index)=>{

  return (
  <>
    {/* <div className="md:ml-auto md:mr-auto mt-32 md:w-96 xs:ml-0 xs:mr-0">
    <input type="search" placeholder="Search..." className="border-2 dark:border-none pl-5 pr-3 py-2 md:w-96 xs:w-40 ml-2 xs:mt-1 rounded-full text-xl focus:outline-none" />
    </div> */} 

    <div className='card w-96 cursor-pointer bg-gray-200 dark:bg-gray-400/25 p-5 m-5 rounded-2xl dark:backdrop-blur-3xl relative top-5 md:scale-90 md:hover:scale-100 duration-300'>
        <a href="#" className='text-xl font-semibold block mb-1 text-blue-600 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis'>{p.data.domainAddress.replace("https://","")}</a> <br />

        <div className='flex flex-row justify-between w-full mb-1'>
        <div className='border-gray-300 border-2 w-full rounded-lg'>
        <div className='dark:bg-gray-400/25 text-black w-4/5 py-1 px-3 text-lg bar' id='genuine-bar'>Genuine</div>
        </div>
        <span className='py-2 text-lg px-2 text-black dark:text-white'>10%</span>
        </div>

        <div className='flex flex-row justify-between w-full mb-1'>
        <div className='border-gray-300 border-2 w-full rounded-lg'>
        <div className='dark:bg-gray-400/25 text-black w-4/5 py-1 px-3 text-lg bar' id='scam-bar'>Scam</div>
        </div>
        <span className='py-2 text-lg px-2 text-black dark:text-white'>20%</span>
        </div>

        <div className='flex flex-row justify-between w-full mb-1'>
        <div className='border-gray-300 border-2 w-full rounded-lg'>
        <div className='dark:bg-gray-400/25 text-black w-4/5 py-1 px-3 text-lg bar' id='stereotype-bar'>Stereotype</div>
        </div>
        <span className='py-2 text-lg px-2 text-black dark:text-white'>30%</span>
        </div>

        <div className='flex flex-row justify-between w-full mb-1'>
        <div className='border-gray-300 border-2 w-full rounded-lg'>
        <div className='dark:bg-gray-400/25 text-black w-4/5 py-1 px-3 text-lg bar' id='hate-bar'>Hate</div>
        </div>
        <span className='py-2 text-lg px-2 text-black dark:text-white'>40%</span>
        </div>

        <div className='flex flex-row justify-between w-full mb-10'>
        <div className='border-gray-300 border-2 w-full rounded-lg'>
        <div className='dark:bg-gray-400/25 text-black w-4/5 py-1 px-3 text-lg bar' id='fake-bar'>Fake</div>
        </div>
        <span className='py-2 text-lg px-2 text-black dark:text-white'>50%</span>
        </div>


        <p className='text-black dark:text-white fixed bottom-5 right-5 '>{formatedTime.toString()}</p>
        </div>
    </>
  )
  // })}
}


export default Card