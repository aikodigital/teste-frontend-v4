import { IPosition } from './../../interfaces/iPosition';
import { Injectable } from '@angular/core';

import { equipmentList } from '../../../../assets/data/equipment';
import { equipmentState } from '../../../../assets/data/equipmentState';
import { equipmentModel } from '../../../../assets/data/equipmentModel';
import { equipmentStateHistory } from '../../../../assets/data/equipmentStateHistory';
import { IEquipmentStateHistory } from '../../interfaces/iEquipmentStateHistory';
import { IEquipmentModel } from '../../interfaces/iEquipmentModel';
import { IEquipmentState } from '../../interfaces/iEquipmentState';
import { IEquipment } from '../../interfaces/iEquipment';
import { equipmentPositionHistory } from '../../../../assets/data/equipmentPositionHistory';
import { IEquipemntPositionHistory } from '../../interfaces/iEquipmentPositionHistory';
import { BehaviorSubject } from 'rxjs';
import { ICustomEquipment } from '../../interfaces/iCustomEquipment';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService {
  positions = new BehaviorSubject<ICustomEquipment[]>([]);

  equipmentStateHistory = new BehaviorSubject<{
    stateHistory: IEquipmentState[];
    equipmentInfo: ICustomEquipment | undefined;
  }>({
    stateHistory: [],
    equipmentInfo: undefined,
  });

  getEquipments(): IEquipment[] {
    return equipmentList;
  }

  getEquipment(id: string): IEquipment | undefined {
    return equipmentList.find((equipment) => equipment.id === id);
  }

  getEquipmentState(id: string): IEquipmentState | undefined {
    return equipmentState.find((equipmentState) => equipmentState.id === id);
  }

  getEquipmentModel(id: string): IEquipmentModel | undefined {
    return equipmentModel.find((equipment) => equipment.id === id);
  }

  getEquipmentStateHistory(id: string): IEquipmentStateHistory | undefined {
    return equipmentStateHistory.find(
      (equipmentState) => equipmentState.equipmentId === id
    );
  }

  getEquipmentPositionHistory(
    id: string
  ): IEquipemntPositionHistory | undefined {
    return equipmentPositionHistory.find(
      (equipmentState) => equipmentState.equipmentId === id
    );
  }

  getEquipmentLatestPosition(id: string): IPosition | undefined {
    if (
      !equipmentPositionHistory.find(
        (equipmentState) => equipmentState.equipmentId === id
      )
    ) {
      return undefined;
    }

    return equipmentPositionHistory
      .find((equipmentState) => equipmentState.equipmentId === id)
      ?.positions.slice(-1)[0];
  }
}
