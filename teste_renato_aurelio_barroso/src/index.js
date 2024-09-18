import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./globalStyles";
import MainPage from "./Pages/MainPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainPage />
  </React.StrictMode>
);
