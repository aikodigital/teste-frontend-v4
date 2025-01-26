<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin w-full !rounded-3xl" :class="$q.dark.isActive && 'background'">
      <q-card-section class="bg-primary text-white">
        <h3 class="text-2xl font-bold">Tipos de Mapa</h3>
      </q-card-section>
      <q-separator />
      <q-card-section class="grid grid-col grid-cols-4 gap-5 w-full h-[250px] text-center relative">
        <div
          class="flex flex-col gap-3"
          v-for="item in ['dark', 'outdoors', 'night', 'streets']"
          :key="item"
        >
          <q-avatar class="w-[100px] h-[100px] cursor-pointer" @click="form.type = item">
            <q-img
              class="w-[100px] h-[100px]"
              :class="form?.type === item && 'img-type'"
              spinner-color="primary"
              :src="'src/assets/' + item + '.png'"
            />
          </q-avatar>
          <h4 class="font-extrabold text-xl capitalize">{{ item }}</h4>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="onCancelClick" rounded flat />
        <q-btn label="Confirm" color="primary" @click="onOKClick" rounded />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from 'vue'
import { useDialogPluginComponent } from 'quasar'
export default {
  name: 'MapTypeDialog',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  emits: [...useDialogPluginComponent.emits],
  setup(props) {
    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

    const form = ref(JSON.parse(JSON.stringify(props.data)))

    return {
      dialogRef,
      form,
      onDialogHide,
      onOKClick() {
        onDialogOK({ data: form.value })
      },
      onCancelClick: onDialogCancel,
    }
  },
}
</script>

<style lang="scss">
.img-type {
  border: 5px solid $primary;
  border-radius: 50%;
}

.img-hover {
  border: 5px solid $accent;
  border-radius: 50%;
}
</style>
