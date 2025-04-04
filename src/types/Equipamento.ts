export interface Posicao {
  data: Date
  latitude: number
  longitude: number
}

export interface Modelo {
  id: string
  nome: string
  ganhos: Ganho[]
}

export interface Estado {
  nome: string
  cor: string
}

export interface RegistroEstado {
  data: Date
  estado: Estado
}

export interface Ganho {
  estado: Estado
  valor: number
}

export interface Equipamento {
  id: string
  nome: string
  modelo: Modelo
  registros: RegistroEstado[]
  posicoes: Posicao[]
  exibirDetalhes?: boolean
  exibirNoMapaAoVivo?: boolean
}

export interface HorasPorStatus {
  [key: string]: number
}

export interface GanhosPorStatus {
  [key: string]: number
}
