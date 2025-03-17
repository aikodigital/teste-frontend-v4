import type moment from 'moment';

declare module '#app' {
	interface NuxtApp {
		$moment: typeof moment;
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$moment: typeof moment;
	}
}

export {};
