import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home.page.tsx";
import DashboardPage from "./pages/dashboard/dashboard.page.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path={"/"} element={<HomePage />} />
          <Route path={"/dashboard"} element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>,
);
