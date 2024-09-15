import { describe, it, expect } from "vitest";
import { GET } from "./route";

describe("GET /equipment/model", () => {
  it("Deve retornar os dados com status 200", async () => {
    const response = await GET();

    expect(response.status).toBe(200);

    const responseData = await response.json();
    expect(responseData).toBeDefined();
    expect(Array.isArray(responseData)).toBe(true);
  });
});
