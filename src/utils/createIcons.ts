import L from 'leaflet';

const modelColors: Record<string, string> = {
    "a3540227-2f0e-4362-9517-92f41dabbfdf": '#e74c3c', // Caminhão de carga
    "a4b0c114-acd8-4151-9449-7d12ab9bf40f": '#3498db', // Harvester
    "9c3d009e-0d42-4a6e-9036-193e9bca3199": '#2ecc71'  // Garra traçadora
};

export const createIcon = (modelId: string) => {
    const color = modelColors[modelId] || '#7f8c8d'; // Default color if modelId not found
    return L.divIcon({
        html: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="${color}" d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.42-3.58-8-8-8zM12 11c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"/>
            </svg>
        `,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 24],
    });
};
