import { ConnectButton } from '@rainbow-me/rainbowkit';
import { connectToMetamask, checkWalletAuth } from '../modules/connect_to_metamask';
import { get_and_store_jwtToken, checkJwtToken } from '../modules/authentication';

const WalletConnectionModule = () => {
  const connectWallet = async () => {
    if (!checkWalletAuth()) {
      await connectToMetamask();
    }

    if (!checkJwtToken()) {
      await get_and_store_jwtToken();
    }
  }
  return (
    <div>
      <div onClick={connectWallet} className='md:ml-24'>
        <ConnectButton />
      </div>
    </div>
  );
};

export default WalletConnectionModule;
