import * as equipmentsJSON from '@/assets/data/equipment.json';
import * as equipmentModel from '@/assets/data/equipmentModel.json';
import * as equipmentPositionHistory from '@/assets/data/equipmentPositionHistory.json';
import * as equipmentState from '@/assets/data/equipmentState.json';
import * as equipmentStateHistory from '@/assets/data/equipmentStateHistory.json';
import { defineStore } from 'pinia';
import type {
  IEquipmentNormalized,
  IStates,
} from '~/interfaces/equipments.interface';

export const useNormalizedData = defineStore('normalized-data', {
  state: (): {
    equipments: IEquipmentNormalized[];
    states: IStates[];
    equipmentsFiltered: IEquipmentNormalized[];
    stateSelected: IStates | null;
    equipmentsSelectedNoState: IEquipmentNormalized[];
  } => ({
    equipments: [],
    states: [],
    equipmentsFiltered: [],
    stateSelected: null,
    equipmentsSelectedNoState: [],
  }),
  getters: {
    getEquipments: (state) => state.equipments,
    getStates: (state) => state.states,
  },
  actions: {
    init() {
      this.$patch({
        states: equipmentState.default,
      });
      this.normalize();
      this.$patch({
        equipmentsFiltered: this.equipments,
      });
    },

    normalize() {
      function generateDistinctColor(existingColors: string[]): string {
        let newColor: string;
        const colorDifferenceThreshold = 100;

        function getRandomHex(): number {
          return Math.floor(Math.random() * 256);
        }

        function rgbToHex(r: number, g: number, b: number): string {
          return (
            '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
          );
        }

        function colorDifference(color1: string, color2: string): number {
          const rDiff = Math.abs(
            parseInt(color1.slice(1, 3), 16) - parseInt(color2.slice(1, 3), 16),
          );
          const gDiff = Math.abs(
            parseInt(color1.slice(3, 5), 16) - parseInt(color2.slice(3, 5), 16),
          );
          const bDiff = Math.abs(
            parseInt(color1.slice(5, 7), 16) - parseInt(color2.slice(5, 7), 16),
          );
          return rDiff + gDiff + bDiff;
        }

        do {
          const r = getRandomHex();
          const g = getRandomHex();
          const b = getRandomHex();
          newColor = rgbToHex(r, g, b);
        } while (
          existingColors.some(
            (color) =>
              colorDifference(color, newColor) < colorDifferenceThreshold,
          )
        );

        return newColor;
      }

      const existingColors: string[] = [];

      const equipmentsNormalized: IEquipmentNormalized[] =
        equipmentsJSON.default.map((equipment) => {
          const color = generateDistinctColor(existingColors);
          existingColors.push(color);

          const equipmentModelById = equipmentModel.default.filter(
            (equipmentModelItem) =>
              equipmentModelItem.id === equipment.equipmentModelId,
          )[0];

          const equipmentPositionHistoryById =
            equipmentPositionHistory.default.filter(
              (equipmentPositionHistoryItem) =>
                equipmentPositionHistoryItem.equipmentId === equipment.id,
            )[0];

          const equipmentStateHistoryById = equipmentStateHistory.default
            .filter(
              (equipmentStateHistoryItem) =>
                equipmentStateHistoryItem.equipmentId === equipment.id,
            )
            .map((item) => ({
              ...item,
              states: item.states
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                ),
            }))[0];

          const mostRecentlyState = equipmentStateHistoryById.states.reduce(
            (latest, current) => {
              const currentDate = new Date(current.date);
              const latestDate = new Date(latest.date);
              const stateProv = currentDate > latestDate ? current : latest;
              return {
                ...stateProv,
                stateReference: this.states.find(
                  (state) => state.id === stateProv.equipmentStateId,
                ),
              };
            },
          );

          const mostRecentlyPosition =
            equipmentPositionHistoryById.positions.reduce((latest, current) => {
              const currentDate = new Date(current.date);
              const latestDate = new Date(latest.date);
              return currentDate > latestDate ? current : latest;
            });

          return {
            ...equipment,
            color,
            model: equipmentModelById,
            mostRecentlyPosition,
            mostRecentlyState,
            positionHistory: equipmentPositionHistoryById,
            stateHistory: equipmentStateHistoryById,
          };
        });

      this.$patch({
        equipments: equipmentsNormalized,
      });
    },

    patchFilteredEquipments(newEquipments?: IEquipmentNormalized[]) {
      this.$patch({
        equipmentsFiltered: newEquipments?.length
          ? this.withState(newEquipments)
          : this.withState(this.equipments),
      });
    },

    withState(equipments: IEquipmentNormalized[]) {
      if (this.stateSelected) {
        this.$patch({
          equipmentsSelectedNoState: equipments,
        });
        return equipments.filter(
          (equipment) =>
            equipment.mostRecentlyState.equipmentStateId ===
            this.stateSelected?.id,
        );
      }
      return equipments;
    },

    patchFilteredStates(data: IStates | null) {
      this.$patch({
        stateSelected: data,
      });
      data
        ? this.patchFilteredEquipments(this.equipmentsFiltered)
        : this.patchFilteredEquipments(this.equipmentsSelectedNoState);
    },
  },
});
