import MapComponent from "./components/map";

export default function Page() {
  const position = {
    lat: -19.264235,
    lon: -46.092436,
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-10 font-semibold">
        Histórico de Posições do Equipamento
      </h3>
      <MapComponent lat={position.lat} lon={position.lon} />
    </div>
  );
}
