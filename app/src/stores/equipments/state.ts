import { defineStore } from 'pinia';
import { useEntity, type Entity } from '@/composables/useEntity';

export type State = Entity & {
  color: string;
};

export const useStateStore = defineStore('state', () => {
  const [initStates, getState] = useEntity<State>();

  return { initStates, getState };
});
