import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import '@testing-library/jest-dom';
import MapComponent from "@/app/equipmentsPosition/components/map";

//Teste para verificar se o pop up "Última Posição" foi gerado no Map
describe("Map Test", () => {
    it("Map", async () => {
        const mockedPositions = [
            {
                lat: 19.150549,
                lng: 45.999157,
                date: new Date().toLocaleString(),
            },
            {
                lat: 19.278562,
                lng: 45.958986,
                date: new Date(new Date().setDate(new Date().getDate()-2)).toLocaleString(),
            },
            {
                lat: 19.093421,
                lng: 46.114738,
                date: new Date(new Date().setDate(new Date().getDate()-1)).toLocaleString(),
            }
        ];
        
        render(<MapComponent positions={mockedPositions} />);
        
        await waitForElementToBeRemoved(() => screen.getByText("Loading..."));
        
        await waitFor(() => expect(screen.getByText("Última Posição")).toBeInTheDocument());
    });
});
