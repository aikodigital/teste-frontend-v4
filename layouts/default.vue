<script lang="ts" setup>
const { filteredEquipments, equipmentModels, filterEquipments, loadEquipments } = useEquipments()

const { states } = useGetStates()

const search = ref({
  equipmentName: '',
  state: '',
  equipmentId: '',
})

function handleClickCard(id: string) {
  search.value.equipmentId = id
}

const isSheetOpen = ref(false)

watch(search, () => {
  filterEquipments(search.value)
  isSheetOpen.value = false
}, { deep: true })

onMounted(() => {
  loadEquipments()
})
</script>

<template>
  <div class="relative grid size-full grid-cols-1 lg:grid-cols-[minmax(500px,30%)_1fr]">
    <div class="z-50 hidden size-full flex-col gap-6 overflow-y-hidden border-r bg-background p-4 lg:flex">
      <AsideHeader />
      <AsideControls v-model="search" :models="equipmentModels" :states="states" />
      <Separator />
      <AsideCardGroup :equipments="filteredEquipments" :states="states" @card-clicked="handleClickCard" />
    </div>
    <div class="z-40 size-full">
      <slot />
    </div>
    <Sheet v-model:open="isSheetOpen">
      <SheetTrigger class="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 transform lg:hidden" as-child>
        <Button>
          Abrir menu
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left" class="mx-auto flex h-auto w-full max-w-lg flex-col gap-5"
      >
        <SheetHeader>
          <SheetTitle>
            <AsideHeader />
          </SheetTitle>
        </SheetHeader>
        <AsideControls v-model="search" :models="equipmentModels" :states="states" />
        <Separator />
        <AsideCardGroup :equipments="filteredEquipments" :states="states" @card-clicked="handleClickCard" />
      </SheetContent>
    </Sheet>
  </div>
</template>
