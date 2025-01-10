import { Preview } from '@storybook/vue3';
import { setup } from '@storybook/vue3';
import PrimeVue from 'primevue/config';

import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import '../src/assets/main.css';


const preview: Preview = {
  parameters: {
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
};

setup((app) => {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
});

export default preview;
