enum State {
  Operando = '0808344c-454b-4c36-89e8-d7687e692d57',
  Parado = 'baff9783-84e8-4e01-874b-6fd743b875ad',
  Manutencao = '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f'
}

export default {
  [State.Operando]: {
    'id': '0808344c-454b-4c36-89e8-d7687e692d57',
    'name': 'Operando',
    'color': '#2ecc71'
  },
  [State.Parado]: {
    'id': 'baff9783-84e8-4e01-874b-6fd743b875ad',
    'name': 'Parado',
    'color': '#f1c40f'
  },
  [State.Manutencao]: {
    'id': '03b2d446-e3ba-4c82-8dc2-a5611fea6e1f',
    'name': 'Manutenção',
    'color': '#e74c3c'
  }
}