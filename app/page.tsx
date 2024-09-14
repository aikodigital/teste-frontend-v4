// /pages/index.tsx
import { useEffect } from "react";
import useStore from "../store/useStore";

export default function Home() {
  const loadEquipmentData = useStore((state) => state.loadEquipmentData);

  useEffect(() => {
    loadEquipmentData();
  }, [loadEquipmentData]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Operação Florestal</h1>
      {/* Mapa e outros componentes virão aqui */}
    </div>
  );
}
