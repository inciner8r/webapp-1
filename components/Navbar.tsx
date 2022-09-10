import React from 'react'

const Navbar = () => {
  return (
    <header className='font-serif'>
      <div className='flex pt-10 px-32 flex-wrap'>
        <h1 className='text-6xl font-semibold xs:mb-7 lg:mb-0 mr-60 text-white'>NetSepio</h1>
        <button className='mx-auto font-medium text-2xl h-12 w-52 bg-blue-700 text-white text-center rounded-2xl hover:scale-90 transition duration-300'>Connect</button>
      </div>

      <div>
        <nav className='flex flex-wrap'>
          <div>
          <ul className='flex flex-wrap text-4xl font-medium pl-32 pt-10'>
            <li className='mr-16 px-2 pb-1 cursor-pointer hover:border-b-4 border-white text-white'>My Reviews</li>
            <li className='cursor-pointer px-2 pb-1 hover:border-b-4 border-white text-white'>Explorer</li>
          </ul>
          </div>

          <div className='xs:w-96 lg:w-2/5 flex flex-wrap lg:ml-auto xs:mx-auto mr-20 mt-5 px-5 py-5 text-2xl font-medium bg-gray-400/25 backdrop-blur-3xl rounded-lg'>
          
          <div>
          <label className='text-white mr-5'>Safety:</label>
          <select className='mr-16 rounded-md text-xl py-1 px-1 cursor-pointer lg:mb-0 xs:mb-5'>
            <option>Any</option>
            <option>Phishing</option>
            <option>Adware</option>
            <option>Malware</option>
            <option>Spyware</option>
            <option>Safe</option>
          </select>
          </div>

          <div>
          <label className='mr-5 text-white'>Type:</label>
          <select className='rounded-md text-xl py-1 px-1 cursor-pointer'>
            <option value="">Any</option>
            <option value="">Common Website</option>
            <option value="">Social Media</option>
            <option value="">Software</option>
            <option value="">Wallet Address</option>
            <option value="">Company</option>
            <option value="">DeFi Project</option>
          </select>
          </div>
          </div>
        </nav>
      </div>
    </header>
    )
}

export default Navbar