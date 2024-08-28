import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Forest Operations Dashboard</h1>
      <nav>
        <Link to="/" className="mr-4">
          Mapa
        </Link>
      </nav>
    </header>
  );
};

export default Header;
