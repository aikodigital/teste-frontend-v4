import { useEffect, useRef, useState } from "react";
import * as S from "./style";

import {
  getModelIcon,
  getLastArrayEntry,
  getTimeInHours,
} from "../../helpers/functions";

const DetailsSection = ({
  modelMap,
  statusMap,
  selectedEquip,
  selectedEquipHandler,
  renderType,
  renderTypeHandler,
}) => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [modelData, setModelData] = useState();
  const [latestStatusData, setLatestStatusData] = useState();
  const [detailsSelected, setDetailsSelected] = useState(-1);
  const [statusTimes, setStatusTimes] = useState();

  const popupRef = useRef();

  const setEquipmentData = equipmentEntry => {
    let latestStatusEntry = getLastArrayEntry(equipmentEntry.statusHistory);

    setIcon(getModelIcon(equipmentEntry.modelId));
    setName(equipmentEntry.name);
    setModelData(modelMap.get(equipmentEntry.modelId));
    setLatestStatusData(statusMap.get(latestStatusEntry.equipmentStateId));
    setStatusTimes(getTimeSpentInEachState(equipmentEntry.statusHistory));
  };

  const resetEquipmentData = () => {
    renderTypeHandler(0);
    deselectAllDetailsTabs();
    setIcon("");
    setName("");
    setModelData();
    setLatestStatusData();
    setDetailsSelected(-1);
    setStatusTimes();
  };

  const getTimeSpentInEachState = statusHistoryArray => {
    const times = { operational: 0, maintenance: 0, idle: 0 };

    for (let i = 0; i < statusHistoryArray.length - 2; i++) {
      let startTime = new Date(statusHistoryArray[i].date);
      let endTime = new Date(statusHistoryArray[i + 1].date);
      let elapsedTime = endTime - startTime;

      switch (statusHistoryArray[i].equipmentStateId) {
        case process.env.REACT_APP_STATUS_OPERATIONAL_ID:
          times.operational += elapsedTime;
          break;

        case process.env.REACT_APP_STATUS_MAINTENANCE_ID:
          times.maintenance += elapsedTime;
          break;

        case process.env.REACT_APP_STATUS_IDLE_ID:
          times.idle += elapsedTime;
          break;

        default:
          break;
      }
    }

    return times;
  };

  const getTotalEarnings = () => {
    let operationEarnings =
      getTimeInHours(statusTimes.operational) *
      modelData.earnings.get(process.env.REACT_APP_STATUS_OPERATIONAL_ID);

    let maintenanceEarnings =
      getTimeInHours(statusTimes.maintenance) *
      modelData.earnings.get(process.env.REACT_APP_STATUS_MAINTENANCE_ID);

    let idleEarnings =
      getTimeInHours(statusTimes.idle) *
      modelData.earnings.get(process.env.REACT_APP_STATUS_IDLE_ID);

    let total = operationEarnings + maintenanceEarnings + idleEarnings;
    return total.toFixed(2);
  };

  const renderStatusHistoryDetails = () => {
    return (
      <div className="data-section">
        {selectedEquip &&
          selectedEquip.statusHistory.map((status, i) => {
            let statusData = statusMap.get(status.equipmentStateId);
            return (
              <p key={i}>
                <span>
                  {new Date(status.date).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Brazil/East",
                  })}
                </span>
                <span>{statusData.name}</span>
              </p>
            );
          })}
      </div>
    );
  };

  const renderProductivityDetails = () => {
    const totalTime =
      statusTimes.operational + statusTimes.idle + statusTimes.maintenance;

    const operationalPercent = Math.round(
      (statusTimes.operational * 100) / totalTime
    );
    const idlePercent = Math.round((statusTimes.idle * 100) / totalTime);
    const maintenancePercent = Math.round(
      (statusTimes.maintenance * 100) / totalTime
    );

    return (
      <>
        <div className="graph">
          <div
            style={{
              background: statusMap.get(
                process.env.REACT_APP_STATUS_OPERATIONAL_ID
              ).color,
              width: `${operationalPercent}%`,
              borderRadius: "5px 0 0 5px",
            }}
          ></div>

          <div
            style={{
              background: statusMap.get(process.env.REACT_APP_STATUS_IDLE_ID)
                .color,
              width: `${idlePercent}%`,
            }}
          ></div>

          <div
            style={{
              background: statusMap.get(
                process.env.REACT_APP_STATUS_MAINTENANCE_ID
              ).color,
              width: `${maintenancePercent}%`,
              borderRadius: "0 5px 5px 0",
            }}
          ></div>
        </div>

        <div className="data-section">
          <p>
            <span>Produtividade do equipamento:</span>
            <span>{operationalPercent}%</span>
          </p>

          <p>
            <span>Percentual de inatividade:</span>
            <span>{idlePercent}%</span>
          </p>

          <p>
            <span>Percentual de manutenção:</span>
            <span>{maintenancePercent}%</span>
          </p>
        </div>
      </>
    );
  };

  const renderEarningsDetails = () => {
    return (
      <div className="data-section">
        <p>
          <span>Total de horas em operação:</span>
          <span>{getTimeInHours(statusTimes.operational)} h</span>
        </p>

        <p>
          <span>Total de horas paradas:</span>
          <span>{getTimeInHours(statusTimes.idle)} h</span>
        </p>

        <p>
          <span>Total de horas em manutenção:</span>
          <span>{getTimeInHours(statusTimes.maintenance)} h</span>
        </p>

        <p>
          <span>Rendimentos totais:</span>
          <span>R$ {getTotalEarnings()}</span>
        </p>
      </div>
    );
  };

  const renderDetailsSection = () => {
    switch (detailsSelected) {
      case 0:
        return renderStatusHistoryDetails();

      case 1:
        return renderProductivityDetails();

      case 2:
        return renderEarningsDetails();

      default:
        return;
    }
  };

  const selectDetailsTab = tabIndex => {
    const divEl = document.getElementById("tab-buttons");

    if (detailsSelected !== -1) {
      divEl.children[detailsSelected].classList.remove("selected");
    }

    if (tabIndex === detailsSelected) {
      setDetailsSelected(-1);
    } else {
      divEl.children[tabIndex].classList.add("selected");
      setDetailsSelected(tabIndex);
    }
  };

  const deselectAllDetailsTabs = () => {
    const divEl = document.getElementById("tab-buttons");
    for (let node of divEl.children) {
      node.classList.remove("selected");
    }
  };

  useEffect(() => {
    if (selectedEquip) {
      setEquipmentData(selectedEquip);
    } else {
      resetEquipmentData();
    }
  }, [selectedEquip]);

  return (
    <S.Details
      ref={popupRef}
      color={latestStatusData?.color}
      className={name && "active"}
    >
      <div className="head">
        <div>
          <span className="material-symbols-rounded">{icon}</span>
        </div>
        <div className="details">
          <h3>{name}</h3>
          <h4>{modelData?.name}</h4>
          <h5>{latestStatusData?.name}</h5>
        </div>
      </div>

      <button
        type="button"
        className="pos-history"
        onClick={() => {
          renderType === 0 ? renderTypeHandler(1) : renderTypeHandler(0);
        }}
      >
        {renderType === 0
          ? "Mostrar histórico de posições no mapa"
          : "Mostrar todos os equipamentos no mapa"}
      </button>

      <div id="tab-buttons">
        <button type="button" onClick={() => selectDetailsTab(0)}>
          Histórico de estados
        </button>

        <button type="button" onClick={() => selectDetailsTab(1)}>
          Produtividade
        </button>

        <button type="button" onClick={() => selectDetailsTab(2)}>
          Ganhos
        </button>
      </div>

      {detailsSelected !== -1 && renderDetailsSection()}

      <button
        type="button"
        className="exit"
        onClick={() => selectedEquipHandler(null)}
      >
        <span className="material-symbols-rounded">close</span>
      </button>
    </S.Details>
  );
};

export default DetailsSection;
