import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWalletData, deleteJwtToken } from '../actions/walletActions';
import { Link } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(deleteWalletData());
    dispatch(deleteJwtToken());
  };

  return (
    <div
      onClick={handleLogout}
      className="bg-black z-10 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 cursor-pointer hover:bg-gradient-to-r hover:from-red-400 hover:to-red-200"
    >
      <Link to="/">Logout</Link>
    </div>
  );
};

export default LogoutButton;
