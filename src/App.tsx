import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import MyReviews from './pages/MyReviews';
import AllReviews from './pages/AllReviews';
import Footer from './Components/Footer';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/my-reviews" element={<MyReviews/>} />
          <Route path="/" element={<AllReviews />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
