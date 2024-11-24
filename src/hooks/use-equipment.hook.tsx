export async function fetchEquipment() {
  const response = await fetch("/data/equipment.json");
  const data = await response.json();
  return data;
}

export async function fetchEquipmentState() {
  const response = await fetch("/data/equipment-state.json");
  const data = await response.json();
  return data;
}

export async function fetchEquipmentStateHistory() {
  const response = await fetch("/data/equipment-state-history.json");
  const data = await response.json();
  return data;
}

export async function fetchEquipmentPositionHistory() {
  const response = await fetch("/data/equipment-position-history.json");
  const data = await response.json();
  return data;
}

export async function fetchEquipmentModel() {
  const response = await fetch("/data/equipment-model.json");
  const data = await response.json();
  return data;
}
