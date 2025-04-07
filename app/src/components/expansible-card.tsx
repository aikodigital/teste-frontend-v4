import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { IEquipment } from '@/zustand/interface';
import { useStore } from 'zustand';
import useEquipmentStore from '@/zustand';
import { FaTruck } from 'react-icons/fa';
import { TbFiretruck } from 'react-icons/tb';
import { GiTowTruck } from 'react-icons/gi';
import { includes } from 'lodash';
import { Button } from './ui/button';
import useIsVisible from '@/hooks/useIsVisible';
import Modal from './modal';
import { useCallback } from 'react';
import { useEquipmentProductivity } from '@/hooks/useEquipmentProductivity';
import { useEquipmentEarnings } from '@/hooks/useEquipmentEarnings';
interface CardProps {
  className?: string;
  equipment: IEquipment;
  setActiveId: (value: string) => void;
  activeId: string;
}

const MODELS = {
  CA: <FaTruck />,
  HV: <TbFiretruck />,
  GT: <GiTowTruck />
};

const ExpansibleCard: React.FC<CardProps> = ({
  className,
  equipment,
  setActiveId,
  activeId,
  ...props
}) => {
  const { show, isVisible, hide } = useIsVisible();
  const { equipmentModel, equipmentStateHistory, equipmentState } =
    useStore(useEquipmentStore);
  const modelInformation = equipmentModel.find(
    model => model.id === equipment.equipmentModelId
  );
  const getIcon = Object.keys(MODELS).find(key =>
    includes(equipment.name, key)
  );
  const stateHistoryInformation = equipmentStateHistory.find(
    state => state.equipmentId === equipment.id
  );

  const click = useCallback(
    () =>
      activeId === equipment.id ? setActiveId('') : setActiveId(equipment.id),
    [activeId, equipment.id, setActiveId]
  );
  const productivity = useEquipmentProductivity({
    equipmentStateHistory: stateHistoryInformation,
    states: equipmentState
  });
  const gain = useEquipmentEarnings({
    equipmentStateHistory: stateHistoryInformation,
    equipmentModel: modelInformation
  });
  return (
    <AccordionItem value={equipment.id}>
      <AccordionTrigger
        className="px-4 cursor-pointer hover:no-underline hover:bg-muted"
        onClick={click}
      >
        <div className="flex items-center gap-2">
          {MODELS[getIcon as keyof typeof MODELS]}
          {equipment.name}
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Card className={cn('w-full', className)} {...props}>
          <CardHeader className="flex flex-col gap-4">
            <div className="flex gap-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <CardTitle>{modelInformation?.name}</CardTitle>
            </div>
            <div className="flex gap-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <CardTitle>Produtividade: {productivity.toFixed(2)}% </CardTitle>
            </div>
            <div className="flex gap-4">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <CardTitle>Rendimento: R$ {gain.toFixed(2)}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <Button onClick={() => show()}>
                <p className="text-black">Mais Informações</p>
              </Button>
              <Modal
                isVisible={isVisible}
                hide={hide}
                stateDefinitions={equipmentState}
                equipmentName={`${equipment.name} - ${modelInformation?.name}`}
                states={stateHistoryInformation?.states}
                equipmentId={equipment.id}
              />
            </div>
          </CardContent>
        </Card>
      </AccordionContent>
    </AccordionItem>
  );
};
export default ExpansibleCard;
