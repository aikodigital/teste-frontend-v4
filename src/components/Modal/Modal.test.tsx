import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./index";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const mockOnClose = jest.fn();
  const mockSetFilters = jest.fn();

  test("renders correctly when open", () => {
    render(
      <Modal onClose={mockOnClose} isOpen={true} setFilters={mockSetFilters} />
    );

    expect(screen.getByText("Filtros")).toBeInTheDocument();
    expect(screen.getByLabelText("pesquisa")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Confirmar")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    render(
      <Modal onClose={mockOnClose} isOpen={false} setFilters={mockSetFilters} />
    );

    expect(screen.queryByText("Filtros")).not.toBeInTheDocument();
  });

  test("calls onClose when Cancelar is clicked", () => {
    render(
      <Modal onClose={mockOnClose} isOpen={true} setFilters={mockSetFilters} />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("calls setFilters with form data when Confirmar is clicked", () => {
    render(
      <Modal onClose={mockOnClose} isOpen={true} setFilters={mockSetFilters} />
    );

    fireEvent.change(screen.getByLabelText("pesquisa"), {
      target: { value: "Equipamento Teste" },
    });
    fireEvent.click(screen.getByText("Confirmar"));

    expect(mockSetFilters).toHaveBeenCalledWith({
      name: "Equipamento Teste",
    });
  });
});
