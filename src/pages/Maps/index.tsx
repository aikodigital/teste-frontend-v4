import Logo from '@/assets/aiko.png';

import { EquipmentAccordion, Map } from './components';

import {
  ContainerStyled,
  MapContainerStyled,
  SidebarFilterLineStyled,
  SidebarFilterContainerStyled,
  SidebarHeaderStyled,
  SidebarStyled,
  SidebarListContainerStyled,
} from './styles';
import { Input, Select } from '../../components';
import { useProcessData } from '@/hooks';
import { MapsProps } from './models';

export const Maps = ({ useProcessDataHook = useProcessData }: MapsProps) => {
  const { getEquipmentList } = useProcessDataHook();

  const equipmentList = getEquipmentList();

  return (
    <ContainerStyled>
      <SidebarStyled>
        <SidebarHeaderStyled>
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>
        </SidebarHeaderStyled>

        <SidebarFilterContainerStyled>
          <Input
            label="Nome da maquina"
            placeholder="Pesquise pelo nome da maquina"
          />

          <SidebarFilterLineStyled>
            <Select
              label="Estado atual"
              placeholder="Selecione o estado atual"
              options={[
                { label: 'Tipo 1', value: '1' },
                { label: 'Tipo 2', value: '2' },
              ]}
            />
            <Select
              label="Modelo de maquina"
              placeholder="Selecione o modelo da maquina"
              options={[
                { label: 'Tipo 1', value: '1' },
                { label: 'Tipo 2', value: '2' },
              ]}
            />
          </SidebarFilterLineStyled>
        </SidebarFilterContainerStyled>

        <SidebarListContainerStyled>
          {equipmentList.map((equipment) => (
            <EquipmentAccordion key={equipment.id} equipment={equipment} />
          ))}
        </SidebarListContainerStyled>
      </SidebarStyled>

      <MapContainerStyled>
        <Map equipmentList={equipmentList} />
      </MapContainerStyled>
    </ContainerStyled>
  );
};
