import { computed, ref } from 'vue';

export type Entity = {
  id: string;
  name: string;
};

type EntityDict<T extends Entity> = Record<Entity['id'], Omit<T, 'id'>>;

export const useEntity = <T extends Entity>() => {
  const entityRes = ref<T[]>([]);

  const entityDict = computed<EntityDict<T>>(() =>
    entityRes.value.reduce((acc, { id, ...entity }) => ({ ...acc, [id]: entity }), {}),
  );

  const entityList = computed<Array<keyof EntityDict<T>>>(() => Object.keys(entityDict.value));

  const init = (list: T[]) => {
    entityRes.value = [...list];
  };

  const getEntity = (id: Entity['id']) => entityDict.value[id];

  return [init, getEntity, entityList] as const;
};
