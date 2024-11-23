import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
