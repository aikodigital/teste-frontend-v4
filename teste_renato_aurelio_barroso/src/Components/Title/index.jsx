import React from "react";
import * as S from "./style";

import logo from "../../assets/img/aiko.png";

const TitleSection = ({ text }) => {
  return (
    <S.Title>
      <img src={logo} alt="Aiko company logo" />
      <h1>{text}</h1>
    </S.Title>
  );
};

export default TitleSection;
