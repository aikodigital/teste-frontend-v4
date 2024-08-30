import { STATE } from '~/constants/state'

export function getStateName(state: string): string {
  switch (state) {
    case STATE.OPERATING:
      return 'Operando'
    case STATE.STOPPED:
      return 'Parado'
    case STATE.MAINTENANCE:
      return 'Manutenção'
    default:
      return 'Desconhecido'
  }
}

export function getStateColor(state: string): string {
  switch (state) {
    case STATE.OPERATING:
      return 'bg-operating'
    case STATE.STOPPED:
      return 'bg-stopped'
    case STATE.MAINTENANCE:
      return 'bg-maintenance'
    default:
      return 'bg-slate-300'
  }
}
