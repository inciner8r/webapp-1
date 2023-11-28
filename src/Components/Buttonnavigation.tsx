// // ButtonNavigation.tsx
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// interface ButtonNavigationProps {
//   onNavigate: (page: string) => void;
// }

// const ButtonNavigation: React.FC<ButtonNavigationProps> = ({ onNavigate }) => {
//   const [activeButton, setActiveButton] = useState<string>('reviews');

//   const changePage = (page: string) => {
//     setActiveButton(page);
//     onNavigate(page);
//   };

//   return (
//     <div className="inline-flex items-center justify-center w-full gap-4 mb-10">
//       <Link
//       to="/view-my-reviews"
//         onClick={() => changePage('reviews')}
//         className={`border rounded-lg px-10 py-8 ${activeButton === 'reviews' ? 'bg-white text-black' : 'text-white'}`}
//       >
//         Reviews
//       </Link>
//       <Link
//       to="/dashboard"
//         onClick={() => changePage('projects')}
//         className={`border rounded-lg px-10 py-8 ${activeButton === 'projects' ? 'bg-white text-black' : 'text-white'}`}
//       >
//         Projects
//       </Link>
//       <Link
//       to="/vpn"
//         onClick={() => changePage('vpns')}
//         className={`border rounded-lg px-12 py-8 ${activeButton === 'vpns' ? 'bg-white text-black' : 'text-white'}`}
//       >
//         VPNs
//       </Link>
//     </div>
//   );
// };

// export default ButtonNavigation;



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
    <div className="inline-flex items-center justify-center w-full gap-4 mb-10">
      <Link
        to="/view-my-reviews"
        onClick={() => changePage('reviews')}
        className={`text-white border rounded-lg px-10 py-8 ${
          location.pathname.includes('view-my-reviews') ? 'bg-white text-black' : ''
        }`}
      >
        Reviews
      </Link>
      <Link
        to="/dashboard"
        onClick={() => changePage('projects')}
        className={`text-white border rounded-lg px-10 py-8 ${
          location.pathname.includes('dashboard') ? 'bg-white text-black' : ''
        }`}
      >
        Projects
      </Link>
      <Link
        to="/vpn"
        onClick={() => changePage('vpns')}
        className={`text-white border rounded-lg px-12 py-8 ${
          location.pathname.includes('vpn') ? 'bg-white text-black' : ''
        }`}
      >
        VPNs
      </Link>
    </div>
  );
};

export default ButtonNavigation;
