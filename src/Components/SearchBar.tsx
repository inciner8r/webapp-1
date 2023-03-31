import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (siteURL: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <div className='flex justify-center my-10'>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search by site URL"
          className="mr-2 p-2 rounded-md border-gray-300"
        />
        <button type="submit" className="py-2 px-4 bg-gradient-to-r from-green-400 to-green-300 text-gray-900 rounded-lg p-2">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
