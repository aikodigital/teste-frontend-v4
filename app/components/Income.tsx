import React, { useEffect, useState } from "react";
import {
  calculateIncome,
  findEquipmentById,
  getIncomeDataById,
} from "../utils/data";
import Table from "./Table";

interface IncomeProps {
  id: string;
}

interface EquipmentBaseData {
  equipmentModelId: string;
}

interface StateData {
  hours: number;
}


interface IncomeEntry {
  date: string;
  hoursInOperation: number;
  hoursInMaintainance: number;
  hoursStopped: number;
  totalIncome: number;
}

const Income = ({ id }: IncomeProps) => {
  const [incomeData, setIncomeData] = useState<IncomeEntry[]>([]);

  useEffect(() => {
    const equipment = findEquipmentById(id);
    const hoursPerState = getIncomeDataById(id);
    const incomeDataEntry: IncomeEntry[] = [];

    hoursPerState.forEach((item) => {
      const hoursInOperation = item.states[0]?.hours || 0;
      const hoursInMaintainance = item.states[1]?.hours || 0;
      const hoursStopped = item.states[0]?.hours || 0;
      const model = equipment?.equipmentModelId;
      const date = item.day;

      if (model) {
        const completeIncomeData = calculateIncome(
          hoursInOperation,
          hoursInMaintainance,
          hoursStopped,
          model,
          date
        );

        incomeDataEntry.push(...completeIncomeData);
      }
    });

    setIncomeData(incomeDataEntry);
  }, [id]);

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-8">
      <h3 className="text-3xl text-center mt-4">Rendimento do Equipamento</h3>
      {incomeData.length > 0 && (
        <Table
          columns={[
            "Data",
            "Horas em operação",
            "Horas em manutenção",
            "Horas parado",
            "Rendimento Total",
          ]}
          incomeData={incomeData}
        />
      )}
    </div>
  );
};

export default Income;
