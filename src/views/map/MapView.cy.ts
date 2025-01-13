import { createApp } from 'vue';
import MapView from './MapView.vue'
import { createPinia } from 'pinia';

describe('<MapView />', () => {

  before(() => {
    const app = createApp();
    app.use(createPinia());
  });

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(MapView)
  })
})
  