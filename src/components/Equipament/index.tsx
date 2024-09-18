import React from "react";
import { useEquipmentContext } from "../../context/EquipamentContext";
import EquipmentFilters from "./partials/EquipamentFilters";
import TableInfo from "./partials/EquipamentTable";

const EquipmentInfo: React.FC = () => {
  const { stateHistories, states, selectedEquipment } = useEquipmentContext();
  const [filterState, setFilterState] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<string>("");
  const [endDate, setEndDate] = React.useState<string>("");

  const applyFilters = (history: any) => {
    return history.states.filter((stateRecord: any) => {
      const date = new Date(stateRecord.date);

      if (startDate && date < new Date(startDate)) return false;
      if (endDate && date > new Date(endDate)) return false;

      if (filterState && stateRecord.equipmentStateId !== filterState) return false;

      return true;
    });
  };

  const filteredHistories = React.useMemo(() => {
    return stateHistories.map((history) => ({
      ...history,
      states: applyFilters(history),
    }));
  }, [stateHistories, filterState, startDate, endDate]);

  const filteredHistoriesForSelected = selectedEquipment
    ? filteredHistories.filter(
        (history) => history.equipmentId === selectedEquipment.id
      )
    : [];

  const clearFilters = () => {
    setFilterState("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <TableInfo
        equipmentName={selectedEquipment?.name || "Dados do equipamento"}
        filteredHistories={filteredHistoriesForSelected}
        states={states}
        selectedEquipment={selectedEquipment}
        EquipmentFilters={
          <EquipmentFilters
            filterState={filterState}
            setFilterState={setFilterState}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            states={states}
            clearFilters={clearFilters}
            records={stateHistories.flatMap(history => history.states)} 
          />
        }
      />
    </div>
  );
};

export default EquipmentInfo;
