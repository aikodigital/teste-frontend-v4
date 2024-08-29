import { TestBed } from '@angular/core/testing';
import { EquipmentService } from './equipment.service';

import { equipmentList } from '../../../../assets/data/equipment';
import { equipmentState } from '../../../../assets/data/equipmentState';
import { equipmentModel } from '../../../../assets/data/equipmentModel';
import { equipmentStateHistory } from '../../../../assets/data/equipmentStateHistory';
import { equipmentPositionHistory } from '../../../../assets/data/equipmentPositionHistory';
import { IEquipment } from '../../interfaces/iEquipment';

describe('EquipmentService', () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the list of equipments', () => {
    const result: IEquipment[] = service.getEquipments();
    expect(result).toEqual(equipmentList);
  });

  it('should return a specific equipment by id', () => {
    const id = 'a7c53eb1-4f5e-4eba-9764-ad205d0891f9';
    const expectedEquipment = equipmentList.find(
      (equipment) => equipment.id === id
    );
    const result = service.getEquipment(id);
    expect(result).toEqual(expectedEquipment);
  });

  it('should return undefined if the equipment id does not exist', () => {
    const id = 'non-existent-id';
    const result = service.getEquipment(id);
    expect(result).toBeUndefined();
  });

  it('should return the equipment state by id', () => {
    const id = '0808344c-454b-4c36-89e8-d7687e692d57';
    const expectedState = equipmentState.find((state) => state.id === id);
    const result = service.getEquipmentState(id);
    expect(result).toEqual(expectedState);
  });

  it('should return undefined if the equipment state id does not exist', () => {
    const id = 'non-existent-state-id';
    const result = service.getEquipmentState(id);
    expect(result).toBeUndefined();
  });

  it('should return the equipment model by id', () => {
    const id = 'a3540227-2f0e-4362-9517-92f41dabbfdf';
    const expectedModel = equipmentModel.find((model) => model.id === id);
    const result = service.getEquipmentModel(id);
    expect(result).toEqual(expectedModel);
  });

  it('should return undefined if the equipment model id does not exist', () => {
    const id = 'non-existent-model-id';
    const result = service.getEquipmentModel(id);
    expect(result).toBeUndefined();
  });

  it('should return the equipment state history by equipment id', () => {
    const id = '1d222cdc-01dd-4caa-8934-5351d3995cfb';
    const expectedHistory = equipmentStateHistory.find(
      (history) => history.equipmentId === id
    );
    const result = service.getEquipmentStateHistory(id);
    expect(result).toEqual(expectedHistory);
  });

  it('should return undefined if the equipment state history id does not exist', () => {
    const id = 'non-existent-equipment-id';
    const result = service.getEquipmentStateHistory(id);
    expect(result).toBeUndefined();
  });

  it('should return the equipment position history by equipment id', () => {
    const id = '1d222cdc-01dd-4caa-8934-5351d3995cfb';
    const expectedPositionHistory = equipmentPositionHistory.find(
      (positionHistory) => positionHistory.equipmentId === id
    );
    const result = service.getEquipmentPositionHistory(id);
    expect(result).toEqual(expectedPositionHistory);
  });

  it('should return undefined if the equipment position history id does not exist', () => {
    const id = 'non-existent-equipment-id';
    const result = service.getEquipmentPositionHistory(id);
    expect(result).toBeUndefined();
  });
});
