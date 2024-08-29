import MapComponent from "./components/map";


export default function Page() {
  const positions = [
    {
      lat: -19.264235,
      lng: -46.092436,
      date: Date.now().toString()
    },
    {
      lat: -15.264235,
      lng: -46.092436,
      date: Date.now().toString()
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium mb-10 font-semibold">
        Histórico de Posições do Equipamento
      </h3>
      <MapComponent positions={positions} />
    </div>
  );
}
