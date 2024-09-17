import React from "react";
import icon from "../../img/aiko.png";
import "./index.css";

export function Header() {
  return (
    <header>
      <img 
        src={icon}
        alt="AIKO"
      ></img>
    </header>
  )
}