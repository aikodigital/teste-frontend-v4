import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';

import EquipmentStateHistorySection from '../EquipmentStateHistory/equipmentStateHistorySection';
import EquipmentFilters from '../EquipmentFilters/EquipmentFilters';
import CardList from '../CardList/CardList';
import MapComponent from '../MapComponent/MapComponent';
import Header from '../Header/header';

import './SkeletonPage.css';

interface SkeletonPageProps {
    selectedEquipment?: string | null;
}

const SkeletonPage: React.FC<SkeletonPageProps> = ({ selectedEquipment }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Filtro por nome de equipamento
    const [modelFilter, setModelFilter] = useState<string>(''); // Filtro por nome de modelo
    const [stateFilter, setStateFilter] = useState<string>(''); // Filtro por nome de estado

    const navigate = useNavigate();

    const { equipmentList, equipmentModelList, equipmentStatesHistory, equipmentStatesInfoList, loading } = useEquipmentData();

    const handleCardClick = (id: string) => {
        navigate(`/details?id=${id}`);
    };

    // Função para aplicar o filtro de equipamento, modelo e estado
    const filteredEquipmentList = equipmentList.filter((equipment) => {
        const equipmentModel = equipmentModelList.find((model) => model.id === equipment.equipmentModelId);
        const latestState = equipmentStatesHistory.find(state => state.equipmentId === equipment.id)?.states;
        const latestStateId = latestState ? latestState[latestState.length - 1]?.equipmentStateId : null;
        const stateInfo = latestStateId
            ? equipmentStatesInfoList.find(info => info.id === latestStateId)
            : null;

        // Filtro por nome do equipamento
        const matchesSearchTerm = equipment.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro por nome do modelo (se fornecido)
        const matchesModel = modelFilter === '' || (equipmentModel && equipmentModel.name.toLowerCase().includes(modelFilter.toLowerCase()));

        // Filtro por nome do estado (se fornecido)
        const matchesState = stateFilter === '' || (stateInfo && stateInfo.name.toLowerCase().includes(stateFilter.toLowerCase()));

        return matchesSearchTerm && matchesModel && matchesState;
    });

    return (
        <>
            <Header />

            {loading ? 
                <div className='row full-height d-flex align-items-center justify-content-center'>
                    <p className='loading-text'>Carregando dados...</p>
                </div>
                :
                <div className="row full-height">
                    <div className="col-md-6 card-container p-4">
                        {selectedEquipment ? (
                            <>
                                <h1>Histórico do Equipamento</h1>
                                <p>
                                    Você está vendo o histórico de posições e estados de um
                                    equipamento. Clique <a onClick={() => navigate(`/`)}>aqui</a> para voltar para a Lista de Equipamentos.
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

                                {/* Componente de filtros */}
                                <EquipmentFilters
                                    searchTerm={searchTerm}
                                    setSearchTerm={setSearchTerm}
                                    modelFilter={modelFilter}
                                    setModelFilter={setModelFilter}
                                    stateFilter={stateFilter}
                                    setStateFilter={setStateFilter}
                                    equipmentModelList={equipmentModelList}
                                    equipmentStatesInfoList={equipmentStatesInfoList}
                                />

                                <CardList
                                    equipmentList={filteredEquipmentList}
                                    onCardClick={handleCardClick}
                                />
                            </>
                        )}
                    </div>

                    <div className="col-md-6 map-container">
                        {filteredEquipmentList?.length > 0 &&
                            <MapComponent
                                selectedEquipment={selectedEquipment}
                                equipmentList={filteredEquipmentList}
                            />
                        }
                    </div>
                </div>
            }
        </>
    );
};

export default SkeletonPage;