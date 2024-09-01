import { onBeforeUnmount, onMounted, Ref, ref } from "vue";

export function useLoader<T>(cb: () => Promise<T>): [Ref<boolean>, () => Promise<T>] {
  const isLoading = ref(false);

  const cbWithLoader = async () => {
    try {
      isLoading.value = true;
      return await cb();
    } finally {
      isLoading.value = false;
    }
  }

  return [isLoading, cbWithLoader];
}

export function useIsMounted(): Ref<boolean> {

  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  });

  onBeforeUnmount(() => {
    isMounted.value = false;
  });

  return isMounted;
}