import EquipmentDetails from "@/components/EquipamentDetails";


export default function Home() {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <EquipmentDetails />
      </div>
    </div>
  );
}
