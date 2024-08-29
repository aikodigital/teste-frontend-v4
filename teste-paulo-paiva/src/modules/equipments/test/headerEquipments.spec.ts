import { mount } from "@vue/test-utils";
import HeaderEquipments from "@/modules/equipments/ui/components/HeaderEquipments.vue";

jest.mock("vuetify", () => ({
  useDisplay: () => ({
    smAndDown: false,
  }),
}));

describe("HeaderEquipments.vue", () => {
  it("renders the search input and clear button", () => {
    const wrapper = mount(HeaderEquipments);

    const searchField = wrapper.find("v-text-field");
    expect(searchField.exists()).toBe(true);

    const clearButton = wrapper.find("v-btn");
    expect(clearButton.exists()).toBe(true);

    expect(clearButton.text()).toBe("Limpa Filtro");
  });

  it("emits 'search' event with the correct value when the search button is clicked", async () => {
    const wrapper = mount(HeaderEquipments);
    const searchQuery = "Test Query";

    await wrapper.find("v-text-field").setValue(searchQuery);

    await wrapper.find("v-btn").trigger("click");

    expect(wrapper.emitted()).toHaveProperty("search");
    expect(wrapper.emitted().search[0]).toEqual([searchQuery]);
  });
});
