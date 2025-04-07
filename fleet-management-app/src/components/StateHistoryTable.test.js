import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StateHistoryTable from './StateHistoryTable';

describe('StateHistoryTable', () => {
  it('renders the state history table', () => {
    const textColors = {
      "#2ecc71": "text-[#2ecc71]",
      "#f1c40f": "text-[#f1c40f]",
      "#e74c3c": "text-[#e74c3c]",
    }

    const stateHistory = [
      {
        dateTime: "2023-12-03T22:00:00.000Z",
        name: "Manutenção",
        color: "#e74c3c"
      },
      {
        dateTime: "2022-03-02T06:00:00.000Z",
        name: "Operando",
        color: "#2ecc71"
      },
      {
        dateTime: "2021-02-01T03:00:00.000Z",
        name: "Parado",
        color: "#f1c40f"
      },
    ]

    render(
      <StateHistoryTable
        stateHistory={stateHistory}
        textColors={textColors}
      />
    );    

    const headers = screen.getAllByRole("columnheader");
    const cells = screen.getAllByRole("cell");

    expect(headers.length).toBe(3);
    expect(headers[0]).toHaveTextContent("Data");
    expect(headers[1]).toHaveTextContent("Hora");
    expect(headers[2]).toHaveTextContent("Status");

    expect(cells.length).toBe(9);
    expect(cells[0]).toHaveTextContent("03/12/2023");
    expect(cells[1]).toHaveTextContent("7:00 PM");
    expect(cells[2]).toHaveTextContent("Manutenção");
    expect(cells[2].getAttribute("class")).toContain("text-[#e74c3c]");

    expect(cells[3]).toHaveTextContent("02/03/2022");
    expect(cells[4]).toHaveTextContent("3:00 AM");
    expect(cells[5]).toHaveTextContent("Operando");
    expect(cells[5].getAttribute("class")).toContain("text-[#2ecc71]");

    expect(cells[6]).toHaveTextContent("01/02/2021");
    expect(cells[7]).toHaveTextContent("12:00 AM");
    expect(cells[8]).toHaveTextContent("Parado");
    expect(cells[8].getAttribute("class")).toContain("text-[#f1c40f]");
  })
})