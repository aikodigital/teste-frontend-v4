import L from "leaflet";

export const liveIcon = (status: string, name: string, iconStatus: boolean) => {  
  const icons = {
    garra: "https://media.discordapp.net/attachments/616035988518600704/1285720538840567910/6826195.png?ex=66eb4c0f&is=66e9fa8f&hm=9c4ab564bf38640c09232ac2a9bf48d1d8ef7cfc631f41dc35105baa5a6cb1a6&=&format=webp&quality=lossless",
    harvester: "https://media.discordapp.net/attachments/616035988518600704/1285720538580516934/Pngtree_farming_harvester_vehicle_vector_thin_5139838-removebg-preview.png?ex=66eb4c0f&is=66e9fa8f&hm=e684db6d5a8ee6e52f3e06884f6b36a0a1003c5192508d4e1e35fb638b6d6240&=&format=webp&quality=lossless",
    truck: "https://cdn.discordapp.com/attachments/616035988518600704/1285715443939545179/Pngtreevector_truck_icon_3985601.png?ex=66eb4751&is=66e9f5d1&hm=6e1b04045d953d8d6083a846b6b739705cc4ad91c448273d77f7ab3f70d1bd10&",
    leafRed: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
    leafOrange: "https://leafletjs.com/examples/custom-icons/leaf-orange.png",
    leafGreen: "https://leafletjs.com/examples/custom-icons/leaf-green.png"
  };

  const getIcon = (iconUrl: string) => {
    return L.icon({
      iconUrl,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  if (iconStatus) {
    switch (name) {
      case 'Caminhão de carga':
        return getIcon(icons.truck);
      case 'Garra traçadora':
        return getIcon(icons.garra);
      case 'Harvester':
        return getIcon(icons.harvester);
    }
  }

  switch (status) {
    case 'Parado':
      return getIcon(icons.leafRed);
    case 'Manutenção':
      return getIcon(icons.leafOrange);
    case 'Operando':
      return getIcon(icons.leafGreen);
    default:
      return getIcon(icons.leafRed); 
  }
};

