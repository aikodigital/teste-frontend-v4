import { describe, it, expect, beforeAll, vi } from "vitest";
import { screen, render, fireEvent } from "@testing-library/vue";
import Sidebar from "./Sidebar.vue";

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe("Sidebar.vue", () => {
  it("Deve renderizar o slot default", () => {
    render(Sidebar, {
      slots: {
        default: "Teste"
      }
    });

    expect(screen.getByText("Teste")).toBeTruthy();
  });

  it('Deve indicar que o dialog esta no modo fullscreen', async () => {
    render(Sidebar, {
      slots: {
        default: "Teste"
      }
    });

    // dialog inicia como sidebar
    expect(screen.getByTestId('dialog').classList.contains('dialog--fullscreen')).toBeFalsy();

    const button = screen.getByTestId('dialog-toggle-fullscreen');

    await fireEvent.click(button);

    expect(screen.getByTestId('dialog').classList.contains('dialog--fullscreen')).toBeTruthy();
  });

  it('Deve emitir o evento `close` ao fechar o dialog', async () => {
    const closeMock = vi.fn();
    HTMLDialogElement.prototype.close = closeMock;

    const { emitted } = render(Sidebar, {
      slots: {
        default: "Teste"
      }
    });

    const button = screen.getByTestId('dialog-close');

    await fireEvent.click(button);

    expect(closeMock).toHaveBeenCalled();

    // função close do dialog não está implementada no jsdom
    // necessário emitir o evento `close` manual
    const dialog = screen.getByTestId('dialog');
    dialog.dispatchEvent(new Event('close'));

    expect(emitted().close.length).toBe(1);
  });
});