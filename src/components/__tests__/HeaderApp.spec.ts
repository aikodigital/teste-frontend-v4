import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import HeaderApp from '@/components/HeaderApp.vue';
import SearchInput from '@/components/SearchInput.vue';

describe('HeaderApp', () => {
    it('renders the logo and header text', () => {
        const wrapper = mount(HeaderApp);
        const logo = wrapper.find('img');
        const headerText = wrapper.find('h1');

        expect(logo.exists()).toBe(true);
        expect(logo.attributes('src')).toContain('aiko.png');
        expect(headerText.text()).toBe('Localizador de Equipamentos');
    });

    it('renders the SearchInput component', () => {
        const wrapper = mount(HeaderApp);
        const searchInput = wrapper.findComponent(SearchInput);
        expect(searchInput.exists()).toBe(true);
    });

    it('emits updateSearch when SearchInput emits updateSearch', () => {
        const wrapper = mount(HeaderApp);
        const searchInput = wrapper.findComponent(SearchInput);

        searchInput.vm.$emit('updateSearch', 'search term');

        const emittedEvents = wrapper.emitted('updateSearch');

        expect(emittedEvents).toBeTruthy();
        expect(emittedEvents![0]).toEqual(['search term']);
    });
});
