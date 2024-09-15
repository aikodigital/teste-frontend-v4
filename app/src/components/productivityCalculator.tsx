import { calculateProductivity } from "@/api/simulatedApi";
import { Equipment } from "@/interfaces";

const ProductivityCalculator = ({ equipment }: { equipment: Equipment }) => {
  return (
    <div>
      <p>Produtividade: </p>
      <p>{calculateProductivity(equipment.id, startDate, endDate)}%</p>
    </div>
  );
};
