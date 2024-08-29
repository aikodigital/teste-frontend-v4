import { mount } from "@vue/test-utils";
import ListLocation from "@/modules/location/ui/components/ListLocation.vue";
import L from "leaflet";

jest.mock("leaflet", () => ({
  map: jest.fn().mockImplementation(() => ({
    setView: jest.fn(),
    eachLayer: jest.fn(),
    removeLayer: jest.fn(),
  })),
  tileLayer: jest.fn().mockImplementation(() => ({
    addTo: jest.fn(),
  })),
  marker: jest.fn().mockImplementation(() => ({
    addTo: jest.fn(),
    bindPopup: jest.fn(),
  })),
}));

describe("ListLocation.vue", () => {
  it("renders the map container and initializes Leaflet map", async () => {
    const wrapper = mount(ListLocation);

    expect(wrapper.find("#map").exists()).toBe(true);

    expect(L.map).toHaveBeenCalled();
  });
});
