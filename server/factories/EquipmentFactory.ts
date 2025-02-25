import { EquipmentService } from "../services/EquipmentService";

export class EquipmentFactory {
  static createService() {
    return new EquipmentService()
  }
}