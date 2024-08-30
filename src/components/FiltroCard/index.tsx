import * as S from './styles'

export type Props = {
  ativo?: boolean
  contador: number
  legenda: string
  onClick?: () => void
}

const FiltroCard = ({ ativo, contador, legenda, onClick }: Props) => (
  <S.Card ativo={ativo} onClick={onClick}>
    <S.Contador>{contador}</S.Contador>
    <S.Label>{legenda}</S.Label>
  </S.Card>
)

export default FiltroCard
