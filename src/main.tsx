import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Layout from "./layout.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/home.page.tsx";
import { MapProvider } from "./stores/map-theme.store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MapProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path={"/"} element={<HomePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MapProvider>
  </StrictMode>,
);
