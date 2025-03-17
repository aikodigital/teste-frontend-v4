<script lang="ts" setup>
// Types
import type { IProps } from './table.model';

// Composables
defineProps<IProps>();
</script>

<template>
	<!-- Table -->
	<section class="h-fit w-full overflow-y-auto">
		<table class="w-full border-collapse">
			<thead>
				<tr class="bg-gray-200">
					<th
						v-for="(column, colIndex) in headers"
						:key="colIndex"
						class="whitespace-nowrap p-6 text-left font-semibold text-gray-800 first:rounded-l-lg last:rounded-r-lg"
					>
						<slot :name="`column-${column.name}`">
							{{ column.label }}
						</slot>
					</th>
				</tr>
			</thead>
			<TransitionGroup
				name="fade-table"
				tag="tbody"
				class="divide-y-gray-100 divide-y"
				mode="out-in"
				appear
			>
				<tr
					v-for="(row, rowIndex) in data"
					:key="rowIndex"
					class="rounded-lg hover:bg-grey-50 transition-all duration-150"
				>
					<td
						v-for="(column, colIndex) in headers"
						:key="colIndex"
						class="whitespace-nowrap p-6 text-[15px] font-normal text-grey-700"
					>
						<slot
							:name="column.name"
							:row="row"
							:value="row[column.name]"
						>
							{{ row[column.name] }}
						</slot>
					</td>
				</tr>
			</TransitionGroup>
		</table>
	</section>
</template>
