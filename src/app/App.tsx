import { useEffect } from "react";
import { CompassFill, GearFill, HouseFill } from "react-bootstrap-icons";
import { Outlet } from "react-router";

import { Header } from "@/components/Header";
import { Navbar, NavItem } from "@/components/Navbar";
import { useEquipmentStore } from "@/lib/store";

import equipmentData from "@/data/equipment.json" with { type: "json" };
import modelData from "@/data/equipmentModel.json" with { type: "json" };
import positionHistoryData from "@/data/equipmentPositionHistory.json" with { type: "json" };
import stateData from "@/data/equipmentState.json" with { type: "json" };
import stateHistoryData from "@/data/equipmentStateHistory.json" with { type: "json" };

import { Equipment, EquipmentModel, EquipmentPositionHistory, EquipmentState, EquipmentStateHistory } from "@/types/equipment";

export default function App() {
  const { setEquipments, setModels, setPositionHistory, setStates, setStateHistory } = useEquipmentStore();

  useEffect(() => {
    // Simulating data fetching
    setEquipments(equipmentData as Equipment[]);
    setModels(modelData as EquipmentModel[]);
    setPositionHistory(
      positionHistoryData.map(item => ({
        ...item,
        positions: item.positions.map(position => ({
          ...position,
          date: new Date(position.date),
        })),
      })) as EquipmentPositionHistory[]
    );
    setStates(stateData as EquipmentState[]);
    setStateHistory(
      stateHistoryData.map(item => ({
        ...item,
        states: item.states.map(state => ({
          ...state,
          date: new Date(state.date),
          stateId: state.equipmentStateId,
        })),
      })) as EquipmentStateHistory[]
    );
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex-1 flex md:flex-row flex-col-reverse overflow-hidden">
        <Navbar>
          <NavItem to="/">
            <HouseFill size={24} />
            <span>Início</span>
          </NavItem>
          <NavItem to="/state">
            <GearFill size={24} />
            <span>Estado</span>
          </NavItem>
          <NavItem to="/route">
            <CompassFill size={24} />
            <span>Trajeto</span>
          </NavItem>
        </Navbar>
        <main className="flex-1 flex md:m-1 bg-zinc-200 dark:bg-zinc-900 md:rounded-xl overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}