import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { AppBarComponent } from "./appbar.component";

describe("app bar component", () => {
  it("should render the menu", () => {
    render(<AppBarComponent />);

    const map = screen.getByText("Mapa");
    const dashboard = screen.getByText("Dashboard");
    const filter = screen.getByText("Filtrar");
    const search = screen.getByText("Pesquisar");

    expect(map).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });

  it("the menu should appear when clicking on the filter option", async () => {
    render(<AppBarComponent />);

    const filterButton = screen.getByText("Filtrar");

    await userEvent.click(filterButton);

    await waitFor(() => {
      expect(filterButton).toHaveAttribute("aria-expanded", "true");
    });

    expect(await screen.findByText("Nenhum")).toBeInTheDocument();
    expect(await screen.findByText("Operando")).toBeInTheDocument();
    expect(await screen.findByText("Parado")).toBeInTheDocument();
    expect(await screen.findByText("Manutenção")).toBeInTheDocument();
    expect(await screen.findByText("Caminhão de carga")).toBeInTheDocument();
    expect(await screen.findByText("Harvester")).toBeInTheDocument();
    expect(await screen.findByText("Garra traçadora")).toBeInTheDocument();
  });
});
