import { createContext, useState, ReactNode } from "react";
import { EquipamentResults } from "../models/equipament";
// import equipment from "../data/equipment.json";
// import { useProcess } from "../api";

type EquipamentContextType = {
  setEquipamentResults: (results: EquipamentResults) => void;
  equipamentResults: EquipamentResults;
};

const initialValue: EquipamentContextType = {
  setEquipamentResults: () => {},
  equipamentResults: [],
};

export const EquipamentContext =
  createContext<EquipamentContextType>(initialValue);

type Props = {
  children: ReactNode;
};

export const EquipamentContextProvider = ({ children }: Props) => {
  const [equipamentResults, setEquipamentResults] = useState<EquipamentResults>(
    []
  );
  // const { getEquipament } = useProcess();
  console.log("equipamentResults:", equipamentResults);

  // useEffect(() => {
  //   equipment.forEach((e) => getEquipament(e));
  // }, [getEquipament]);

  return (
    <EquipamentContext.Provider
      value={{
        setEquipamentResults,
        equipamentResults,
      }}
    >
      {children}
    </EquipamentContext.Provider>
  );
};
