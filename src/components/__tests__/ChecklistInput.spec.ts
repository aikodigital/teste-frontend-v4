import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ChecklistInput from "@/components/ChecklistInput.vue";

vi.mock("@/stores/api", () => ({
  useApiStore: vi.fn(() => ({
    equipmentState: [{ name: "Operando" }, { name: "Manutenção" }],
    equipmentsModel: [{ name: "Modelo A" }, { name: "Modelo B" }],
    fetchState: vi.fn(),
    fetchEquipmentsModel: vi.fn(),
  })),
}));

describe("ChecklistInput", () => {
  it("renders state and model checkboxes correctly", async () => {
    const wrapper = mount(ChecklistInput);

    const stateLabels = wrapper.findAll("label[for='state']");
    expect(stateLabels.at(0)?.text()).toBe("Operando");
    expect(stateLabels.at(1)?.text()).toBe("Manutenção");

    const modelLabels = wrapper.findAll("label[for='model']");
    expect(modelLabels.at(0)?.text()).toBe("Modelo A");
    expect(modelLabels.at(1)?.text()).toBe("Modelo B");
  });

  it("toggles filter selection when a checkbox is clicked", async () => {
    const wrapper = mount(ChecklistInput);
    const checkbox = wrapper.find("input[type='checkbox']");

    await checkbox.trigger("change");
    expect((wrapper.vm as any).selectedFilters).toContain("Operando");

    await checkbox.trigger("change");
    expect((wrapper.vm as any).selectedFilters).not.toContain("Operando");
  });

  it("emits 'updateFilter' when a filter is changed", async () => {
    const wrapper = mount(ChecklistInput);

    const checkbox = wrapper.find("input[type='checkbox']");
    await checkbox.trigger("change");

    expect(wrapper.emitted().updateFilter).toBeTruthy();
    expect(wrapper.emitted().updateFilter[0]).toEqual([["Operando"]]);
  });
});
