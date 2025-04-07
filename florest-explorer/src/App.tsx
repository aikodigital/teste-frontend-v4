import logo from './logo.svg';
import './App.scss';
import { AppWrapper } from './components/AppWrapper';
import IEquipment from './interfaces/IEquipment';
import React, { useState, useEffect } from 'react';
import IEquipmentModel from './interfaces/IEquipmentModel';
import IEquipmentPosition from './interfaces/IEquipmentPosition';
import IEquipmentState from './interfaces/IEquipmentState';
import IEquipmentStateHistory from './interfaces/IEquipmentStateHistory';


function App() {

  const [equipmentList, setEquipmentList] = useState<IEquipment[]>([]);
  const [equipmentModelList, setEquipmentModelList] = useState<IEquipmentModel[]>([]);
  const [equipmentPositionList, setEquipmentPositionList] = useState<IEquipmentPosition[]>([]);
  const [equipmentStateList, setEquipmentStateList] = useState<IEquipmentState[]>([]);
  const [equipmentStateHistoryList, setEquipmentStateHistoryList] = useState<IEquipmentStateHistory[]>([]);

  //TODO: Pensar em forma mais limpa de importar os vários JSONs sem repetir diversas funções semelhantes
  const fetchData = async (dataType : string) => {
    const response  = await fetch('./data/'+dataType+'.json');

    if (!response.ok) {
      throw new Error('Erro ao buscar os '+dataType+'.');
    }

    switch (dataType) {
      case 'equipment':
        let dataEquipment : IEquipment[] = await response.json();
        setEquipmentList(dataEquipment)
        break;

      case 'equipmentModel':
        let dataModel : IEquipmentModel[] = await response.json();
        setEquipmentModelList(dataModel)
        break;

      case 'equipmentPositionHistory':
        let dataPosition : IEquipmentPosition[] = await response.json();
        setEquipmentPositionList(dataPosition)
        break;

      case 'equipmentState':
        let State : IEquipmentState[] = await response.json();
        setEquipmentStateList(State)
        break;

      case 'equipmentStateHistory':
        let dataStateHistory : IEquipmentStateHistory[] = await response.json();
        setEquipmentStateHistoryList(dataStateHistory)
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    fetchData('equipment');
    fetchData('equipmentModel');
    fetchData('equipmentPositionHistory');
    fetchData('equipmentState');
    fetchData('equipmentStateHistory');
  }, []);

  return (
    <div className="App">
      <AppWrapper equipmentList = {equipmentList} equipmentModelList = {equipmentModelList} equipmentPositionList = {equipmentPositionList} equipmentStateList = {equipmentStateList} equipmentStateHistoryList = {equipmentStateHistoryList}/>
    </div>
  );
}

export default App;

