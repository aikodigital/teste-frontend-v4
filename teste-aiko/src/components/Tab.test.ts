import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import Tab from './Tab.vue';
import { ref } from 'vue';

const tabControllerMockId = 'tab-controller';

beforeEach(() => {
  // create teleport target
  const el = document.createElement('div');
  el.id = `tab-controller-${tabControllerMockId}-body`;
  document.body.appendChild(el);
});

afterEach(() => {
  // clean up
  document.body.innerHTML = '';
});


describe('Tab.vue', () => {
  it('Deve renderizar a prop title', () => {
    render(Tab, {
      props: {
        title: 'Teste'
      },
      global: {
        provide: {
          tabControllerId: tabControllerMockId
        }
      }
    })

    expect(screen.getByText('Teste')).toBeTruthy();
  });

  it('Deve renderizar o slot title', () => {
    render(Tab, {
      slots: {
        title: 'Teste slot'
      },
      global: {
        provide: {
          tabControllerId: tabControllerMockId
        }
      }
    })

    expect(screen.getByText('Teste slot')).toBeTruthy();
  });

  it('Deve registrar a tab ao iniciar o componente', () => {
    const registerMock = vi.fn();

    const tabId = 'tab';

    render(Tab, {
      props: {
        title: 'Teste',
        id: tabId
      },
      global: {
        provide: {
          register: registerMock,
          tabControllerId: tabControllerMockId
        }
      }
    });

    expect(registerMock).toHaveBeenCalledWith(tabId);
  });

  it('Deve executar a função "selectTab" ao clicar no titulo', async () => {
    const selectTabMock = vi.fn();
    const tabId = 'tab';

    render(Tab, {
      props: {
        title: 'Teste',
        id: tabId
      },
      global: {
        provide: {
          selectTab: selectTabMock,
          tabControllerId: tabControllerMockId
        }
      }
    });

    const button = screen.getByTestId('tab-title-button');

    await fireEvent.click(button);

    expect(selectTabMock).toHaveBeenCalledWith(tabId);
  });

  it('Deve apresentar o slot default apenas quando a tab estiver selecionada', async () => {
    const selectTabMock = vi.fn();
    const tabId = 'tab';

    render(Tab, {
      props: {
        id: tabId
      },
      slots: {
        default: 'Teste',
      },
      global: {
        provide: {
          selectTab: selectTabMock,
          tabControllerId: tabControllerMockId,
          selectedTabId: ref(tabId)
        },
      }
    });

    await waitFor(() => screen.getByText('Teste'));

    expect(screen.getByText('Teste')).toBeTruthy();
  });
});