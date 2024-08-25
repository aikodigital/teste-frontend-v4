interface IPopupContent {
    equipmentId: string
}

export default function PopupContent({ equipmentId }: IPopupContent) {
    return <>{equipmentId}</>
}