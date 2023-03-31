import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 normal-case text-xl">Netsepio</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/my-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>My Reviews</Link></li>
          <li><Link to="/all-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>All Reviews</Link></li>
        </ul>
      </div>
    </div>
  )
};

export default Navbar;