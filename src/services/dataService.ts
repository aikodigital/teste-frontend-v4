export function getEquipments() {
  return fetch('/data/equipment.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error)
    });
}

export function getEquipmentModels() {
  return fetch('/data/equipmentModel.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error)
    });
}

export function getEquipmentPositionHistory() {
  return fetch('/data/equipmentPositionHistory.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error)
    });
}

export function getEquipmentState() {
  return fetch('/data/equipmentState.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error)
    });
}

export function getEquipmentStateHistory() {
  return fetch('/data/equipmentStateHistory.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error)
    });
}