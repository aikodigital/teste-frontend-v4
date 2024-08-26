import { useMemo } from 'react';

import GarraTracadora from '@/assets/images/garra-tracadora.jpg';
import Harvester from '@/assets/images/harvester.jpg';
import CaminhaoCarga from '@/assets/images/caminhao-de-carga.jpg';

import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from '@/components';

import { useProcessData } from '@/hooks';

import {
  EquipmentAccordionTriggerContainerStyled,
  EquipmentAccordionIconStyled,
  EquipmentAccordionTextsStyled,
  EquipmentAccordionContentStyled,
} from './styles';

import { EquipmentAccordionProps } from './models';

export const EquipmentAccordion = ({
  equipment,
  useProcessDataHook = useProcessData,
}: EquipmentAccordionProps) => {
  const { getEquipmentStateHistory } = useProcessDataHook();

  const getIcon = (id: string) => {
    switch (id) {
      case '9c3d009e-0d42-4a6e-9036-193e9bca3199':
        return GarraTracadora;
      case 'a4b0c114-acd8-4151-9449-7d12ab9bf40f':
        return Harvester;
      case 'a3540227-2f0e-4362-9517-92f41dabbfdf':
        return CaminhaoCarga;
      default:
        return;
    }
  };

  const latestStatus = useMemo(() => {
    return getEquipmentStateHistory(equipment.id)
      ?.states?.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
      ?.at(-1)?.equipmentState;
  }, [equipment.id, getEquipmentStateHistory]);

  return (
    <AccordionContainer type="single" collapsible>
      <AccordionItem value="1">
        <AccordionTrigger>
          <EquipmentAccordionTriggerContainerStyled>
            <div className="info">
              <EquipmentAccordionIconStyled
                src={getIcon(equipment.equipmentModel?.id || '')}
                alt="Equipment"
              />

              <EquipmentAccordionTextsStyled>
                <h3>{equipment.name}</h3>
                <span>{equipment.equipmentModel?.name}</span>
              </EquipmentAccordionTextsStyled>
            </div>

            <div className="status">
              <Badge color={latestStatus?.color}>{latestStatus?.name}</Badge>
            </div>
          </EquipmentAccordionTriggerContainerStyled>
        </AccordionTrigger>

        <AccordionContent>
          <EquipmentAccordionContentStyled></EquipmentAccordionContentStyled>
        </AccordionContent>
      </AccordionItem>
    </AccordionContainer>
  );
};
