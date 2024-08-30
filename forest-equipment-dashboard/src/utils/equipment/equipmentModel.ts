import { IEquipmentsModel } from '../../../@types/equipment';
import equipmentModelJson from '../../../data/equipmentModel.json';

const equipmentModel = equipmentModelJson as IEquipmentsModel[];

function getModelById(equipmentModelId: string) {
  return equipmentModel.find((model) => model.id === equipmentModelId);
}

function getModels() {
  return equipmentModel.map((model) => model.name);
}

export { getModelById, getModels };
