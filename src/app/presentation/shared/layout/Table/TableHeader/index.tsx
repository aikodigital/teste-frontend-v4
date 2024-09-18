import Search from '../../Search'
import * as S from './styled'

export default function TableHeader() {
  return (
    <S.TableHeader>
      <S.Title>Painel de gerenciamento</S.Title>
      <S.SearchContainer>
        <Search />
      </S.SearchContainer>
    </S.TableHeader>
  )
}
