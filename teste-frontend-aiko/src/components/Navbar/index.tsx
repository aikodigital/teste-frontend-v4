import * as S from "./styles";
import Aiko from "../../assets/aiko.png";

export const Navbar = () => {
  return (
    <S.Container>
      <S.LogoContainer>
        <S.LogoImage src={Aiko} alt="Logo da empresa Aiko" />
      </S.LogoContainer>
    </S.Container>
  );
};

export default Navbar;
