import { mount } from "@vue/test-utils";
import HeaderLocation from "@/modules/location/ui/components/HeaderLocation.vue";

describe("HeaderLocation.vue", () => {
  it("renders correctly", () => {
    const wrapper = mount(HeaderLocation);

    const buttons = wrapper.findAll("button");
    expect(buttons).toHaveLength(4);
  });

  it("emits the correct event when a button is clicked", async () => {
    const wrapper = mount(HeaderLocation);

    await wrapper.find(".default-Operand-button").trigger("click");
    expect(wrapper.emitted("search")).toEqual([["Operando"]]);

    await wrapper.find(".default-stationary-button").trigger("click");
    expect(wrapper.emitted("search")).toEqual([["Operando"], ["Parado"]]);

    await wrapper.find(".default-maintenance-button").trigger("click");
    expect(wrapper.emitted("search")).toEqual([
      ["Operando"],
      ["Parado"],
      ["Manutenção"],
    ]);

    await wrapper.find(".default-button").trigger("click");
    expect(wrapper.emitted("search")).toEqual([
      ["Operando"],
      ["Parado"],
      ["Manutenção"],
      [""],
    ]);
  });
});
