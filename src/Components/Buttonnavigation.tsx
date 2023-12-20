// ButtonNavigation.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ButtonNavigationProps {
  onNavigate: (page: string) => void;
  count: number;
}

const ButtonNavigation: React.FC<ButtonNavigationProps> = ({ onNavigate, count }) => {
//   const history = useHistory();
  const location = useLocation();

  const [activeButton, setActiveButton] = useState<string>('reviews');

  const changePage = (page: string) => {
    setActiveButton(page);
    onNavigate(page);
  };

  return (
    <div className="inline-flex items-center justify-center w-full gap-4 mb-10 text-lg lg:flex-row md:flex-row flex-col lg:-mt-0 md:-mt-0 -mt-10">
      <Link
        to="/view-my-reviews"
        onClick={() => changePage('reviews')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('reviews') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('reviews') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('reviews') ? '2px solid white' : '',
          }}
      >
        {location.pathname.includes('reviews') && count>0 ? `Reviews (${count})` : 'Reviews'}
      </Link>

      { (location.pathname.includes('dashboard') || !location.pathname.includes('verifiedproj')) && (
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
        {location.pathname.includes('dashboard') && count>0 ? `Projects (${count})` : 'Projects'}
      </Link>
      )
      }
      
      { location.pathname.includes('verifiedproj') && (
        <Link
        to="/verifiedproj"
        onClick={() => changePage('projects')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('verifiedproj') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('verifiedproj') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('verifiedproj') ? '2px solid white' : '',
          }}
      >
        {location.pathname.includes('verifiedproj') && count>0 ? `Projects (${count})` : 'Projects'}
      </Link>
      )
      }

{ (location.pathname.includes('report') || !location.pathname.includes('voting')) && (
      <Link
        to="/report"
        onClick={() => changePage('reports')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('report') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('report') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('report') ? '2px solid white' : '',
          }}
      >
        {location.pathname.includes('report') && count>0 ? `Reports (${count})` : 'Reports'}
      </Link>

)}

{ location.pathname.includes('voting') && (
      <Link
        to="/voting"
        onClick={() => changePage('voting')}
        className={`rounded-lg px-10 py-8 font-bold`}
        style={{
            color: location.pathname.includes('voting') ? 'white' : '#788AA3',
            backgroundColor: location.pathname.includes('voting') ? '#4B5995' : '',
            borderBottom: location.pathname.includes('voting') ? '2px solid white' : '',
          }}
      >
        {location.pathname.includes('voting') && count>0 ? `Reports` : 'Reports'}
      </Link>

)}
      
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
        {location.pathname.includes('vpn') && count>0 ? `VPNs (${count})` : 'VPNs'}
      </Link>
    </div>
  );
};

export default ButtonNavigation;
