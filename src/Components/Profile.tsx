import { useEffect } from 'react';
import { ethers } from 'ethers';
import { connectToMetamask, checkWalletAuth } from '../modules/connect_to_metamask';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Profile: React.FC = () => {
  const walletData = useSelector((state: RootState) => state.wallet.walletData);

  function getNetworkName(chainId: number): string {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      case 80001:
        return 'Polygon Mumbai Testnet';
      case 137:
        return 'Polygon Mainnet';
      case 56:
        return 'Binance Smart Chain Mainnet';
      case 97:
        return 'Binance Smart Chain Testnet';
      case 100:
        return 'xDAI Chain';
      case 128:
        return 'Huobi ECO Chain Mainnet';
      case 256:
        return 'Huobi ECO Chain Testnet';
      case 43114:
        return 'Avalanche Mainnet C-Chain';
      case 43113:
        return 'Avalanche Fuji Testnet C-Chain';
      case 1666600000:
        return 'Harmony Mainnet Shard 0';
      case 1666700000:
        return 'Harmony Testnet Shard 0';
      default:
        return `Unknown Network (Chain ID: ${chainId})`;
    }
  }  

  useEffect(() => {
    async function fetchData() {
      if (!checkWalletAuth()) {
        await connectToMetamask();
      }
    }

    fetchData();
  }, []);

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

  );
};

export default Profile;