import { mount } from "@vue/test-utils";
import ListEquipments from "@/modules/equipments/ui/components/ListEquipments.vue";
import { Equipment } from "@/modules/equipments/dtos/equipmentDto";
import { computed, ref } from "vue";

const mockItems: Equipment[] = [
  { id: "1", name: "Equipamento 1", equipmentModelId: "Model1" },
  { id: "2", name: "Equipamento 2", equipmentModelId: "Model2" },
];

describe("ListEquipments.vue", () => {
  it("renders the header correctly", () => {
    const wrapper = mount(ListEquipments, {
      props: {
        searchQuery: "",
      },
      setup() {
        const items = ref<Equipment[]>(mockItems);
        return { items };
      },
    });

    const headers = wrapper.findAll(".list-header span");
    expect(headers.length).toBe(3);
    expect(headers[0].text()).toBe("Id do Equipamento");
    expect(headers[1].text()).toBe("Nome");
    expect(headers[2].text()).toBe("Equipamento ModelId");
  });

  it("renders the correct number of items", async () => {
    const wrapper = mount(ListEquipments, {
      props: {
        searchQuery: "",
      },
      setup() {
        const items = ref<Equipment[]>(mockItems);
        const currentPage = ref(1);
        const perPage = ref(7);
        const filteredItems = computed(() => items.value);
        const paginatedItems = computed(() => {
          const start = (currentPage.value - 1) * perPage.value;
          const end = start + perPage.value;
          return filteredItems.value.slice(start, end);
        });
        return { items, paginatedItems, currentPage, perPage };
      },
    });

    await wrapper.vm.$nextTick();

    const itemRows = wrapper.findAll(".list-card");
    expect(itemRows.length).toBe(mockItems.length);
  });
});
