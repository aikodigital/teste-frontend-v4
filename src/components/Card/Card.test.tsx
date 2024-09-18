import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { CardDetails } from "./index";

import "@testing-library/jest-dom/vitest";

describe("Card Component", () => {
  test("should render state name", () => {
    render(<CardDetails name="" bg="" totalValue={5} children />);

    expect(screen.getByText("R$ 5")).toBeInTheDocument();
  });
});
