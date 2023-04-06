import { Link } from 'react-router-dom';
import Profile from './Profile';
import netsepioLogo from '../assets/netsepio.png';
import LogoutButton from './Logout';
import ConnectWallet from './ConnectWalletButton';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
    <div className="flex-1">
      <img src={netsepioLogo} className="w-14 h-14" alt="Netsepio" />
      <a href="/" className="btn btn-ghost normal-case text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 text-3xl">Netsepio</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <button className='bg-gradient-to-r from-green-200 to-green-400 font-semibold'>
            More
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </button>
          <ul className="bg-black -p-10">
            <li className='bg-black z-10 font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'><ConnectWallet button_text={"Connect"}/></li>
            <li><Link to="/all-reviews" className='bg-black z-10 font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>All Reviews</Link></li>
            <li><label htmlFor="my-modal" className="bg-black z-10 font-bold text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400">Profile</label></li>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal font-bold"><Profile/></div>
            <li className='font-bold'><LogoutButton/></li>
          </ul>
        </li>
      </ul>
    </div>
    </div>
  )
};

export default Navbar;