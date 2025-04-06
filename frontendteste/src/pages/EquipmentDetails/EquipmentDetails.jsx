//react router
import { useParams, Link } from "react-router-dom";

//hook
import useEquipmentByName from "../../hooks/useEquipmentByName";

//reflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

// chart
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// styles
import styles from "./EquipmentDetails.module.css";
import "leaflet/dist/leaflet.css";

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

const EquipmentDetails = () => {
  const { id } = useParams();
  const equipment = useEquipmentByName(id);

  // Função que calcula o tempo total (em horas) que o equipamento passou em cada estado.
  const calcularTempoPorEstado = (stateHistory) => {
    if (!stateHistory || stateHistory.length === 0) return {};

    const sortedHistory = [...stateHistory].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const tempos = {};

    for (let i = 0; i < sortedHistory.length - 1; i++) {
      const estadoAtual = sortedHistory[i];
      const proximoEstado = sortedHistory[i + 1];

      const inicioAtual = new Date(estadoAtual.date);
      const inicioProximo = new Date(proximoEstado.date);

      const diferencaMs = inicioProximo - inicioAtual;
      const diferencaHoras = diferencaMs / (1000 * 60 * 60);

      if (!tempos[estadoAtual.stateName]) {
        tempos[estadoAtual.stateName] = 0;
      }

      tempos[estadoAtual.stateName] += diferencaHoras;
    }

    return tempos;
  };

  // Função que calcula a produtividade do equipamento.
  const calcularProdutividade = (temposPorEstado) => {
    const totalHoras = Object.values(temposPorEstado).reduce(
      (acc, horas) => acc + horas,
      0
    );

    const horasOperando = temposPorEstado["Operando"] || 0;

    if (totalHoras === 0) return 0;

    return (horasOperando / totalHoras) * 100;
  };

  // Função que calcula o valor total gerado pelo equipamento.
  const calcularValorTotal = (temposPorEstado) => {
    let valorTotal = 0;

    for (const estado in temposPorEstado) {
      const earningInfo = equipment.hourlyEarnings.find(
        (earning) => earning.stateName === estado
      );

      if (earningInfo) {
        valorTotal += temposPorEstado[estado] * earningInfo.value;
      }
    }

    return valorTotal;
  };

  // Função que retorna o ícone correspondente ao tipo de modelo do equipamento.
  const getEquipmentIcon = (modelName) => {
    const modelType = modelName?.toLowerCase();

    switch (modelType) {
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

  // Função que formata uma data para o padrão brasileiro.
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (equipment === undefined) {
    return (
      <div>
        <Link to="/">Retornar para página inicial</Link>
        <h2>Carregando detalhes do equipamento...</h2>
      </div>
    );
  }

  if (equipment === null) {
    return (
      <div>
        <Link to="/">Retornar para página inicial</Link>
        <h2>Equipamento não encontrado</h2>
      </div>
    );
  }

  const temposPorEstado = calcularTempoPorEstado(equipment.stateHistory);
  const produtividade = calcularProdutividade(temposPorEstado);
  const ganho = calcularValorTotal(temposPorEstado);

  const icon = getEquipmentIcon(equipment.modelName);

  const data = Object.entries(temposPorEstado).map(([stateName, hours]) => ({
    name: stateName,
    value: hours,
  }));

  const stateColors = {
    Operando: "#2ecc71",
    Parado: "#f1c40f",
    Manutenção: "#e74c3c",
  };

  const COLORS = data.map((item) => stateColors[item.name] || "#888888");

  return (
    <div className={styles.equipmentDetailsContainer}>
      <section className={styles.equipmentdetails}>
        <Link to="/" className={styles.returnLink}>
          ◄ Retornar para página inicial
        </Link>

        <h1>Detalhes do Equipamento</h1>

        <div className={styles.detailsContainer}>
          <div className={`${styles.mapContainer} ${styles.displaynone}`}>
            {equipment.positions?.length > 0 && (
              <MapContainer
                center={[
                  equipment.positions[0].lat,
                  equipment.positions[0].lon,
                ]}
                zoom={13}
                style={{ height: "450px", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                  position={[
                    equipment.positions[0].lat,
                    equipment.positions[0].lon,
                  ]}
                  icon={icon}
                >
                  <Popup>
                    <div>
                      <strong>Equipamento:</strong> {equipment.name}
                      <br />
                      <strong>Modelo:</strong> {equipment.modelName}
                      <br />
                      <strong>Estado Atual:</strong> {equipment.currentState}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
          <div className={styles.detailsText}>
            <h2>{equipment.name}</h2>

            <p>
              <span className={styles.title}>Modelo:</span>{" "}
              {equipment.modelName}
            </p>

            <p>
              <span className={styles.title}>Estado atual:</span>{" "}
              {equipment.currentState}
            </p>

            <p>
              <span className={styles.title}>Posição atual:</span>{" "}
              {equipment.positions[0].lat}, {equipment.positions[0].lon}
            </p>

            <p>
              <span className={styles.title}>Ganho do equipamento:</span>{" "}
              {ganho.toFixed(2)} R$
            </p>

            <p>
              <span className={styles.title}>Percentual de Produtividade:</span>{" "}
              {produtividade.toFixed(2)}%
            </p>
            <div className={styles.chart}>
              <PieChart width={295} height={250}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={40}
                  dataKey="value"
                  label={({ name }) => name}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}h`, name]} />
              </PieChart>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tableContainer}>
        <div>
          <h3 className={styles.tableTitle}>Histórico de posições</h3>
          {equipment.positions?.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.positions.map((position, index) => (
                    <tr key={index}>
                      <td>{formatDate(position.date)}</td>
                      <td>{position.lat}</td>
                      <td>{position.lon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Sem posições registradas.</p>
          )}
        </div>

        <div>
          <h3 className={styles.tableTitle}>Histórico de Estados</h3>
          {equipment.stateHistory?.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.stateHistory.map((state, index) => (
                    <tr key={index}>
                      <td>{formatDate(state.date)}</td>
                      <td
                        style={{ backgroundColor: state.color }}
                        className={styles.state}
                      >
                        {state.stateName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>Sem histórico de estados registrado.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default EquipmentDetails;
