import React, { useEffect, useState } from 'react';
import './App.css';
import { IEquipment } from '../../models/Equipment';
import EquipmentTable from '../../components/equipments/EquipmentsTable';



const InitialPage = () => {

  const [equipments, setEquipments] = useState<IEquipment[]>([]);


  useEffect(() => {
    getEquipments();
  }, [])




  const getEquipments = async () => {
    try {
      const resp = await fetch('data/equipment.json');
      const data: IEquipment[] = await resp.json();
      setEquipments(data);
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <div className="App">
      <h2>Meus Equipamentos</h2>

      <EquipmentTable
        equipments={equipments}
      />

    </div>
  );
}



export default InitialPage;
