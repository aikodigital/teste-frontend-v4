export type FilterKeys = 'Nome do equipamento' | 'Modelo' | 'Último status'

export type Filtro = {
  [key in FilterKeys]: string
}
