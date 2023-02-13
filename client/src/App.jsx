import React from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Faq from "./pages/faq/Faq";
import Nav from "./components/navbar/Nav";
import Home from "./pages/home/Home";
import Press from "./pages/press/Press";
import Signup from "./pages/loginSignup/Signup";
import Login from "./pages/loginSignup/Login";
import Account from "./pages/account/Account";
import Delivery from "./pages/delivery/Delivery";
import SignupSuccess from "./pages/loginSignup/SignupSuccess";
import YourPackage from "./pages/delivery/YourPackage";
import "./index.css";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import DeliveryRequests from "./pages/deliveryRequests/DeliveryRequests";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/press" element={<Press />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signupSuccess" element={<SignupSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/request" element={<Delivery />} />
        <Route path="/urpackage" element={<YourPackage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/deliveryrequests" element={<DeliveryRequests />} />
      </Routes>
    </>
  );
};

export default App;
