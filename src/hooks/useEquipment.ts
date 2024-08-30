export const useEquipment = async () => {
  try {
    const equipment = await fetch('data/equipment.json');
    if (!equipment.ok) {
      throw new Error('Network response was not ok');
    }

    const data = equipment.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useEquipmentModel = async () => {
  try {
    const equipment = await fetch('data/equipmentModel.json');
    if (!equipment.ok) {
      throw new Error('Network response was not ok');
    }

    const data = equipment.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useEquipmentPositionHistory = async () => {
  try {
    const equipment = await fetch('data/equipmentPositionHistory.json');
    if (!equipment.ok) {
      throw new Error('Network response was not ok');
    }

    const data = equipment.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useEquipmentState = async () => {
  try {
    const equipment = await fetch('data/equipmentState.json');
    if (!equipment.ok) {
      throw new Error('Network response was not ok');
    }

    const data = equipment.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useEquipmentStateHistory = async () => {
  try {
    const equipment = await fetch('data/equipmentStateHistory.json');
    if (!equipment.ok) {
      throw new Error('Network response was not ok');
    }

    const data = equipment.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
