export const getModelIcon = modelId => {
  switch (modelId) {
    // Caminhão de carga
    case process.env.REACT_APP_MODEL_TRUCK_ID:
      return "local_shipping";

    // Harvester
    case process.env.REACT_APP_MODEL_HARVESTER_ID:
      return "agriculture";

    // Garra traçadora
    case process.env.REACT_APP_MODEL_CLAW_ID:
      return "precision_manufacturing";

    default:
      return null;
  }
};

export const getLastArrayEntry = array => {
  const last = array.slice(-1)[0];
  return last;
};

export const getTimeInHours = milisseconds => {
  let totalSeconds = milisseconds / 1000;
  let hours = Math.floor(totalSeconds / 3600);

  return hours;
};

export const removeSpecialCharacters = str => {
  return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
};

export const compareStrings = (str1, str2) => {
  return (
    removeSpecialCharacters(str1).toLowerCase().trim() ===
    removeSpecialCharacters(str2).toLowerCase().trim()
  );
};
