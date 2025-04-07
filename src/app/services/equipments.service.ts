import equipmentsData from "../../../data/equipment.json";
import equipmentsModelData from "../../../data/equipmentModel.json";
import equipmentsPositionHistoryData from "../../../data/equipmentPositionHistory.json";
import equipmentsStateHistoryData from "../../../data/equipmentStateHistory.json";
import equipmentStateData from "../../../data/equipmentState.json";

import { Injectable } from '@angular/core';
import { Equipment } from '../models/Equipment';
import { EquipementModel } from '../models/EquipmentModel';
import { Position } from '../models/Position';
import { State } from '../models/State';
import { EquipmentState, EquipmentStateData, EquipmentStateStoryData } from "../models/EquipmentState";

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {
  private equipments: Equipment[] = [];
  constructor() {
    this.equipments = this.fetchEquipments();
   }

  private fetchEquipments():Equipment[] {
    const parsedEquipments = equipmentsData.map((equipment) => {
      const states = this.getEquipmentStates(equipment.id)
      return {
        ...equipment,
        model: this.getEquipmenModel(equipment.equipmentModelId),
        positions: this.getEquipmentPositions(equipment.id),
        states,
        mostRecentState: this.getMostRecentState(states) 
      }
    })
    
    return parsedEquipments;
  }

  getEquipments(): Equipment[] {
    return this.equipments;
  }

  getEquipment(equipmentId: string): Equipment {
    return this.equipments.find(equipment => equipment.id === equipmentId) as Equipment;
  }

  private getEquipmentPositions(equipmentId: string): Position[] {
    const equipmentPositionHistory = equipmentsPositionHistoryData.find(equipment => equipment.equipmentId === equipmentId);
    return equipmentPositionHistory?.positions as Position[]; ;
  }

  private getEquipmentStates(equipmentId: string): EquipmentState[] {
    const equipmentStateHistory = equipmentsStateHistoryData.find(equipment => equipment.equipmentId === equipmentId);
    const states = equipmentStateHistory?.states.map(state => this.completeStateData(state));

    return states as EquipmentState[];
  }

  private completeStateData(state: State): EquipmentState {
    const stateData = equipmentStateData.find(equipmentState => equipmentState.id === state.equipmentStateId) as EquipmentStateData;

    return {
      ...stateData,
      date: new Date(state.date)
    }
  }
  private getMostRecentState(states: EquipmentState[]): EquipmentState | null{
    if (states.length === 0) return null;

    return states.reduce((latest, current) => {
      const latestDate = new Date(latest.date);
      const currentDate = new Date(current.date);

      return currentDate > latestDate ? current : latest;
    });
  }
  private getEquipmenModel(equipmentModelId: string): EquipementModel {
    return equipmentsModelData.find(
      equipmentModel => equipmentModel.id === equipmentModelId
    ) as EquipementModel;
  }
}
