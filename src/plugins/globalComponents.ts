import type { App } from 'vue';
import Input from '@/components/Input.vue'
import Button from '@/components/Button.vue'
import Spinner from '@/components/Spinner.vue'
import Select from '@/components/Select.vue'

const GlobalComponents = {
  install(Vue: App) {
    Vue.component('base-input', Input);
    Vue.component('spinner', Spinner);
    Vue.component('base-button', Button);
    Vue.component('base-select', Select);
  }
};

export default GlobalComponents