import { useEffect, useMemo, useRef, useState } from 'react';

import {
  AccordionContainer,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
} from '@/components';

import { useEquipment } from '@/hooks';

import {
  EquipmentAccordionTriggerContainerStyled,
  EquipmentAccordionIconStyled,
  EquipmentAccordionTextsStyled,
  EquipmentAccordionContentStyled,
  EquipmentAccordionFooterStyled,
  EquipmentAccordionFooterItemStyled,
  EquipmentAccordionContentListStyled,
  EquipmentAccordionContentListItemStyled,
} from './styles';

import { EquipmentAccordionProps } from './models';

import { EquipmentState } from '@/@types';

export const EquipmentAccordion = ({
  equipment,
  useEquipmentHook = useEquipment,
}: EquipmentAccordionProps) => {
  const accordionTriggerRef = useRef<HTMLButtonElement>(null);

  const {
    getEquipmentStateHistory,
    getEquipmentPositionHistory,
    getIcon,
    getProductivity,
    getGain,
    equipmentPositionHistory,
    changeEquipmentPositionHistory,
  } = useEquipmentHook();

  const [historyVisibleLength, setHistoryVisibleLength] = useState(20);

  const handleShowMoreHistory = () => {
    setHistoryVisibleLength((prev) => prev + 20);
  };

  const equipmentStateHistory = useMemo(() => {
    return getEquipmentStateHistory(equipment.id);
  }, [equipment.id, getEquipmentStateHistory]);

  const equipmentProductivity = useMemo(() => {
    return getProductivity({ equipmentId: equipment.id, hours: 24 });
  }, [equipment.id, getProductivity]);

  const equipmentGain = useMemo(() => {
    return getGain({
      equipmentModelId: equipment.equipmentModel?.id || '',
      productivity: equipmentProductivity,
    });
  }, [equipment.equipmentModel?.id, equipmentProductivity, getGain]);

  useEffect(() => {
    const redefineHistoryVisibleLength = () => {
      setTimeout(() => {
        setHistoryVisibleLength(20);
        changeEquipmentPositionHistory({
          show: false,
          equipmentId: undefined,
          data: undefined,
        });
      }, 300);
    };

    if (accordionTriggerRef.current) {
      accordionTriggerRef.current.addEventListener(
        'click',
        redefineHistoryVisibleLength
      );
    }

    return () => {
      if (accordionTriggerRef.current) {
        accordionTriggerRef.current.removeEventListener(
          'click',
          redefineHistoryVisibleLength
        );
      }
    };
  }, [changeEquipmentPositionHistory, accordionTriggerRef]);

  return (
    <AccordionContainer type="single" collapsible>
      <AccordionItem value="1">
        <AccordionTrigger
          id={`accordion-trigger-${equipment.id}`}
          ref={accordionTriggerRef}
        >
          <EquipmentAccordionTriggerContainerStyled>
            <div className="info">
              <EquipmentAccordionIconStyled
                src={getIcon({
                  equipmentModelId: equipment.equipmentModel?.id || '',
                })}
                alt="Equipment"
              />

              <EquipmentAccordionTextsStyled>
                <h3>{equipment.name}</h3>
                <span>{equipment.equipmentModel?.name}</span>
              </EquipmentAccordionTextsStyled>
            </div>

            <div className="status">
              <Badge
                color={
                  equipmentStateHistory?.states?.at(-1)?.equipmentState?.color
                }
              >
                {equipmentStateHistory?.states?.at(-1)?.equipmentState?.name}
              </Badge>
            </div>
          </EquipmentAccordionTriggerContainerStyled>
        </AccordionTrigger>

        <AccordionContent>
          <EquipmentAccordionContentStyled>
            {historyVisibleLength <
            (equipmentStateHistory?.states?.length || 0) ? (
              <Button
                tabIndex={0}
                variant="secondary"
                onClick={handleShowMoreHistory}
              >
                Ver estados anteriores
              </Button>
            ) : null}

            <EquipmentAccordionContentListStyled>
              {equipmentStateHistory?.states
                ?.slice(-historyVisibleLength)
                ?.map(({ equipmentState, date }, i, arr) => (
                  <EquipmentAccordionContentListItemStyled key={date}>
                    <div className="row header">
                      <strong>{new Date(date).toLocaleString()}</strong>
                    </div>

                    <div className="row">
                      <span>Estado:</span>
                      <strong style={{ color: equipmentState?.color }}>
                        {equipmentState?.name}
                      </strong>
                    </div>

                    <div className="row">
                      <span>Duração:</span>
                      <strong>
                        {i < arr.length - 1
                          ? `${(new Date(arr[i + 1].date).getTime() - new Date(date).getTime()) / 1000 / 60 / 60} horas`
                          : 'Até o momento'}
                      </strong>
                    </div>
                  </EquipmentAccordionContentListItemStyled>
                ))}
            </EquipmentAccordionContentListStyled>

            <Button
              tabIndex={0}
              onClick={() => {
                changeEquipmentPositionHistory(
                  equipmentPositionHistory.equipmentId !== equipment.id
                    ? {
                        show: true,
                        equipmentId: equipment.id,
                        data: getEquipmentPositionHistory(equipment.id),
                      }
                    : {
                        show: false,
                        equipmentId: undefined,
                        data: undefined,
                      }
                );
              }}
            >
              {equipmentPositionHistory.equipmentId === equipment.id
                ? 'Fechar'
                : 'Ver'}{' '}
              histórico de posições
            </Button>
          </EquipmentAccordionContentStyled>

          <EquipmentAccordionFooterStyled>
            <EquipmentAccordionFooterItemStyled>
              <span>Produtividade:</span>

              <strong>
                {(
                  (equipmentProductivity[EquipmentState.OPERATING] / 24) *
                  100
                ).toFixed(2)}
                %
              </strong>
            </EquipmentAccordionFooterItemStyled>

            <EquipmentAccordionFooterItemStyled>
              <span>Receita:</span>

              <strong>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(equipmentGain)}
              </strong>
            </EquipmentAccordionFooterItemStyled>
          </EquipmentAccordionFooterStyled>
        </AccordionContent>
      </AccordionItem>
    </AccordionContainer>
  );
};
