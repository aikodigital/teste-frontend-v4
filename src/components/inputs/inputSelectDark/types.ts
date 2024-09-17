export interface list {
  value: string
  label: string
}

export interface InputSelectDarkProps {
  placeholder: string
  selected: string
  list: list[]
  onValueChange: (value: string) => void
}
