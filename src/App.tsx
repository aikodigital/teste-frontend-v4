import React, { useState } from 'react';

import CardList from './components/CardList/CardList';
import MapComponent from './components/MapComponent/MapComponent';
import Header from './components/Header/header';
import EquipmentStateHistorySection from './components/EquipmentStateHistory/equipmentStateHistorySection';

import { equipmentList, equipmentStatesHistory, equipmentStatesInfoList } from './utils/sharedData';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para o termo de pesquisa

  // Função de clique no cartão
  const handleCardClick = (id: string) => {
    setSelectedEquipment(id);
  };

  // Função de filtragem de equipamentos pelo nome
  const filteredEquipmentList = equipmentList.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header />

      <div className="row full-height p-4">
        <div className="col-md-6 card-container">
          {selectedEquipment ? (
            <>
              <h1>Histórico do Equipamento</h1>
              <p>
                Você está vendo o histórico de posições e estados de um
                equipamento. Clique <a onClick={() => setSelectedEquipment(null)}>aqui</a> para voltar para a Lista de Equipamentos.
              </p>

              <EquipmentStateHistorySection
                equipmentId={selectedEquipment}
                stateHistory={equipmentStatesHistory}
                stateInfoList={equipmentStatesInfoList}
              />

            </>
          ) : (
            <>
              <h1>Lista de equipamentos</h1>
              <p>
                Você está vendo as últimas posições e estados dos equipamentos.
                Clique em um dos equipamentos abaixo para verificar seu histórico
                de posições e estados.
              </p>

              {/* Barra de pesquisa */}
              <input
                type="text"
                placeholder="Pesquisar equipamentos por código..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <CardList
                equipmentList={filteredEquipmentList}
                onCardClick={handleCardClick}
              />

            </>
          )}
        </div>

        <div className="col-md-6 map-container">
          <MapComponent
            selectedEquipment={selectedEquipment}
            equipmentList={filteredEquipmentList}
          />
        </div>
      </div>
    </div>
  );
};

export default App;