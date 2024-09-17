export interface list {
  value: string
  label: string
}

export interface InputSelectWhiteProps {
  placeholder: string
  selected: string
  list: list[]
  onValueChange: (value: string) => void
}
