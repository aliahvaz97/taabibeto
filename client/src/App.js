import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './header/header';
import Body from './body1/body';
import WhySnappDoctor from './whytaabibeto/whytaabibeto';
import HomeMedicalServices from './HomeMedicalServices/HomeMedicalServices';
import ProductGrid from './ProductGrid/ProductGrid';
import Footer from './footer/Footer';
import ReservationPage from './rezevparstar/parstar';
import NurseSelection from './NurseSelection/NurseSelection';
import PaymentPage from './PaymentPage/PaymentPage';
import CallbackPage from './CallbackPage/CallbackPage';
import SuccessPage from './SuccessPage/SuccessPage';
import FailurePage from './FailurePage/FailurePage';
import Login from './login/login';
import UserDashboard from "./dashbord/dashbord";
import CustomerDashboard from './customdashboard/CustomerDashboard';
import AdminDashboard from './admindashboard/Dashboard.js';
import './App.css';
import './index.css';

// کامپوننت PrivateRoute برای محافظت از مسیرها
const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("authToken");
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userData) => {
    setLoggedInUser(userData);
    localStorage.setItem("authToken", userData.token);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("authToken");
  };

  const handleNurseSelect = (nurse) => {
    console.log('پرستار انتخاب شده:', nurse);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setLoggedInUser({ token });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={loggedInUser} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Body />
                <WhySnappDoctor />
                <HomeMedicalServices />
                <ProductGrid />
              </>
            }
          />
          <Route path="/rezevparstar/parstar" element={<ReservationPage />} />
          <Route path="/NurseSelection" element={<NurseSelection onSelectNurse={handleNurseSelect} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/failure" element={<FailurePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/dashboard/:userId" element={<PrivateRoute element={<UserDashboard />} />} />
          <Route path="/customdashboard/:userId" element={<PrivateRoute element={CustomerDashboard} />} />
          <Route path="/admindashboard" element={<PrivateRoute element={AdminDashboard} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
