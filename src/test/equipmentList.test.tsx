import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import EquipmentList from "../app/equipmentsList/components/equipementList";

describe("EquipmentList Component", () => {
  it("renders the equipment list title", async () => {
    render(<EquipmentList />);
    
    expect(await screen.findByText("Listagem de Equipamentos")).toBeInTheDocument();
  });
});
