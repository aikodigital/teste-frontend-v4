import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Popover from "./Popover.vue";

describe("Popover.vue", () => {
  it("Deve renderizar o slot default", () => {
    render(Popover, {
      slots: {
        default: "Teste"
      }
    });

    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it("Deve renderizar o slot popover", () => {
    render(Popover, {
      slots: {
        popover: "Teste"
      }
    });

    expect(screen.getByText("Teste")).toBeTruthy();
  });
});