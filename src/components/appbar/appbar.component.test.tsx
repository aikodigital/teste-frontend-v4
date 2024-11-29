import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AppBarComponent } from "./appbar.component";

describe("app bar component", () => {
  it("should render the menu and filter options", () => {
    render(<AppBarComponent />);

    const menu = screen.getByText("Menu");
    const filter = screen.getByText("Filtrar");
    const search = screen.getByText("Pesquisar");

    expect(menu).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
});
