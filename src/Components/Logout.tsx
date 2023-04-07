import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteWalletData, deleteJwtToken } from '../actions/walletActions';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const lockMetaMask = async () => {
    if (window.ethereum && window.ethereum.provider) {
      try {
        await window.ethereum.provider.request({ method: 'wallet_lock' });
      } catch (error) {
        console.error('Error locking MetaMask:', error);
      }
    }
  };

  const handleLogout = async () => {
    dispatch(deleteWalletData());
    dispatch(deleteJwtToken());
    await lockMetaMask();
    window.location.href = '/all-reviews';
  };

  return (
    <div
      onClick={handleLogout}
      className="bg-black z-10 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 cursor-pointer hover:bg-gradient-to-r hover:from-red-400 hover:to-red-200"
    >
      Logout
    </div>
  );
};

export default LogoutButton;
