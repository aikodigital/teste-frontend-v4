import { createContext, useCallback, useState } from 'react';
import { IContext, ContextProps } from './interface';
import { toast } from 'react-toastify';
import { useStore } from 'zustand';
import useEquipmentStore from '@/zustand';
import { head, isEmpty } from 'lodash';

const url = import.meta.env.VITE_JSON_URL;
const ors_url = import.meta.env.VITE_ORS_URL;
const ors_api_key = import.meta.env.VITE_ORS_API_KEY;

export const Context = createContext({} as IContext);

export const Provider = ({ children }: ContextProps) => {
  const [route, setRoute] = useState<[number, number][]>([]);
  const {
    setEquipments,
    setEquipmentModel,
    setEquipmentPositionHistory,
    setEquipmentState,
    setEquipmentStateHistory
  } = useStore(useEquipmentStore);

  const fetch_data = useCallback(async (fileName: string) => {
    try {
      const response = await fetch(`${url}/data/${fileName}.json`);
      if (!response.ok) throw new Error('Erro ao carregar os dados');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  const fetch_all_data = useCallback(() => {
    toast.promise(
      Promise.all([
        fetch_data('equipment'),
        fetch_data('equipmentModel'),
        fetch_data('equipmentPositionHistory'),
        fetch_data('equipmentState'),
        fetch_data('equipmentStateHistory')
      ]).then(
        ([
          equipmentData,
          modelData,
          positionData,
          stateData,
          stateHistoryData
        ]) => {
          setEquipments(equipmentData);
          setEquipmentModel(modelData);
          setEquipmentPositionHistory(positionData);
          setEquipmentState(stateData);
          setEquipmentStateHistory(stateHistoryData);
        }
      ),
      {
        pending: 'Carregando equipamentos...',
        success: 'Equipamentos carregados com sucesso! 🚀',
        error: 'Erro ao carregar equipamentos! ❌'
      }
    );
  }, [
    fetch_data,
    setEquipmentModel,
    setEquipmentPositionHistory,
    setEquipmentState,
    setEquipmentStateHistory,
    setEquipments
  ]);

  const fetch_route = useCallback(async (coordinates: [number, number][]) => {
    if (coordinates.length < 2) return;
    const body = {
      coordinates: coordinates.map(coord => [coord[1], coord[0]]),
      instructions: false,
      radiuses: 1000000
    };
    try {
      const response = await fetch(ors_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ors_api_key
        },
        body: JSON.stringify(body)
      });
      const data = (await response.json()) as {
        features: {
          geometry: {
            coordinates: [number, number][];
          };
        }[];
      };

      if (data && !isEmpty(data.features)) {
        const routeCoords = head(data.features)?.geometry.coordinates.map(
          ([lon, lat]) => [lat, lon]
        );
        setRoute(routeCoords as [number, number][]);
      }
    } catch (error) {
      console.error('Erro ao buscar rota no ORS:', error);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        get_equipment: () => fetch_data('equipment'),
        get_equipment_model: () => fetch_data('equipmentModel'),
        get_equipment_position_history: () =>
          fetch_data('equipmentPositionHistory'),
        get_equipment_state: () => fetch_data('equipmentState'),
        get_equipment_state_history: () => fetch_data('equipmentStateHistory'),
        fetch_all_data,
        fetch_route,
        route
      }}
    >
      {children}
    </Context.Provider>
  );
};
