import { Container } from './styles';
import logo from '../img/aiko.png';

const Header: React.FC = () => (
    <Container>
      <img src={logo} alt="AIKO" />
    </Container>
  );
  
  export default Header;