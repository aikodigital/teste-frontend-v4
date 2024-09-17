import { fireEvent, render } from "@testing-library/react";
import { Search } from "../../components/Search";
import { EquipmentProvider } from "../../contexts/equipment";

describe("Search component", () => {
  it("filters equipment by name and clears filters", () => {
    const { getByPlaceholderText, getByText } = render(
      <EquipmentProvider>
        <Search />
      </EquipmentProvider>,
    );

    const input = getByPlaceholderText("Buscar por nome (Ex.: CA-0001)");
    const clearButton = getByText("Limpar");

    fireEvent.change(input, { target: { value: "Test Equipment" } });
    expect(input).toHaveValue("Test Equipment");

    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });
});