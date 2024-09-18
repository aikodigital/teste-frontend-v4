// src/stores/index.js

import { createPinia } from "pinia";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import { store } from "quasar/wrappers";
/// import resetStore from './plugins/resetStore'

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)
  const installPersistedStatePlugin = createPersistedStatePlugin();
  pinia.use((context) => installPersistedStatePlugin(context));
  // pinia.use(resetStore)
  return pinia;
});
