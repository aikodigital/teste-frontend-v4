import Image from 'next/image'

import * as S from './styled'

export default function Header() {
  return (
    <S.Container>
      <Image src={'/images/aiko.png'} alt="" width={122} height={62} />
    </S.Container>
  )
}
