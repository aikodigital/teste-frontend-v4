import React from 'react';

interface SidebarProps {
  selectedEquipmentId: string | null;
  openStateModal: () => void;
  openPositionModal: () => void;
  closeSidebar: () => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedEquipmentId, openStateModal, openPositionModal, closeSidebar, isOpen }) => {
  return (
    <div
      className={`
        fixed lg:relative top-0 right-0 h-full lg:h-auto w-full lg:w-1/5 z-1030 p-4
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
        shadow-lg
      `}
      style={{ backgroundColor: '#ffffff', zIndex: 1030 }} 
    >
      <button
        className="absolute top-4 left-4 text-xl lg:hidden"
        style={{ color: '#000', zIndex: 1035 }} 
        onClick={closeSidebar}
      >
        &times;
      </button>

      <div className="flex flex-col justify-center items-center h-full text-black">
        {selectedEquipmentId ? (
          <>
            <h4 className="text-center text-xl font-semibold mb-4" style={{ color: '#000' }}>
              Equipamento Selecionado
            </h4>
            <p style={{ color: '#000' }}>ID: {selectedEquipmentId}</p>
          </>
        ) : (
          <p style={{ color: '#000' }}>Nenhum equipamento selecionado</p>
        )}

        <button
          onClick={openStateModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full lg:w-auto"
        >
          Histórico de Estados
        </button>
        <button
          onClick={openPositionModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full lg:w-auto"
        >
          Histórico de Posições
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
