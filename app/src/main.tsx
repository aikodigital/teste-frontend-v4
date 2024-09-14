import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SideNav } from "./components/sidenav.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SideNav />
    <App />
  </StrictMode>
);
