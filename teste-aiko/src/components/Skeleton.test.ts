import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import Skeleton from "./Skeleton.vue";

describe("Skeleton.vue", () => {
  it("Deve renderizar o slot default apenas caso isLoading seja false", async () => {
    const { rerender } = render(Skeleton, {
      props: {
        isLoading: true
      },
      slots: {
        default: "Teste"
      }
    });

    expect(screen.queryByText("Teste")).toBeFalsy();

    await rerender({
      isLoading: false
    });

    expect(screen.queryByText("Teste")).toBeTruthy();
  });

  it("Deve apresentar o skeleton apenas caso isLoading seja true", async () => {
    const { rerender } = render(Skeleton, {
      props: {
        isLoading: true
      },
      slots: {
        default: "Teste"
      }
    });

    expect(screen.queryByTestId("skeleton")).toBeTruthy();

    await rerender({
      isLoading: false
    });

    expect(screen.queryByTestId("skeleton")).toBeFalsy();
  });

  it("Deve renderizar o slot 'skeleton' caso isLoading seja true", async () => {
    const { rerender } = render(Skeleton, {
      props: {
        isLoading: true
      },
      slots: {
        default: "Teste",
        skeleton: "skeleton-slot"
      }
    });

    expect(screen.queryByText("skeleton-slot")).toBeTruthy();

    await rerender({
      isLoading: false
    });

    expect(screen.queryByText("skeleton-slot")).toBeFalsy();
  });

});