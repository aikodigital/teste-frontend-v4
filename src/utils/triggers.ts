import { Notify } from 'quasar';

export const triggerSuccess = (msg: string) => {
  Notify.create({
    type: 'positive',
    message: msg || 'Sucesso',
  });
};

export const triggerNegative = (error: string) => {
  Notify.create({
    type: 'negative',
    message: error,
  });
};

export const triggerWarning = (msg: string) => {
  Notify.create({
    type: 'warning',
    message: msg,
  });
};

export const triggerInfo = (msg: string) => {
  Notify.create({
    type: 'info',
    message: msg,
  });
};
