import { render, screen } from "@testing-library/react";
import { Timeline } from "./index";

const mockEquipment = {
  states: {
    statesResult: [{ name: "Estado 1", date: "2024-01-01", color: "blue" }],
  },
};

describe("teste", () => {
  test("responsive layout works correctly <Timeline />", () => {
    render(<Timeline equipment={mockEquipment} />);

    expect(screen.getByRole("list")).toHaveStyle("width: 90%");
  });
});
