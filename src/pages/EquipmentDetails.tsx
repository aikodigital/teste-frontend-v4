import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { calculateProductivity, calculateEarnings } from '../utils/calculations';
import {  EquipmentStateHistory, StateHistory } from '../types/equipment';
import equipmentData from '../data/equipment.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import { ChevronDown } from 'lucide-react';

interface StateDate { date: string | number | Date; }

export function EquipmentDetails() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<'latest' | 'oldest'>('latest');
  const [hiddenHistory, setHiddenHistory] = useState<boolean>(false);

  const equipment = equipmentData.find(e => e.id === id);
  if (!equipment) return <div>Equipamento não encontrado</div>;


  const stateHistory = equipmentStateHistoryData.find(e => e.equipmentId === id);
  const model = equipmentModelData.find(m => m.id === equipment.equipmentModelId);
  const position = equipmentPositionHistoryData
    .find(h => h.equipmentId === id)
    ?.positions.slice(-1)[0];

  const currentState = stateHistory?.states.length
    ? equipmentStateData.find(s => s.id === stateHistory.states.slice(-1)[0].equipmentStateId)
    : null;

  const productivity = stateHistory
    ? calculateProductivity(stateHistory.states)
    : 0;

  const earnings = model && stateHistory
    ? calculateEarnings(stateHistory.states, model)
    : 0;


  const getStateHistoryInOrder = () => {
    if (!stateHistory) return;

    let data = {
      equipmentId: stateHistory.equipmentId,
      states: [...stateHistory.states],
    } as EquipmentStateHistory;
    
    if (order === 'latest')
      data.states = data?.states.sort((a: StateDate, b: StateDate) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (order === 'oldest')
      data.states = data?.states.sort((a: StateDate, b: StateDate) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return data;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">{equipment.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Modelo</p>
                <p className="font-semibold">{model?.name}</p>
              </div>
              {currentState && (
                <div>
                  <p className="text-gray-600">Estado Atual</p>
                  <span
                    className="inline-block px-2 py-1 rounded text-white text-sm"
                    style={{ backgroundColor: currentState.color }}
                  >
                    {currentState.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Métricas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Produtividade</p>
                <p className="text-2xl font-bold">{productivity.toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-gray-600">Ganho Total</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(earnings)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className='flex justify-between items-center'>
              <h3 className="text-xl font-semibold mb-4">Histórico de Estados</h3>
              <ChevronDown 
                onClick={() => setHiddenHistory(!hiddenHistory)}
                className={`cursor-pointer rounded-full p-1 hover:bg-gray-300`}
                style={{ transform: hiddenHistory ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
              />
            </div>
            <div className='text-gray-600 mb-4 cursor-pointer'>
              <span className={`'hover:underline hover:text-blue-400 px-1 ${order == 'latest' ? 'underline text-blue-600' : ''}`} onClick={() => setOrder('latest')}>{"(mais recente)"}</span>
              /
              <span className={`'hover:underline hover:text-blue-400 px-1 ${order == 'oldest' ? 'underline text-blue-600' : ''}`} onClick={() => setOrder('oldest')}>{"(mais antigo)"}</span>
            </div>
            <div className={`space-y-2 ${hiddenHistory ? 'h-[0px] overflow-hidden' : ''}`}>
              {getStateHistoryInOrder()?.states.map((history: StateHistory, index: React.Key | null | undefined) => {
                const state = equipmentStateData.find(s => s.id === history.equipmentStateId);
                if (!state) return null;

                return (
                  <div
                    key={index}
                    className="border rounded p-2 flex justify-between items-center"
                  >
                    <div
                      className="px-2 py-1 rounded text-white text-sm"
                      style={{ backgroundColor: state.color }}
                    >
                      {state.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(history.date), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="text-xl font-semibold mb-4">Localização Atual</h3>
          {position ? (
            <div className="h-[400px]">
              <MapContainer
                center={[position.lat, position.lon]}
                zoom={6}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[position.lat, position.lon]} />
              </MapContainer>
            </div>
          ) : (
            <p>Posição não disponível</p>
          )}
        </div>
      </div>
    </div>
  );
}