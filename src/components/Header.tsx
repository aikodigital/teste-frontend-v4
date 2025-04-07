import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import logo from '../assets/img/aiko.png';

const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img
          srcSet={logo}
          src={logo}
          alt='logo'
          loading="lazy"
          style={{ height: '3rem'}}
        />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
