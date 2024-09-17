import { describe, expect, it } from "vitest";
import { formatToBRL } from "../../utils/formatToBRL";

describe("formatToBRL", () => {
  it("deve formatar o número corretamente para BRL", () => {
    const amount = 0;
    const formatted = formatToBRL(amount);
    const expected = "R$ 0,00";

    expect(formatted.replace(/\s+/g, " ")).toBe(expected.replace(/\s+/g, " "));
  });

  it("deve formatar o número corretamente para BRL com valores diferentes", () => {
    const amount = 1234.56;
    const formatted = formatToBRL(amount);

    const expected = "R$ 1.234,56";

    expect(formatted.replace(/\s+/g, " ")).toBe(expected.replace(/\s+/g, " "));
  });
});