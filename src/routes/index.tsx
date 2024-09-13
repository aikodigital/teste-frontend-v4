import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Main } from "../pages/Main";
import AuthGuard from "./guards/AuthGuard";
import { Layout } from "../components/Layout";
import GuestGuard from "./guards/GuestGuard";
import { NotFound } from "../pages/NotFound";
import { MapsShop } from "../pages/MapsShop";

function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route index element={<Main />} />
        <Route path="/mapsshop" element={<MapsShop />} />
      </Route>

      <Route
        path="/login"
        element={
          <GuestGuard>
            <Login />
          </GuestGuard>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RoutesApp;
