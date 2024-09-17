import { fireEvent, render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import { Filter } from "../../components/Filter";
import { useEquipmentContext } from "../../contexts/equipment";

vi.mock("../../contexts/equipment", () => ({
  useEquipmentContext: vi.fn(),
}));

describe("Filter", () => {
  const mockFilterByState = vi.fn();
  const mockFilterByModel = vi.fn();
  const mockClearFilters = vi.fn();

  beforeEach(() => {
    (useEquipmentContext as Mock).mockReturnValue({
      filterByState: mockFilterByState,
      filterByModel: mockFilterByModel,
      clearFilters: mockClearFilters,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve exibir os filtros de estado e modelo", () => {
    render(<Filter />);

    expect(screen.getByLabelText(/Filtrar por Estado:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filtrar por Modelo:/i)).toBeInTheDocument();
  });

  it("deve chamar filterByState quando o filtro de estado for alterado", () => {
    render(<Filter />);

    fireEvent.change(screen.getByLabelText(/Filtrar por Estado:/i), {
      target: { value: "Operando" },
    });

    expect(mockFilterByState).toHaveBeenCalledWith("Operando");
  });

  it("deve chamar filterByModel quando o filtro de modelo for alterado", () => {
    render(<Filter />);

    fireEvent.change(screen.getByLabelText(/Filtrar por Modelo:/i), {
      target: { value: "Caminhão de carga" },
    });

    expect(mockFilterByModel).toHaveBeenCalledWith("Caminhão de carga");
  });

  it("deve chamar clearFilters quando o botão Limpar Filtros for clicado", () => {
    render(<Filter />);

    fireEvent.click(screen.getByText(/Limpar Filtros/i));

    expect(mockClearFilters).toHaveBeenCalled();
  });
});