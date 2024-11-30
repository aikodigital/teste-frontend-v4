import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface MapContextType {
  isDarkTheme: boolean;
  toggleTheme: (value: boolean) => void;
  mapUrl: string;
}

export const MapContext = createContext<MapContextType | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider = ({ children }: MapProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [mapUrl, setMapUrl] = useState(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
  );

  const toggleTheme = () => setIsDarkTheme((value) => !value);

  useEffect(() => {
    const mapUrl = isDarkTheme
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";

    setMapUrl(mapUrl);
  }, [isDarkTheme]);

  return (
    <MapContext.Provider value={{ isDarkTheme, toggleTheme, mapUrl }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextType => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
