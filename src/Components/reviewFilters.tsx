import React, { useState } from 'react';


interface FilterButtonProps {
  onFilterChange: (siteSafety: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange }) => {
  const siteSafetyCategories = ['all','safe', 'phishing', 'adware', 'malware', 'spyware'];

  const [selectedSiteSafety, setSelectedSiteSafety] = useState('all');

  const handleSiteSafety = (siteSafety: string) => {
    setSelectedSiteSafety(siteSafety);
    console.log('siteSafety: ', siteSafety)
    onFilterChange(siteSafety);
  };

  return (
    <>
      <div className="hidden md:flex justify-center mt-10 mb-10 space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12 ">
        {siteSafetyCategories.map((siteSafety) => (
          <button
            key={siteSafety}
            onClick={() => handleSiteSafety(siteSafety)}
            className={`transition-all duration-300 uppercase ease-in-out py-2 px-6 lg:px-8 xl:px-10 2xl:px-12 font-bold text-gray-900 rounded-lg p-2 ${
              selectedSiteSafety === siteSafety
                ? 'bg-gradient-to-r from-green-400 to-green-300'
                : 'bg-black bg-opacity-30 text-green-100'
            } hover:bg-gradient-to-r hover:from-green-300 hover:to-green-200 hover:text-black focus:outline-none`}
          >
            {siteSafety}
          </button>
        ))}
      </div>
      <div className="md:hidden mt-6 mb-10 shadow-xl shadow-green-200/50 rounded-xl">
        <select
          value={selectedSiteSafety}
          onChange={(e) => handleSiteSafety(e.target.value)}
          className="text-center uppercase w-full px-4 py-4 bg-black bg-opacity-30 text-green-100 font-bold rounded-lg focus:outline-none appearance-none transition-all duration-300 ease-in-out hover:bg-opacity-60"
        >
          {siteSafetyCategories.map((siteSafety) => (
            <option key={siteSafety} value={siteSafety} className='bg-black hover:bg-green-200 hover:text-black text-green-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out hover:bg-opacity-60 hover:text-black hover:font-bold'>
              {siteSafety}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default FilterButton;
