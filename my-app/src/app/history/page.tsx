import dynamic from "next/dynamic";

const EquipmentTable = dynamic(() => import("../../components/equipmentTable/equipmentTable"), {
  ssr: false, // Desabilita a renderização do lado do servidor
});

const HistoryPage = () => {
  return (
    <div>
      <h1>Histórico</h1>
      <EquipmentTable />
    </div>
  );
};

export default HistoryPage;
