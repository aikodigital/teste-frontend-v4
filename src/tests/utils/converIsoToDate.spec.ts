import { describe, expect, it } from "vitest";
import { convertIsoToDate } from "../../utils/convertIsoToDate";

describe("convertIsoToDate", () => {
  it("deve converter uma string ISO válida em um objeto Date corretamente", () => {
    const isoString = "2024-08-31T10:00:00.000Z";
    const result = convertIsoToDate(isoString);

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe(isoString);
  });

  it("deve converter uma string ISO com fuso horário em um objeto Date corretamente", () => {
    const isoString = "2024-08-31T10:00:00+02:00";
    const result = convertIsoToDate(isoString);

    expect(result).toBeInstanceOf(Date);
    expect(result.toISOString()).toBe("2024-08-31T08:00:00.000Z");
  });

  it("deve criar um objeto Date inválido se a string ISO for inválida", () => {
    const isoString = "invalid-date";
    const result = convertIsoToDate(isoString);

    expect(result).toBeInstanceOf(Date);
    expect(isNaN(result.getTime())).toBe(true);
  });
});
