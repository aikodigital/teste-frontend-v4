import React from 'react';
import Filtros from '../component/Filtros';
import Menu from '../component/Menu-Lateral';
import Img from '../assets/img.jpg';

function Painel() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sidebar (Menu) */}
      <Menu />

      {/* Main Content */}
      <div className="flex flex-col w-full h-full">
        {/* Filters */}
        <div className="absolute top-0 left-16 right-0 p-4 flex justify-center z-10">
          <Filtros />
        </div>

        {/* Background Map */}
        <div className="flex-grow w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${Img})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Painel;
