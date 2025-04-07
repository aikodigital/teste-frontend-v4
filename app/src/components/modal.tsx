import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import EquipmentStateHistoryTable, { EquipmentStateLog } from './table';
import { IEquipmentState, IStates } from '@/zustand/interface';
import { ScrollArea } from './ui/scroll-area';
import ModalTabs from './tabs';
import { HistoryPositionMap } from './maps';

interface Props {
  isVisible: boolean;
  hide: () => void;
  equipmentName: string;
  states?: IStates[];
  stateDefinitions?: IEquipmentState[];
  equipmentId: string;
}

function normalizeStates(states?: IStates[], definitions?: IEquipmentState[]) {
  return states?.map((s, index) => {
    const def = definitions?.find(d => d.id === s.equipmentStateId);

    const data = s.date.slice(0, 10);
    const hora = s.date.slice(11, 16);

    return {
      id: `${index}`,
      data,
      hora,
      name: def?.name || 'Desconhecido',
      color: def?.color || '#ccc',
      originalDate: s.date
    };
  });
}

const Modal: React.FC<Props> = ({
  isVisible,
  hide,
  equipmentName,
  states,
  stateDefinitions,
  equipmentId
}) => {
  const data = React.useMemo(
    () => normalizeStates(states, stateDefinitions),
    [states, stateDefinitions]
  );

  return (
    <Dialog open={isVisible} onOpenChange={hide}>
      <DialogContent className="z-[9999] sm:max-w-[70vw] sm:w-[90%] max-h-[100vh] h-[90vh]">
        <DialogHeader>
          <DialogTitle>{equipmentName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh]">
          <ModalTabs
            firstChildren={
              <div className="rounded-md border">
                <EquipmentStateHistoryTable
                  data={data as EquipmentStateLog[]}
                />
              </div>
            }
            secondChildren={
              <div className="flex justify-center items-center">
                <HistoryPositionMap equipmentId={equipmentId} />
              </div>
            }
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
