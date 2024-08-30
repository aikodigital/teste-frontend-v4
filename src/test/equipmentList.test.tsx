import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EquipmentList from "@/app/equipmentsList/components/equipementList";

describe("EquipmentList Test", () => {
  it("Listagem de Equipamentos", async () => {
    global.fetch = jest.fn(
      () =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              equipment: [{ id: "1", equipmentModelId: "model1" }],
              model: [{ id: "model1", name: "Model 1" }],
              stateHistory: [
                { equipmentId: "1", states: [{ equipmentStateId: "state1" }] },
              ],
              state: [{ id: "state1", name: "State 1" }],
            }),
        } as Response)
    );

    render(<EquipmentList />);

    expect(
      await screen.findByText("Listagem de Equipamentos")
    ).toBeInTheDocument();
  });
});
