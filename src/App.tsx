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
import { Helmet } from 'react-helmet-async';

const App: React.FC = () => {

  const background = {
    backgroundColor: '#141a31'
  }
  
  return (
    <div>
      <Helmet>
        <title>NetSepio</title>
        <meta
          name="Description"
          content="Discover Verified Reviews
          Empower Your Online Security.
          Your go-to for reinforcing online security."
        />
        <meta property="og:url" content="https://app.netsepio.com/" />
        <meta
          name="keywords"
          content="reviews, security, aptos, domain, verified domain, verified reviews, netsepio"
        />
        <meta name="author" content="NetSepio" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:image" content="/netsepio_logo_light.png" />
        <meta property="og:image:alt" content="NetSepio" />
        <meta property="og:image:type" content="image/svg+xml" />
        <meta property="og:image:width" content="500" />
        <meta property="og:image:height" content="500" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NetSepio" />
        <meta
          property="og:description"
          content="Discover Verified Reviews
          Empower Your Online Security.
          Your go-to for reinforcing online security."
        />
        <meta property="og:image" content="/netsepio_logo_light.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://app.netsepio.com/" />
        <meta property="twitter:title" content="NetSepio" />
        <meta
          property="twitter:description"
          content="Discover Verified Reviews
          Empower Your Online Security.
          Your go-to for reinforcing online security."
        />
        <meta property="twitter:image" content="/netsepio_logo_light.png" />

        <link rel="apple-touch-icon" sizes="180x180" href="/netsepio_logo_light.png" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/netsepio_logo_light.png" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/netsepio_logo_light.png" />
      </Helmet>
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
        </Routes>
        <Footer />
      </div>
    </Router>
    </div>
  );
};

export default App;
