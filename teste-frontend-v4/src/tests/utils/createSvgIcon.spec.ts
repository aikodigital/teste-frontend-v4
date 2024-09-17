import { describe, expect, it } from "vitest";
import { createSvgIcon } from "../../utils/createSvgIcon";

describe("createSvgIcon", () => {
  it("deve criar um ícone SVG para o modelo 'Harvester' com a cor especificada", () => {
    const icon = createSvgIcon("Harvester", "blue");

    expect(icon).toBeDefined();
    expect(icon.options.html).toContain(
      '<path d="M3 12h18v3H3v-3zm0 5h18v3H3v-3zm4-11h10v3H7V6z" fill="blue" />',
    );
    expect(icon.options.iconSize).toEqual([40, 40]);
  });

  it("deve criar um ícone SVG para o modelo 'Caminhão de carga' com a cor especificada", () => {
    const icon = createSvgIcon("Caminhão de carga", "red");

    expect(icon).toBeDefined();
    expect(icon.options.html).toContain(
      '<path d="M2 16v-7h13v7h5v2H3v-2h-1zm16-2h2v-3h-2v3zM6 20c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm10-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="red" />',
    );
    expect(icon.options.iconSize).toEqual([40, 40]);
  });

  it("deve criar um ícone SVG para o modelo 'Garra traçadora' com a cor especificada", () => {
    const icon = createSvgIcon("Garra traçadora", "green");

    expect(icon).toBeDefined();
    expect(icon.options.html).toContain(
      '<path d="M12 2l1.5 5H18l-4.5 4 1.5 5L12 14l-3 2 1.5-5L6 7h4.5z" fill="green" />',
    );
    expect(icon.options.iconSize).toEqual([40, 40]);
  });

  it("deve criar um ícone SVG genérico para um modelo desconhecido com a cor especificada", () => {
    const icon = createSvgIcon("Desconhecido", "purple");

    expect(icon).toBeDefined();
    expect(icon.options.html).toContain(
      '<path d="M0 0 L40 0 L40 40 L0 40 Z" fill="purple" />',
    );
    expect(icon.options.iconSize).toEqual([40, 40]);
  });
});