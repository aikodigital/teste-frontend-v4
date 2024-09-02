import { reactive } from 'vue';

const eventBus = reactive<Record<string, Function[]>>({});

export const useEventBus = () => {
  const on = (event: string, callback: Function) => {
    if (!eventBus[event]) {
      eventBus[event] = [];
    }
    eventBus[event].push(callback);
  };

  const off = (event: string, callback: Function) => {
    if (eventBus[event]) {
      eventBus[event] = eventBus[event].filter((cb) => cb !== callback);
    }
  };

  const emit = (event: string, ...args: any[]) => {
    if (eventBus[event]) {
      eventBus[event].forEach((callback) => callback(...args));
    }
  };

  return { on, off, emit };
};
