import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect } from "vitest";
import EquipmentsMap from "../components/Equipment";

type Position = {
    id?: string;
    lat: number;
    lon: number;
    date: string;
  };

  type PositionLast = {
    id: string;
    position: Position;
    state: string;
  }
// Mock dos dados JSON (você pode adaptar conforme seu arquivo real)
vi.mock("../../data/equipmentPositionHistory.json", () => ({
  default: [
    {
      equipmentId: "eq-1",
      positions: [
        { date: "2021-02-01T03:00:00.000Z", lat: -19.12, lon: -45.94 },
        { date: "2021-02-01T15:00:00.000Z", lat: -19.26, lon: -46.09 }
      ]
    }
  ]
}));

vi.mock("../../data/equipmentStateHistory.json", () => ({
  default: [
    {
      equipmentId: "eq-1",
      states: [
        { date: "2021-02-01T03:00:00.000Z", equipmentStateId: "st-1" },
        { date: "2021-02-01T15:00:00.000Z", equipmentStateId: "st-2" }
      ]
    }
  ]
}));

vi.mock("../../data/equipmentState.json", () => ({
  default: [
    { id: "st-1", name: "Ligado", color: "green" },
    { id: "st-2", name: "Desligado", color: "red" }
  ]
}));

// Mock do leaflet, evita erros de DOM
vi.mock("react-leaflet", () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="map">{children}</div>,
  TileLayer: () => <div data-testid="tile" />,
  Marker: ({ children, eventHandlers }: { children: React.ReactNode; eventHandlers?: { click?: () => void } }) => (
    <div data-testid="marker" onClick={() => eventHandlers?.click?.()}>
      {children}
    </div>
  ),
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
  Tooltip: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip">{children}</div>,
  Polyline: ({ position }: PositionLast) => (
    <div data-testid="polyline">{JSON.stringify(position)}</div>
  )
}));

describe("EquipmentsMap Component", () => {
  // 🧩 1. Renderiza corretamente o mapa
  test("deve renderizar o mapa com TileLayer", () => {
    render(<EquipmentsMap />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
    expect(screen.getByTestId("tile")).toBeInTheDocument();
  });

  // 📍 2. Renderiza o marcador para o equipamento
  it("deve renderizar marcador do equipamento", () => {
    render(<EquipmentsMap />);
    const marker = screen.getByTestId("marker");
    expect(marker).toBeInTheDocument();
  });

  // 💬 3. Tooltip deve exibir o nome e cor do estado atual
  it("deve mostrar o estado do equipamento no tooltip", () => {
    render(<EquipmentsMap />);
    const tooltip = screen.getByTestId("tooltip");
    expect(tooltip).toHaveTextContent("Desligado");
  });

  // 🖱️ 4. Clicar no marcador deve selecionar o equipamento e exibir Polyline
  it("deve mostrar Polyline ao clicar no marcador", () => {
    render(<EquipmentsMap />);
    const marker = screen.getByTestId("marker");
    fireEvent.click(marker);
    const polyline = screen.getByTestId("polyline");
    expect(polyline).toBeInTheDocument();
  });

  // ⌨️ 5. Pressionar qualquer tecla deve limpar a seleção
  it("deve limpar a seleção ao pressionar tecla", () => {
    render(<EquipmentsMap />);
    const marker = screen.getByTestId("marker");
    fireEvent.click(marker);
    expect(screen.getByTestId("polyline")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });

    // Como o polyline desaparece, verificamos se foi removido
    expect(screen.queryByTestId("polyline")).not.toBeInTheDocument();
  });
});
