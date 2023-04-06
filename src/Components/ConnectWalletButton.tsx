import { connectToMetamask } from '../modules/connect_to_metamask';
import { get_and_store_jwtToken } from '../modules/authentication';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface ConnectWalletProps {
    button_text: string
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ button_text }) => {
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
            <div>
                <button onClick={connectWallet}>{button_text}</button>
            </div>
        )
    }

    return (
        <div>
            <Link to="/my-reviews">Your Reviews</Link>
        </div>
    )
}

export default ConnectWallet
