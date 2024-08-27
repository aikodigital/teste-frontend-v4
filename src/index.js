import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);
