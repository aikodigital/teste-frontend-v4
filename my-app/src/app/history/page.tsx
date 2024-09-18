"use client"

import React from "react";
import EquipmentTable from "../../components/equipmentTable/equipmentTable"; // Certifique-se de ajustar o caminho conforme necessário

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Histórico de Serviços</h1>
      {/* Aqui você importa e usa o componente EquipmentTable */}
      <EquipmentTable />
    </div>
  );
};

export default HomePage;

