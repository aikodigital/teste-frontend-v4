<script lang="ts" setup>
// Types
import type { IProps } from './slideover.schema';

// Composables
const model = defineModel({ type: Boolean, default: false });
const emit = defineEmits(['close']);
defineProps<IProps>();

// Functions
function onClose() {
	emit('close');
	model.value = false;
}
</script>

<template>
	<transition
		name="fade"
		mode="out-in"
		appear
	>
		<teleport
			v-if="model"
			to="body"
		>
			<aside
				class="absolute flex flex-col right-0 top-0 size-full lg:max-w-[50vw] z-99999999 bg-white shadow border-l border-l-gray-200"
			>
				<header
					class="flex items-center justify-between px-4 py-5 border-b border-gray-200"
				>
					<section class="flex flex-col gap-1">
						<p class="font-semibold text-gray-800 text-lg">
							{{ title }}
						</p>
						<p
							v-if="subtitle"
							class="font-normal text-sm text-gray-500"
						>
							{{ subtitle }}
						</p>
					</section>
					<Icon
						name="streamline:delete-1-solid"
						class="cursor-pointer"
						@click="onClose"
					/>
				</header>
				<section class="px-4 py-5 h-full overflow-y-auto">
					<slot />
				</section>
				<footer
					v-if="$slots.footer"
					class="px-4 py-5 border-t border-gray-200 sticky bottom-0 w-full h-fit"
				>
					<slot name="footer" />
				</footer>
			</aside>
		</teleport>
	</transition>
</template>
