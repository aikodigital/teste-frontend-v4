import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import aikoImage from '../img/aiko.png';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            src={aikoImage}
            alt="Aiko"
            width="100"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Text className="ml-auto text-light">
          Desafio Frontend - Rastreamento de equipamentos
        </Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Header;
