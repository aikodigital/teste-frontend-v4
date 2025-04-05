import React, { useEffect, useState } from "react";
import { getStateHistoryAndPositionHistoryByEquipmentId } from "../utils/data";
import Table from "./Table";

interface HistoryProps {
  id: string;
}

const History = ({ id }: HistoryProps) => {
  const [history, setHistory] = useState<HistoryModalType[]>();

  useEffect(() => {
    const result = getStateHistoryAndPositionHistoryByEquipmentId(id);
    setHistory(result);
  }, [id]);

  return (
    <div className="max-h-[90vh] overflow-y-auto flex flex-col gap-8">
      <h3 className="text-3xl text-center mt-4">Histórico de Estado</h3>
      {history && (
        <Table
          columns={["Data", "Estado", "Localização"]}
          historyData={history}
        />
      )}
    </div>
  );
};

export default History;
