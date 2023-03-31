import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav>
      <div>
        <Link to="/my-reviews">My Reviews</Link>
      </div>
      <div>
        <Link to="/all-reviews">All Reviews</Link>
      </div>
    </nav>
  );
};

export default Navbar;
