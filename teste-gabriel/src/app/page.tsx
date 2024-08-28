import EquipmentList from "./equipmentsList/components/equipementList";


export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <EquipmentList />
      </div>
    </div>
  );
}
