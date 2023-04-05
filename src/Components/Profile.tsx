import { ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getNetworkName } from '../modules/Utils/utils';
import { connectToMetamask } from '../modules/connect_to_metamask';
import { get_and_store_jwtToken } from '../modules/authentication';

const Profile: React.FC = () => {
  // Function to connect to wallet
  const connectWallet = async () => {
      await connectToMetamask();
      await get_and_store_jwtToken();
  }

  // Get wallet data and jwtToken from Redux state
  const walletData = useSelector((state: RootState) => state.wallet.walletData);
  const jwtToken = useSelector((state: RootState) => state.wallet.jwtToken);
  
  if (!walletData || !jwtToken) {
      return (
        <div className="modal-box bg-black text-gray-200">
        <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div className="flex justify-between items-center">
          <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">Profile</h3>
        </div>
        <button onClick={connectWallet} className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5">
          Connect Wallet
        </button>
        <div className="modal-action">
          <label htmlFor="my-modal" className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5">
            Close
          </label>
        </div>
      </div>
      )
  }

  if (!walletData) {
    return null;
  }
  
  return (
    <div className="modal-box bg-black text-gray-200">
      <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-600 font-bold mb-2">Profile</h3>
      </div>
      <div className="py-4">
        <div className="bg-gray-900 p-2 rounded-md mb-2">
          <p className="text-xs mb-1 text-green-200">Address</p>
          <p className="font-bold text-sm truncate">{walletData.walletAddress}</p>
        </div>
        <div className="flex justify-between items-center mb-2 mt-14">
          <p className="font-bold text-green-200">Balance</p>
          <p>{ethers.utils.formatEther(walletData.balance)} ETH</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-bold text-green-200">Network</p>
          <p>{getNetworkName(walletData.chainId)}</p>
        </div>
      </div>
      <div className="modal-action">
        <label htmlFor="my-modal" className="bg-gradient-to-r from-green-600 to-green-400 text-gray-900 font-semibold rounded-lg p-2 w-full text-center mt-5">
          Close
        </label>
      </div>
    </div>
  )
};

export default Profile;