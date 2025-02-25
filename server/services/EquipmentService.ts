import type { IEquipmentService } from "@domain/IEquipmentService";
import type { Equipments } from "@dtos/Equipment";
import type { EquipmentsModel } from "@dtos/EquipmentModel";
import type { EquipmentsPositionHistory } from "@dtos/EquipmentPositionHistory";
import type { EquipmentsState } from "@dtos/EquipmentState";
import type { EquipmentsStateHistory, EquipmentStateHistory } from "@dtos/EquipmentStateHistory";
import { readJsonFile } from "../utils/readJsonFile";

export class EquipmentService implements IEquipmentService {
  async getEquipments(): Promise<Equipments> {
    try {
      const file = 'equipment'
      const equipmentsResponse: Equipments = readJsonFile(file)

      return equipmentsResponse
    } catch (error) {
      console.error('[ERROR] Get Equipments: ', error)
      throw new Error('Get Equipments')
    }
  }

  async getEquipmentsModel(): Promise<EquipmentsModel> {
    try {
      const file = 'equipmentModel'
      const equipmentsModelResponse: EquipmentsModel = readJsonFile(file)

      return equipmentsModelResponse
    } catch (error) {
      console.error('[ERROR] Get Equipments Model: ', error)
      throw new Error('Get Equipments Model')
    }
  }

  async getEquipmentsPositionHistory(): Promise<EquipmentsPositionHistory> {
    try {
      const file = 'equipmentPositionHistory'
      const equipmentsPositionHistoryResponse: EquipmentsPositionHistory = readJsonFile(file)

      return equipmentsPositionHistoryResponse
    } catch (error) {
      console.error('[ERROR] Get Equipments Position History: ', error)
      throw new Error('Get Equipments Position History')
    }
  }

  async getEquipmentsState(): Promise<EquipmentsState> {
    try {
      const file = 'equipmentState'
      const equipmentsStateResponse: EquipmentsState = readJsonFile(file)

      return equipmentsStateResponse
    } catch (error) {
      console.error('[ERROR] Get Equipments State: ', error)
      throw new Error('Get Equipments State')
    }
  }

  async getEquipmentsStateHistory(): Promise<EquipmentsStateHistory> {
    try {
      const file = 'equipmentStateHistory'
      const equipmentsStateHistoryResponse: EquipmentsStateHistory = readJsonFile(file)

      return equipmentsStateHistoryResponse
    } catch (error) {
      console.error('[ERROR] Get Equipments State History: ', error)
      throw new Error('Get Equipments State History')
    }
  }

  async getEquipmentsStateHistoryById(id: string): Promise<EquipmentStateHistory> {
    try {
      const file = 'equipmentStateHistory'
      const equipmentsStateHistoryResponse: EquipmentsStateHistory = readJsonFile(file)

      const equipmentSelected = equipmentsStateHistoryResponse.find(eqp => eqp.equipmentId === id)

      if (!equipmentSelected) {
        throw new Error('Get Equipment State History By Id')
      }

      return equipmentSelected
    } catch (error) {
      console.error('[ERROR] Get Equipment State History By Id: ', error)
      throw new Error('Get Equipment State History By Id')
    }
  }
}