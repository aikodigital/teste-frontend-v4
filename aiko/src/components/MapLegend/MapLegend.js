import "./MapLegend.css";

function MapLegend() {
  return (
    <div className="map-legend">
      <div className="legend-item">
        <span className="dot operating" />
        <span>Operando</span>
      </div>

      <div className="legend-item">
        <span className="dot stopped" />
        <span>Parado</span>
      </div>

      <div className="legend-item">
        <span className="dot maintenance" />
        <span>Manutenção</span>
      </div>
    </div>
  );
}

export default MapLegend;
