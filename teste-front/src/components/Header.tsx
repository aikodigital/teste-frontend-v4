import React from "react";
import "../styles/header.scss";
import logo from "../assets/img/aiko.png";

const Header = () => {
  return (
    <header>
      <div className="header-logo">
        <img src={logo} alt="Logo da Empresa" />
      </div>
    </header>
  );
};

export default Header;
