"use client";
import Image from "next/image";
import Table from "./components/Table";
import { formatDataForTable } from "./utils/data";
import { useEffect, useState } from "react";

export default function Home() {
  const [tableData, setTableData] = useState<EquipmentData[]>([]);

  useEffect(() => {
    const data = formatDataForTable();
    setTableData(data);
  }, []);

  return (
    <div className="px-8">
      <div className="w-full flex-col flex items-center justify-center mt-4">
        <Image
          src={"/img/aiko.png"}
          alt={"Aiko Logo"}
          height={100}
          width={250}
        />
        <h2 className="text-3xl mt-4">Gestão de Equipamento</h2>
      </div>
      <Table
        equipmentData={tableData}
        columns={[
          "Equipamento",
          "Estado Atual",
          "Localização Atual",
          "Rendimento",
          "Histórico",
        ]}
      />
    </div>
  );
}
