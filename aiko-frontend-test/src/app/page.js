// src/app/page.js
'use client';
import MapDisplay from "./component/mapDisplay/mapDisplay";
import styles from "./page.module.css";
import { setEquipment } from '../../store/slices/equipmentSlice';
import { setEquipmentModel } from '../../store/slices/equipmentModelSlice';
import { setEquipmentState } from '../../store/slices/equipmentStateSlice';
import { setEquipmentStateHistory } from '../../store/slices/equipmentStateHistorySlice';
import { setEquipmentPositionHistory } from '../../store/slices/equipmentPositionHistorySlice';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import HistoryTable from "./component/historyTable/historyTable";

export default function Home() {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const equipmentData = await fetch('/data/equipment.json').then((response) => response.json());
      const equipmentModelData = await fetch('/data/equipmentModel.json').then((response) => response.json());
      const equipmentStateData = await fetch('/data/equipmentState.json').then((response) => response.json());
      const equipmentPositionHistoryData = await fetch('/data/equipmentPositionHistory.json').then((response) => response.json());
      const equipmentStateHistoryData = await fetch('/data/equipmentStateHistory.json').then((response) => response.json());

      dispatch(setEquipment(equipmentData));
      dispatch(setEquipmentModel(equipmentModelData));
      dispatch(setEquipmentState(equipmentStateData));
      dispatch(setEquipmentStateHistory(equipmentStateHistoryData));
      dispatch(setEquipmentPositionHistory(equipmentPositionHistoryData));
    } catch (error) {
      console.error('Fetch error:', error);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className={styles.main}>
      <MapDisplay />
      <HistoryTable />
    </main>
  );
}
