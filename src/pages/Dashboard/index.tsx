import { useMemo, useState } from 'react';

import Logo from '@/assets/aiko.png';

import { defaultFilters } from './constants';

import { Button, Input, Select } from '@/components';
import { EquipmentAccordion, Map } from './components';

import { useEquipment } from '@/hooks';

import { DashboardProps, FiltersProps } from './models';

import {
  ContainerStyled,
  MapContainerStyled,
  SidebarFilterLineStyled,
  SidebarFilterContainerStyled,
  SidebarHeaderStyled,
  SidebarStyled,
  SidebarListContainerStyled,
} from './styles';

import { SelectOption } from '@/@types';

export const Dashboard = ({
  useEquipmentHook = useEquipment,
}: DashboardProps) => {
  const {
    getEquipmentList,
    getEquipmentModelList,
    getEquipmentStateList,
    getEquipmentStateHistory,
  } = useEquipmentHook();

  const [filters, setFilters] = useState<FiltersProps>(defaultFilters);

  const handleFilterChange = (key: string, value: string | SelectOption) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const equipmentList = useMemo(() => {
    return getEquipmentList().filter((equipment) => {
      if (filters.equipmentName) {
        if (
          !equipment.name
            .toLowerCase()
            .includes(filters.equipmentName.toLowerCase())
        ) {
          return false;
        }
      }

      if (filters.equipmentState) {
        if (
          getEquipmentStateHistory(equipment.id)?.states?.at(-1)?.equipmentState
            ?.id !== filters.equipmentState.value
        ) {
          return false;
        }
      }

      if (filters.equipmentModel) {
        if (equipment.equipmentModel?.id !== filters.equipmentModel.value) {
          return false;
        }
      }

      return true;
    });
  }, [
    getEquipmentList,
    filters.equipmentName,
    filters.equipmentState,
    filters.equipmentModel,
    getEquipmentStateHistory,
  ]);

  const equipmentModelOptions = useMemo(() => {
    return getEquipmentModelList().map((model) => ({
      label: model.name,
      value: model.id,
    }));
  }, [getEquipmentModelList]);

  const equipmentStateOptions = useMemo(() => {
    return getEquipmentStateList().map((state) => ({
      label: state.name,
      value: state.id,
    }));
  }, [getEquipmentStateList]);

  return (
    <ContainerStyled data-testid="dashboard">
      <SidebarStyled data-testid="sidebar">
        <SidebarHeaderStyled>
          <a href="/">
            <img src={Logo} alt="Logo" data-testid="logo" />
          </a>
        </SidebarHeaderStyled>

        <SidebarFilterContainerStyled>
          <Input
            testId="input-equipment-name"
            label="Nome da maquina"
            placeholder="Pesquise pelo nome da maquina"
            value={filters.equipmentName}
            onChange={(e) =>
              handleFilterChange('equipmentName', e.target.value)
            }
          />

          <SidebarFilterLineStyled>
            <Select
              testId="select-equipment-state"
              label="Estado atual"
              placeholder="Selecione o estado atual"
              options={equipmentStateOptions}
              value={filters.equipmentState}
              onChange={(e) =>
                handleFilterChange('equipmentState', e as SelectOption)
              }
            />

            <Select
              testId="select-equipment-model"
              label="Modelo de maquina"
              placeholder="Selecione o modelo da maquina"
              options={equipmentModelOptions}
              value={filters.equipmentModel}
              onChange={(e) =>
                handleFilterChange('equipmentModel', e as SelectOption)
              }
            />

            <Button
              testId="button-clear-filters"
              variant="secondary"
              onClick={() => setFilters(defaultFilters)}
            >
              Limpar
            </Button>
          </SidebarFilterLineStyled>
        </SidebarFilterContainerStyled>

        <SidebarListContainerStyled id="sidebar-list">
          {equipmentList.length === 0 ? (
            <div className="no-equipment">
              <span>Nenhuma máquina encontrada</span>
            </div>
          ) : (
            equipmentList.map((equipment) => (
              <EquipmentAccordion key={equipment.id} equipment={equipment} />
            ))
          )}
        </SidebarListContainerStyled>
      </SidebarStyled>

      <MapContainerStyled data-testid="map-container">
        <Map equipmentList={equipmentList} />
      </MapContainerStyled>
    </ContainerStyled>
  );
};
