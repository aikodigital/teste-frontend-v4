import { describe, it, expect } from "vitest";
import { formatDate } from "@/utils/utils";

describe("formatDate", () => {
    it("should format the date correctly", () => {
        const input = "2024-09-21T15:30:00.000Z";
        const expectedOutput = "21/09/2024 às 15:30";

        const result = formatDate(input);

        expect(result).toBe(expectedOutput);
    });

    it("should handle invalid date inputs gracefully", () => {
        const input = "invalid-date-string";
        const expectedOutput = "NaN/NaN/NaN às NaN:NaN";

        const result = formatDate(input);

        expect(result).toBe(expectedOutput);
    });
});
