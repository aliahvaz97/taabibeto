import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import Body from "./body1/body";
import WhySnappDoctor from './whytaabibeto/whytaabibeto';
import HomeMedicalServices from './HomeMedicalServices/HomeMedicalServices';
import ProductGrid from"./ProductGrid/ProductGrid";
import Footer from './footer/Footer';
import ReservationPage from './rezevparstar/parstar';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Body />
              <WhySnappDoctor />
              <HomeMedicalServices />
              <ProductGrid />
            </>
          } />
          <Route path="/rezevparstar/parstar" element={<ReservationPage />} />
          {/* سایر مسیرها */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
