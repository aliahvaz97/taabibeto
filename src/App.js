import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/header';
import Body from "./body1/body";
import WhySnappDoctor from './whytaabibeto/whytaabibeto';
import HomeMedicalServices from './HomeMedicalServices/HomeMedicalServices';
import ProductGrid from "./ProductGrid/ProductGrid";
import Footer from './footer/Footer';
import ReservationPage from './rezevparstar/parstar';
import NurseSelection from './NurseSelection/NurseSelection';
import PaymentPage from './PaymentPage/PaymentPage'; // اضافه کردن صفحه پرداخت
import './App.css';

function App() {
  // تعریف تابع انتخاب پرستار
  const handleNurseSelect = (nurse) => {
    console.log("پرستار انتخاب شده:", nurse);
    // عملیات دلخواه هنگام انتخاب پرستار
  };

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
          <Route path="/nurse-selection" element={<NurseSelection onSelectNurse={handleNurseSelect} />} />
          <Route path="/payment" element={<PaymentPage />} /> {/* مسیر صفحه پرداخت */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
