import styles from "./Equipment.module.css";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEquipments } from "../contexts/EquipmentsContext";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

function Equipment() {
  const { id } = useParams();
  const [operatingTime, setOperatingTime] = useState(0);
  const [stoppedTime, setStoppedTime] = useState(0);
  const [maintenanceTime, setMaintenanceTime] = useState(0);
  const { getEquipment, currentEquipment, isLoading } = useEquipments();

  useEffect(
    function () {
      getEquipment(id);
    },
    [id, getEquipment]
  );

  const { name, model, states } = currentEquipment;

  useEffect(
    function () {
      if (!Array.isArray(states) || states.length <= 0) {
        return;
      }
      let totalOperatingTime = 0;
      let totalStoppedTime = 0;
      let totalMaintenanceTime = 0;

      for (let i = 0; i < states.length - 1; i++) {
        const currentStatus = states[i];
        const nextStatus = states[i + 1];
        const startDate = new Date(currentStatus.date);
        const endDate = new Date(nextStatus.date);
        const timeDiff = endDate - startDate;

        if (currentStatus.name === "Operando") {
          totalOperatingTime += timeDiff;
        } else if (currentStatus.name === "Parado") {
          totalStoppedTime += timeDiff;
        } else if (currentStatus.name === "Manutenção") {
          totalMaintenanceTime += timeDiff;
        }
      }

      const lastStatus = states[states.length - 1];
      const lastStatusDate = new Date(lastStatus.date);

      const endOfDay = new Date(lastStatusDate);
      endOfDay.setHours(23, 59, 59, 999);

      const timeUntilEndOfDay = endOfDay - lastStatusDate;

      if (lastStatus.name === "Operando") {
        totalOperatingTime += timeUntilEndOfDay;
      } else if (lastStatus.name === "Parado") {
        totalStoppedTime += timeUntilEndOfDay;
      } else if (lastStatus.name === "Manutenção") {
        totalMaintenanceTime += timeUntilEndOfDay;
      }

      setOperatingTime(totalOperatingTime);
      setStoppedTime(totalStoppedTime);
      setMaintenanceTime(totalMaintenanceTime);
    },
    [states]
  );

  const convertMilliseconds = (milliseconds) => {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const totalHours = Math.floor(milliseconds / (1000 * 60 * 60));
    return { days, hours, totalHours };
  };

  const operatingDuration = convertMilliseconds(operatingTime);
  const stoppedDuration = convertMilliseconds(stoppedTime);
  const maintenanceDuration = convertMilliseconds(maintenanceTime);

  const totalStatusHours =
    operatingDuration.totalHours +
    stoppedDuration.totalHours +
    maintenanceDuration.totalHours;
  const productivityPercentage = Math.floor(
    (operatingDuration.totalHours / totalStatusHours) * 100
  );

  const calculateEarnings = (
    operatingTotalHours,
    stoppedTotalHours,
    maintenanceTotalHours
  ) => {
    if (model && model.hourlyEarnings) {
      return model.hourlyEarnings.reduce((acc, earning) => {
        if (earning.name === "Operando") {
          acc += operatingTotalHours * earning.value;
        } else if (earning.name === "Parado") {
          acc += stoppedTotalHours * earning.value;
        } else if (earning.name === "Manutenção") {
          acc += maintenanceTotalHours * earning.value;
        }
        return acc;
      }, 0);
    }
    return 0;
  };

  const earningsPerActivity = calculateEarnings(
    operatingDuration.totalHours,
    stoppedDuration.totalHours,
    maintenanceDuration.totalHours
  );

  const formatedEarnings = earningsPerActivity.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.equipment}>
      <div className={styles.row}>
        <h6>Nome do equipamento</h6>
        <h3>{name}</h3>
        {model?.name && (
          <>
            <h6>Modelo</h6>
            <h3>{model.name}</h3>
          </>
        )}
        <h6>Percentual de produtividade</h6>
        <h3>{productivityPercentage}%</h3>
        <h6>Ganhos por atividade</h6>
        <h3>{formatedEarnings}</h3>
        <h6>Status</h6>
        <ul className={styles.states}>
          {Array.isArray(states) &&
            states.map((state, index) => (
              <li className={styles.state} key={index}>
                <span style={{ color: state.color }}>{state.name}</span>
                <span>
                  {format(new Date(state.date), "hh:mm aa - dd/MM/yyyy")}
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default Equipment;
