import { useState } from "react";
import useEquipments from "../../hooks/useEquipments";

import styles from "./Dashboard.module.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import { Link } from "react-router-dom";

const modelIcons = {
  "caminhão de carga": "/icons/big-cargo-truck.png",
  harvester: "/icons/circular-saw.png",
  "garra traçadora": "/icons/claw.png",
  padrão: "/icons/big-cargo-truck.png",
};

const truckIcon = new Icon({
  iconUrl: "/icons/big-cargo-truck.png",
  iconSize: [38, 38],
});

const harvesterIcon = new Icon({
  iconUrl: "/icons/circular-saw.png",
  iconSize: [38, 38],
});

const clawIcon = new Icon({
  iconUrl: "/icons/claw.png",
  iconSize: [38, 38],
});

const Dashboard = () => {
  // Importação dos equipamentos
  const equipments = useEquipments();

  // Estados para modelos, estados e visibilidade dos filtros
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Atualiza os modelos selecionados ao clicar
  const handleModelChange = (e) => {
    const { value } = e.target;
    setSelectedModels((prev) =>
      prev.includes(value)
        ? prev.filter((model) => model !== value)
        : [...prev, value]
    );
  };

  // Atualiza os estados selecionados ao clicar
  const handleStateChange = (e) => {
    const { value } = e.target;
    setSelectedStates((prev) =>
      prev.includes(value)
        ? prev.filter((state) => state !== value)
        : [...prev, value]
    );
  };

  // Alterna a exibição dos filtros
  const toggleFilters = () => setShowFilters((prev) => !prev);

  // Filtra os equipamentos com base nos modelos e estados selecionados
  const filteredEquipments = equipments.filter(
    ({ modelName, currentState }) => {
      const model = modelName?.toLowerCase();
      const state = currentState?.toLowerCase();
      const modelMatch =
        !selectedModels.length || selectedModels.includes(model);
      const stateMatch =
        !selectedStates.length || selectedStates.includes(state);
      return modelMatch && stateMatch;
    }
  );

  // Mapeia os equipamentos filtrados em marcadores para o mapa
  const markers = filteredEquipments
    .filter((equip) => equip.positions.length)
    .map((equip) => {
      const modelType = equip.modelName?.toLowerCase();

      const getModelIcon = (type) => {
        switch (type) {
          case "caminhão de carga":
            return truckIcon;
          case "harvester":
            return harvesterIcon;
          case "garra traçadora":
            return clawIcon;
          default:
            return truckIcon;
        }
      };

      const PopupContent = () => (
        <div>
          <strong>Equipamento:</strong> {equip.name}
          <p>Modelo: {equip.modelName}</p>
          <p>Estado: {equip.currentState}</p>
          <Link to={`/equipments/${equip.name}`} className={styles.infoLink}>
            Mais informações
          </Link>
        </div>
      );

      return {
        geocode: [equip.positions[0].lat, equip.positions[0].lon],
        popUp: <PopupContent />,
        icon: getModelIcon(modelType),
      };
    });

  // Lista de modelos únicos disponíveis nos equipamentos
  const uniqueModels = [
    ...new Set(equipments.map((equip) => equip.modelName?.toLowerCase())),
  ].filter(Boolean);

  // Lista de estados únicos disponíveis nos equipamentos
  const uniqueStates = [
    ...new Set(equipments.map((equip) => equip.currentState?.toLowerCase())),
  ].filter(Boolean);
  return (
    <main className={styles.dashboardContainer}>
      <section>
        <h1>Lista de Equipamentos</h1>
        <div className={styles.tablefilterCOntainer}>
          <div>
            <h2 onClick={toggleFilters} className={styles.filtersToggle}>
              Filtros {showFilters ? "▲" : "▼"}
            </h2>
            {showFilters && (
              <div className={styles.filters}>
                <div>
                  <h3>Modelo</h3>
                  {uniqueModels.map((model) => (
                    <label key={model}>
                      <input
                        type="checkbox"
                        value={model}
                        checked={selectedModels.includes(model)}
                        onChange={handleModelChange}
                      />
                      {model}
                    </label>
                  ))}
                </div>

                <div>
                  <h3>Estado Atual</h3>
                  {uniqueStates.map((state) => (
                    <label key={state}>
                      <input
                        type="checkbox"
                        value={state}
                        checked={selectedStates.includes(state)}
                        onChange={handleStateChange}
                      />
                      {state}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.displaynone}>Ícone</th>
                  <th>Nome</th>
                  <th>Modelo</th>
                  <th>Estado atual</th>
                  <th>
                    <span className={styles.displaynone}>Mais </span>Informações
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipments.map((equip) => {
                  const latestPosition =
                    equip.positions.length > 0 ? equip.positions[0] : null;

                  const modelType = equip.modelName?.toLowerCase();
                  const iconSrc = modelIcons[modelType] || modelIcons["padrão"];

                  return (
                    <tr key={equip.id}>
                      <td
                        className={`${styles.equipmentIcon} ${styles.displaynone}`}
                      >
                        <img src={iconSrc} alt="Ícone" />
                      </td>
                      <td>{equip.name}</td>
                      <td>{equip.modelName}</td>
                      <td
                        style={{ backgroundColor: equip.currentStateColor }}
                        className={styles.state}
                      >
                        {equip.currentState}
                      </td>
                      <td>
                        <Link
                          to={`/equipments/${equip.name}`}
                          className={styles.infoLink}
                        >
                          <span className={styles.displaynone}>Mais </span>
                          informações
                          <span className={styles.displaynone}> ►</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className={styles.mapWrapper}>
          <MapContainer
            center={[-19.1336, -46.0241]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
            className={styles.mapContainer}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, idx) => (
              <Marker key={idx} position={marker.geocode} icon={marker.icon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
