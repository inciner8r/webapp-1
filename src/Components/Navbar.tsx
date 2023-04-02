import { Link } from 'react-router-dom';
import Profile from './Profile';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
    <div className="flex-1">
      <a href="/" className="btn btn-ghost normal-case text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 text-3xl">Netsepio</a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li tabIndex={0}>
          <button className='bg-gradient-to-r from-green-200 to-green-400'>
            More
            <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
          </button>
          <ul className="-p-10">
            <li><Link to="/my-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>My Reviews</Link></li>
            <li><Link to="/all-reviews" className='text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400'>All Reviews</Link></li>
            <li><label htmlFor="my-modal" className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400">Profile</label></li>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal"><Profile/></div>

          </ul>
        </li>
      </ul>
    </div>
    </div>
  )
};

export default Navbar;