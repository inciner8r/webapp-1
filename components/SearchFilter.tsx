import React, { useContext } from 'react';
import ReviewsContext from '../context/reviews/ReviewsContext';

export default function SearchFilter() {
  const a = useContext(ReviewsContext)
  return (
    <div className="md:ml-72 mt-32 md:w-3/4 xs:ml-0 xs:mr-0"> 
    <input type="search" placeholder="Search..." className="border-2 dark:border-none pl-5 pr-3 py-2 md:w-96 xs:w-40 ml-2 xs:mt-1 rounded-full text-xl focus:outline-none" />
    </div>
  )
}
