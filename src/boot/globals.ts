import { boot } from 'quasar/wrappers';
import { StateEquipments, EquipmentModel, DatePicker } from '../components';

export default boot(({ app }) => {
  app.component('c-state-equipment', StateEquipments),
  app.component('c-model-equipment', EquipmentModel),
  app.component('c-date-picker', DatePicker)
});
