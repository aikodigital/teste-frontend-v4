import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Tooltip} from 'react-leaflet';
import {corIcon} from '../utils/corIcon'

import './EquipmentMap.css';

import equipmentData from '../data/equipment.json';
import equipmentStates from '../data/equipmentState.json';
import positionHistoryData from '../data/equipmentPositionHistory.json';
import equipmentStateHistory from '../data/equipmentStateHistory.json';
import equipmentModelData from '../data/equipmentModel.json';

import HistoryPanel from './HistoryPanel';

const EquipmentMap = () => {
    const [equipamentos, setEquipamentos] = useState([]);
    const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
    const [historicoEstado, setHistoricoEstado] = useState([]);

    useEffect(() => {
        const equipamentosComDados = equipmentData.map((equip) => {
            const posicoesDoEquipamento = positionHistoryData.find(
                (item) => item.equipmentId === equip.id
            );

            const estadosDoEquipamento = equipmentStateHistory.find(
                (item) => item.equipmentId === equip.id);

            if (!posicoesDoEquipamento || posicoesDoEquipamento.positions.length === 0){
                return null;
            }

            const ultimaPosicao = posicoesDoEquipamento.positions.slice(-1)[0];

            let estadoAtual = null;
            if (estadosDoEquipamento && estadosDoEquipamento.states.length > 0) {
                const ultimoEstado = estadosDoEquipamento.states.slice(-1)[0];
                const estadoInfo = equipmentStates.find(
                  (estado) => estado.id === ultimoEstado.equipmentStateId
                );
                estadoAtual = estadoInfo || null;
              }

              const modelo = equipmentModelData.find(
                (m) => m.id === equip.equipmentModelId
              );

            return {
                ...equip,
                position: {
                    lat: ultimaPosicao.lat,
                    lon: ultimaPosicao.lon,
                },
                estadoAtual,
                modelName: modelo ? modelo.name : 'Modelo desconhecido'
            };
        }).filter(Boolean);
        setEquipamentos(equipamentosComDados);
    }, []);

    const equipamentoClick = (equip) => {
        const historico = equipmentStateHistory.find(e => e.equipmentId === equip.id);
        if(historico) {
            const historicoFormatado = historico.states.map((item) => {
                const estadoInfo = equipmentStates.find(est => est.id === item.equipmentStateId)
                return {
                    id: equip.id,
                    data: new Date(item.date).toLocaleString('pt-BR'),
                    estado: estadoInfo?.name || 'Desconhecido',
                    cor: estadoInfo?.color || '#999',
                };
            });
            setEquipamentoSelecionado(equip);
            setHistoricoEstado(historicoFormatado)
        }else{
            setEquipamentoSelecionado(equip);
            setHistoricoEstado([]);
        }
    };

    return (
        <div className="map-wrapper">

            <img src="aiko.png" alt="Logo da empresa" className="map-logo" />

            <MapContainer 
            center={[-19.126, -45.947]} 
            zoom={10} 
            className="map-container">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {equipamentos.map((equip) => (
                    <Marker 
                        key={equip.id} 
                        position={[equip.position.lat, equip.position.lon]} 
                        icon={corIcon(equip.estadoAtual?.color || '#999')} 
                        eventHandlers={{ click: () => equipamentoClick(equip) }}
                    >
                        <Tooltip className="custom-tooltip">
                            <div>
                                <strong>{equip.name}</strong><br />
                                Modelo: {equip.modelName}<br />
                                Estado: <span style={{ color: equip.estadoAtual?.color }}>
                                            {equip.estadoAtual?.name || 'Desconhecido'}
                                        </span>
                            </div>
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>

            <HistoryPanel
                equipamento={equipamentoSelecionado}
                historico={historicoEstado}
                onClose={() => setEquipamentoSelecionado(null)}
            />
        </div>
    );
};

export default EquipmentMap;