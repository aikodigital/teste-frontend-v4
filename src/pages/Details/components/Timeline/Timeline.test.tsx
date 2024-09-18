import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { Timeline } from "./index";

import "@testing-library/jest-dom/vitest";

const mockEquipment = {
  states: {
    statesResult: [{ name: "Parado", date: "2024-01-01", color: "blue" }],
  },
};

describe("Timeline Component", () => {
  test("should render state name", () => {
    render(<Timeline equipment={mockEquipment} />);

    expect(screen.getByText("Parado")).toBeInTheDocument();
  });
});
