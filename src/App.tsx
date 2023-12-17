import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ViewMyReviews from './pages/ViewMyReviews';
import MyReviews from './pages/MyReviews';
import AllReviews from './pages/AllReviews';
import Footer from './Components/Footer';
import DynamicPage from './pages/DynamicPage';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Vpn from './pages/Vpn';
import VerificationSteps from './pages/Verificationsteps';
import OAuthLogin from './Components/google_auth';

const App: React.FC = () => {

  const background = {
    backgroundColor: '#141a31'
  }
  
  return (
    <Router>
      <div style={background}>
        <Navbar/>
        <Routes>
        <Route path="/view-my-reviews" element={<ViewMyReviews/>} />
          <Route path="/my-reviews" element={<MyReviews/>} />
          <Route path="/" element={<AllReviews />} />
          <Route path="/reviews/:id" Component={DynamicPage} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/vpn" element={<Vpn/>} />
          <Route path="/verification-steps" element={<VerificationSteps/>} />
          <Route path="/google_auth" Component={OAuthLogin} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
