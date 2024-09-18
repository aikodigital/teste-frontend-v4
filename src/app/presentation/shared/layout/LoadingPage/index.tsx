import Image from 'next/image'

import * as S from './styled'

export default function LoadingPage() {
  return (
    <S.LoadingContainer>
      <Image src={'/images/aiko.png'} alt="" width={120} height={60} />
      <S.Title>Carregando...</S.Title>
    </S.LoadingContainer>
  )
}
