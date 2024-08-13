import React from 'react'
import CustomerRegister from '../pages/customerRegister';
import AdminRegister from '../pages/adminRegister';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { MailVerify } from '../pages/mailVerify';
import Login from '../pages/login';
import { Home } from '../pages/home';
export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-registration" element={<CustomerRegister />} />
        <Route path="/admin-registration" element={<AdminRegister />} />
        <Route path="/email-verify" element={<MailVerify />} />
        <Route path="/login" element={<Login />} />
        adminRegister
      </Routes>
    </BrowserRouter>
  );
}
