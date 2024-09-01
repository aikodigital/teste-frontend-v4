import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";

import TabController from "./TabController.vue";
import Tab from "./Tab.vue";
import { h } from "vue";

describe("TabController.vue", () => {
  it('Deve renderizar os titulos das tabs', () => {
    const firstTabId = 'first';
    const seconTabdId = 'second';

    const tabs = [
      h(Tab, {
        id: firstTabId,
        title: 'Teste 1'
      }),
      h(Tab, {
        id: seconTabdId,
        title: 'Teste 2'
      })
    ];

    render(TabController, {
      slots: {
        default: tabs
      },
      global: {
        stubs: {
          teleport: true
        }
      }
    });

    expect(screen.getByText('Teste 1')).toBeTruthy();
    expect(screen.getByText('Teste 2')).toBeTruthy();

    expect(screen.getByTestId('tab-controller-header').childElementCount).toBe(tabs.length);
  });
});