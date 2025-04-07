import { render, screen, fireEvent } from "@testing-library/react";
import EquipmentMap from "../components/Map";
import { useEnrichedEquipmentData } from "../hooks/useEnrichedEquipmentData";

jest.mock("../hooks/useEnrichedEquipmentData");
jest.mock('leaflet');

const mockData = [
    {
        id: "1",
        name: "Escavadeira A",
        model: "Model A",
        equipmentModelId: "a4b0c114-acd8-4151-9449-7d12ab9bf40f",
        state: { name: "Operando", color: "green" },
        position: { lat: -19.126, lon: -45.947 },
    },
    {
        id: "2",
        name: "Caminhão B",
        model: "Model B",
        equipmentModelId: "a3540227-2f0e-4362-9517-92f41dabbfdf",
        state: { name: "Parado", color: "red" },
        position: { lat: -19.127, lon: -45.948 },
    },
];

describe("EquipmentMap", () => {
    beforeEach(() => {
        (useEnrichedEquipmentData as jest.Mock).mockReturnValue({ data: mockData });
    });

    it("renders markers for equipment", () => {
        render(<EquipmentMap />);
        expect(screen.getByText("Escavadeira A")).toBeInTheDocument();
        expect(screen.getByText("Caminhão B")).toBeInTheDocument();
    });

    it("filters by state", () => {
        render(<EquipmentMap />);
        fireEvent.change(screen.getByDisplayValue("Todos os Estados"), {
        target: { value: "Operando" },
        });
        expect(screen.getByText("Escavadeira A")).toBeInTheDocument();
        expect(screen.queryByText("Caminhão B")).not.toBeInTheDocument();
    });

    it("filters by name", () => {
        render(<EquipmentMap />);
        fireEvent.change(screen.getByPlaceholderText("Buscar por nome"), {
        target: { value: "Caminhão" },
        });
        expect(screen.getByText("Caminhão B")).toBeInTheDocument();
        expect(screen.queryByText("Escavadeira A")).not.toBeInTheDocument();
    });
});
