import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import AllReviews from "./pages/AllReviews";
import MyReviews from "./pages/MyReviews";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/all-reviews" element={<AllReviews />} />
          <Route path="/my-reviews" element={<MyReviews />} />
          <Route path="/" element={<AllReviews />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;