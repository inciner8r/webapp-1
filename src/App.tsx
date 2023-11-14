import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ViewMyReviews from './pages/ViewMyReviews';
import MyReviews from './pages/MyReviews';
import AllReviews from './pages/AllReviews';
import Footer from './Components/Footer';
import DynamicPage from './pages/DynamicPage';

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
          <Route path="/domainspecific/:id" Component={DynamicPage} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
