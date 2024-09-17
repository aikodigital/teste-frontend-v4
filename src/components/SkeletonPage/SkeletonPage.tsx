import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipmentData } from '../../contexts/EquipmentDataContext';

import EquipmentStateHistorySection from '../EquipmentStateHistory/equipmentStateHistorySection';
import CardList from '../CardList/CardList';
import MapComponent from '../MapComponent/MapComponent';
import Header from '../Header/header';

import './SkeletonPage.css';

interface SkeletonPageProps {
    selectedEquipment?: string | null;
}

const SkeletonPage: React.FC<SkeletonPageProps> = ({ selectedEquipment }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [modelFilter, setModelFilter] = useState<string>('');
    const [stateFilter, setStateFilter] = useState<string>('');
    const [showFilters, setShowFilters] = useState<boolean>(false);
    
    const navigate = useNavigate();

    const { equipmentList, equipmentModelList, equipmentStatesHistory, equipmentStatesInfoList, loading } = useEquipmentData();

    const handleCardClick = (id: string) => {
        navigate(`/details?id=${id}`);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
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

                                <div className="row mb-3">
                                    {/* Input de pesquisa por nome do equipamento */}
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            placeholder="Pesquisar equipamentos por código..."
                                            className="form-control"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Botão de Filtrar */}
                                    <div className="col-md-4 d-flex">
                                        <button
                                            className="btn btn-primary w-100"
                                            onClick={toggleFilters}
                                        >
                                            {showFilters ? 'Esconder Filtros' : 'Filtrar'}
                                        </button>
                                    </div>
                                </div>

                                {showFilters && (
                                    <div className="row">
                                        {/* Select para filtrar por modelo */}
                                        <div className="col-md-12 mb-3">
                                            <select
                                                className="form-control"
                                                value={modelFilter}
                                                onChange={(e) => setModelFilter(e.target.value)}
                                            >
                                                <option value="">Todos os modelos</option>
                                                {equipmentModelList.map((model) => (
                                                    <option key={model.id} value={model.name}>
                                                        {model.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Select para filtrar por estado */}
                                        <div className="col-md-12 mb-3">
                                            <select
                                                className="form-control"
                                                value={stateFilter}
                                                onChange={(e) => setStateFilter(e.target.value)}
                                            >
                                                <option value="">Todos os estados</option>
                                                {equipmentStatesInfoList.map((state) => (
                                                    <option key={state.id} value={state.name}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                {filteredEquipmentList?.length > 0 ?
                                    <CardList
                                        equipmentList={filteredEquipmentList}
                                        onCardClick={handleCardClick}
                                    /> : <p>Não há equipamentos que correspondam à esses filtros.</p>
                                }
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
            }
        </>
    );
};

export default SkeletonPage;