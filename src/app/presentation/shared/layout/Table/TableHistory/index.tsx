import * as S from './styled'

interface EquipmentProps {
  equipment: {
    equipmentId: string
    states: {
      activeState: string
      date: string
    }[]
  }[]
}

export default function TableHistory({ equipment }: EquipmentProps) {
  return (
    <S.Table>
      <S.Head>
        <S.RowHeader>
          <S.ActionColumnTH>Data</S.ActionColumnTH>
          <S.Header></S.Header>
          <S.Header></S.Header>
          <S.Header></S.Header>
          <S.ActionColumnTH className="action-column">Estado</S.ActionColumnTH>
        </S.RowHeader>
      </S.Head>
      <S.TableBody>
        {equipment.map(e =>
          e.states
            .slice()
            .reverse()
            .map((state, index) => (
              <S.Row key={`${e.equipmentId}-${index}`}>
                <S.Data>{new Date(state.date).toLocaleDateString()}</S.Data>
                <S.Data>
                  <S.Tag $status={state.activeState}>{state.activeState}</S.Tag>
                </S.Data>
              </S.Row>
            ))
        )}
      </S.TableBody>
    </S.Table>
  )
}
