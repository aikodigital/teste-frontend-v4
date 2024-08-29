import React from 'react';
import { Divider, Drawer, Text, Timeline } from '@mantine/core';
import {
  StateHistory,
  EquipmentState,
  EquipmentModel,
} from '../types/interface';

interface EquipmentDrawerProps {
  opened: boolean;
  onClose: () => void;
  equipmentHistory: StateHistory[];
  equipmentName: string;
  equipmentModel: EquipmentModel;
  states: Record<string, EquipmentState>;
}

const DrawerComponent: React.FC<EquipmentDrawerProps> = ({
  opened,
  onClose,
  equipmentHistory,
  equipmentName,
  equipmentModel,
  states,
}) => {
  return (
    <Drawer
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      opened={opened}
      onClose={onClose}
      title="Histórico de Equipamento"
      padding="xl"
      size="md"
      style={{ position: 'fixed', zIndex: 1300 }}
      position="right"
    >
      <Text size="lg">
        <strong>{`${equipmentName} - ${equipmentModel?.name}`}</strong>
      </Text>
      <Divider />
      <br />
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
