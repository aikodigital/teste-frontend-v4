import React, { useState } from 'react';
import './SkeletonPage.css';
import EquipmentStateHistorySection from '../EquipmentStateHistory/equipmentStateHistorySection';
import CardList from '../CardList/CardList';
import MapComponent from '../MapComponent/MapComponent';
import Header from '../Header/header';
import { useNavigate } from 'react-router-dom';
import { useEquipmentData } from '../../contexts/EquipmentDataContext'; // Importa o contexto

interface SkeletonPageProps {
    selectedEquipment?: string | null;
}

const SkeletonPage: React.FC<SkeletonPageProps> = ({ selectedEquipment }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para o termo de pesquisa

    const navigate = useNavigate();

    // Corrigido: chamando diretamente o hook customizado `useEquipmentData`
    const { equipmentList, equipmentStatesHistory, equipmentStatesInfoList, loading } = useEquipmentData();

    const handleCardClick = (id: string) => {
        navigate(`/details?id=${id}`);
    };

    // Função de filtragem de equipamentos pelo nome
    const filteredEquipmentList = equipmentList.filter((equipment) =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Carregando dados...</p>;
    }

    return (
        <>
            <Header />

            <div className="row full-height p-4">
                <div className="col-md-6 card-container">
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
        </>
    );
};

export default SkeletonPage;