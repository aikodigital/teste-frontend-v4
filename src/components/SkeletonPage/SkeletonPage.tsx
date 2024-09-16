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

    const navigate = useNavigate();

    const { equipmentList, equipmentStatesHistory, equipmentStatesInfoList, loading } = useEquipmentData();

    const handleCardClick = (id: string) => {
        navigate(`/details?id=${id}`);
    };

    const filteredEquipmentList = equipmentList.filter((equipment) =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
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