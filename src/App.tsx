import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyReviews from './pages/MyReviews';
import AllReviews from './pages/AllReviews';
import Footer from './Components/Footer';
import { connectToMetamask, WalletData } from './modules/connect_to_metamask';

const App: React.FC = () => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const walletData = await connectToMetamask();
      if (walletData) {
        setWalletData(walletData);
      }
    }

    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Navbar walletData={walletData} />
        <Routes>
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/my-reviews" element={<MyReviews walletData={walletData} />} />
          <Route path="/" element={<AllReviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
