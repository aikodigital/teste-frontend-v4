import { mount } from "@vue/test-utils";
import PopUp from "../PopUp.vue";
import { describe, it, expect } from "vitest";

describe("PopUp.vue", () => {
    const positionData = {
        equipmentId: "ertyui",
        equipmentName: "Equipamento A",
        equipmentModelId: "poiuyt",
        equipmentModelName: "Modelo X",
        currentStateId: "nbvcx",
        currentStateName: "Operando",
        color: "#2ecc71",
        date: "2024-09-01T11:30:00Z",
        lat: -19.126536,
        lon: -45.947756,
        value: 100
    };

    it("renders correctly with position data", () => {
        const wrapper = mount(PopUp, {
            props: { position: positionData }
        });

        expect(wrapper.find(".data").text()).toContain("Equipamento A");
        expect(wrapper.findAll(".data")[1].text()).toBe("Modelo X");
        expect(wrapper.findAll(".data")[2].text()).toBe("Operando");
    });

    it("displays formatted date", () => {
        const wrapper = mount(PopUp, {
            props: { position: positionData },
        });

        expect(wrapper.findAll(".data")[3].text()).toBe("01/09/2024 às 11:30");
    });
});
