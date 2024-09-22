import { useState } from "react";
import { useEquipmentContext } from "../context/EquipmentContext";

interface SideBarProps {
  isVisible: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isVisible }) => {
  const { equipments } = useEquipmentContext();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEquipments = equipments.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`menu absolute bg-base-200 rounded-box md:w-80 w-72 top-5 right-5 transition-all duration-300 ${
        isVisible ? "z-[999] opacity-100" : "z-[-1] opacity-0"
      }`}
    >
      <input
        type="text"
        placeholder="Pesquisar equipamento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="input input-bordered w-full mb-4"
      />

      <ul className="w-full">
        {filteredEquipments.map((equipment) => (
          <li key={equipment.id} className="p-2">
            <span className="flex items-center justify-between">
              <span>{equipment.name}</span>
              <span
                className="badge text-white"
                style={{ backgroundColor: equipment.color }}
              >
                {equipment.state}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
