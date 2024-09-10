import React from 'react'
import AdminRegister from "../pages/Register";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { MailVerify } from '../pages/mailVerify';
import Login from '../pages/login';
import { Home } from '../pages/home';
import PrivateRoute from "../utils/privateRoutes";
import { lazy, Suspense } from "react";

const CustomerRegister = lazy(() => import("../pages/customerRegister"));
export const Routers = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/customer-registration" element={<CustomerRegister />} />
          <Route path="/registration" element={<AdminRegister />} />
          <Route path="/email-verify" element={<MailVerify />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
