import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import About from './pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollButton from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MapComponent />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <ScrollButton />

      <Footer />
    </Router>
  );
};

export default App;
