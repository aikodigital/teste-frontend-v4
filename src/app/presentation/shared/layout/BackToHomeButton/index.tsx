import { CaretLeft } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

import * as S from './styled'

export default function BackToHomeButton() {
  return (
    <S.Container>
      <Link href={'/'}>
        <CaretLeft size={32} color="#003184" />
      </Link>
      <h1>Início</h1>
    </S.Container>
  )
}
