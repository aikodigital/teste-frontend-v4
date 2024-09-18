import { render, screen } from "@testing-library/react";
import { CardDetails } from "./index";
import "@testing-library/jest-dom";

describe("CardDetails", () => {
  test("renders correctly with props", () => {
    render(
      <CardDetails name="Perda em Manutenção" totalValue={100} bg="#853027">
        <div>Children Content</div>
      </CardDetails>
    );

    expect(screen.getByText("Perda em Manutenção")).toBeInTheDocument();

    expect(screen.getByText("100R$")).toBeInTheDocument();

    expect(
      screen.getByRole("img", { name: /TrendingUpOutlinedIcon/i })
    ).toBeInTheDocument();
  });

  test("renders the correct icon for negative values", () => {
    render(
      <CardDetails name="Perda em Manutenção" totalValue={-50} bg="#853027">
        <div>Children Content</div>
      </CardDetails>
    );

    expect(
      screen.getByRole("img", { name: /TrendingDownOutlinedIcon/i })
    ).toBeInTheDocument();
  });

  test("renders children correctly", () => {
    render(
      <CardDetails name="Perda em Manutenção" totalValue={0} bg="#853027">
        <div>Children Content</div>
      </CardDetails>
    );

    expect(screen.getByText("Children Content")).toBeInTheDocument();
  });
});
