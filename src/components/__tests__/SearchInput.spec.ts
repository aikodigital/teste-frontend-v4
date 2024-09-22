import { mount } from "@vue/test-utils";
import SearchInput from "../SearchInput.vue";
import { describe, it, expect } from "vitest";

describe("SearchInput.vue", () => {
    it("renders input correctly", () => {
        const wrapper = mount(SearchInput);
        const input = wrapper.find("input");

        expect(input.exists()).toBe(true);
        expect(input.attributes("placeholder")).toBe("Filtre por ID, nome, modelo ou estado...");
    });

    it("emits updateSearch when input changes", async () => {
        const wrapper = mount(SearchInput);
        const input = wrapper.find("input");

        await input.setValue("Equipamento A, Equipamento B");

        expect(wrapper.emitted("updateSearch")).toBeTruthy();
        expect(wrapper.emitted("updateSearch")![0]).toEqual([["Equipamento A", "Equipamento B"]]);
    });

    it("trims whitespace and splits correctly", async () => {
        const wrapper = mount(SearchInput);
        const input = wrapper.find("input");

        await input.setValue("  Equipamento A ,  Equipamento B ");

        expect(wrapper.emitted("updateSearch")).toBeTruthy();
        expect(wrapper.emitted("updateSearch")![0]).toEqual([["Equipamento A", "Equipamento B"]]);
    });
});
