import moment from 'moment';
import 'moment/locale/pt-br';

moment.locale('pt-br');

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.provide('moment', moment);
});
