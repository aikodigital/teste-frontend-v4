import React from 'react';
import { Drawer, Timeline } from '@mantine/core';
import { StateHistory, EquipmentState } from '../types/interface';

interface EquipmentDrawerProps {
  opened: boolean;
  onClose: () => void;
  equipmentHistory: StateHistory[];
  states: Record<string, EquipmentState>;
}

const DrawerComponent: React.FC<EquipmentDrawerProps> = ({
  opened,
  onClose,
  equipmentHistory,
  states,
}) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Histórico de Equipamento"
      padding="xl"
      size="lg"
      style={{ position: 'fixed', zIndex: 1300 }}
      position="right"
    >
      <Timeline>
        {equipmentHistory.map((state, index) => {
          const stateColor = states[state.equipmentStateId]?.color || '#000';
          return (
            <Timeline.Item
              key={index}
              title={new Date(state.date).toLocaleString()}
              bullet={
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: stateColor as string,
                  }}
                />
              }
            >
              {states[state.equipmentStateId]?.name || 'Desconhecido'}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Drawer>
  );
};

export default DrawerComponent;
