// ButtonNavigation.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ButtonNavigationProps {
  onNavigate: (page: string) => void;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({ onNavigate }) => {
//   const history = useHistory();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState<string>('reviews');

  const changePage = (page: string) => {
    setActiveButton(page);
    onNavigate(page);
  };

  return (
    <div className="inline-flex items-center justify-center w-full gap-4 mb-10 text-lg">
      <Link
        to="/view-my-reviews"
        onClick={() => changePage('reviews')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('view-my-reviews') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('view-my-reviews') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('view-my-reviews') ? '2px solid white' : '',
          }}
      >
        Reviews
      </Link>
      <Link
        to="/dashboard"
        onClick={() => changePage('projects')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('dashboard') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('dashboard') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('dashboard') ? '2px solid white' : '',
          }}
      >
        Projects
      </Link>
      <Link
        to="/vpn"
        onClick={() => changePage('vpns')}
        className={`rounded-lg px-14 py-8 font-bold`}
        style={{
            color: location.pathname.includes('vpn') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('vpn') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('vpn') ? '2px solid white' : '',
          }}
      >
        VPNs
      </Link>
    </div>
  );
};

export default ButtonNavigation;
