interface ITooltipContent {
    equipmentId: string
}

export default function TooltipContent({ equipmentId }: ITooltipContent): JSX.Element {
    return <>{equipmentId}</>

}