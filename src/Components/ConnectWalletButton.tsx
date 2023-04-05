import { connectToMetamask } from '../modules/connect_to_metamask';
import { get_and_store_jwtToken } from '../modules/authentication';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ConnectWallet = () => {
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
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <button onClick={connectWallet} className='inline-flex items-center justify-center w-full font-bold px-6 py-3 mb-2 text-lg text-black bg-green-300 rounded-2xl sm:w-auto sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80'>Connect Wallet</button>
            </div>
        )
    }

    return (
        <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
            <Link to="/my-reviews" className='inline-flex items-center justify-center w-full font-bold px-6 py-3 mb-2 text-lg text-black bg-green-300 rounded-2xl sm:w-auto sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80'>My Reviews</Link>
        </div>
    )
}

export default ConnectWallet
