<template>
	<main class="size-full relative flex flex-col">
		<header class="flex items-center justify-between gap-3 p-3 z-999999">
			<Searcher />
			<Filters />
		</header>
		<ClientOnly>
			<Map />
		</ClientOnly>
	</main>
</template>
