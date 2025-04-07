import { useMap } from 'react-leaflet';
import { useEffect, FC } from 'react';

// Componente utilitário para resolver problemas de renderização do mapa
// quando o contêiner muda de tamanho ou é inicialmente carregado
const MapAdjuster: FC = () => {
  const map = useMap();
  
  useEffect(() => {
    // Força o recálculo das dimensões do mapa para evitar problemas de exibição
    // quando o contêiner muda de tamanho (ex: sidebar abrindo/fechando)
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);
    handleResize(); // Execute once on mount
    
    return () => window.removeEventListener('resize', handleResize);
  }, [map]);
  
  // Componente não renderiza nada visualmente, apenas ajusta o mapa
  return null;
};

export default MapAdjuster;