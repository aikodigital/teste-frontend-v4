import clsx from 'clsx'
import Select from 'react-select'

const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded bg-gray-500 text-gray-900 z-10',
  focus: 'bg-gray-800 active:bg-gray-900 hover:bg-blue-100',
  selected:
    "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500 font-bold"
}
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-300 rounded-sm'
const controlStyles = {
  base: 'border rounded-lg bg-gray-900 hover:cursor-pointer ',
  focus: 'border-primary-600 ring-1  bg-gray-900 ring-primary-500',
  nonFocus: 'border-gray-300  bg-gray-900 hover:bg-gray-200'
}

const placeholderStyles = 'text-gray-900 pl-1 py-0.5 '
const selectInputStyles = 'pl-1 py-0.5 text-black-500 fonte-bold'
const singleValueStyles = 'leading-7 ml-1 text-gray-900 font-semibold font-mono'

const clearIndicatorStyles =
  'text-gray-900 p-1 rounded-md hover:bg-gray-200 hover:text-red-800'
const indicatorSeparatorStyles = 'bg-gray-100'
const dropdownIndicatorStyles =
  'p-1 hover:bg-gray-100 text-gray-500 rounded-md '
const menuStyles =
  'p-1 mt-2 border border-gray-200 rounded-lg bg-gray-900 text-gray-900 font-semibold font-mono'
const groupHeadingStyles =
  'ml-3 mt-2 mb-1 text-gray-500 text-md font-bold bg-gray-100'

export default function SelectComponent({ ...props }) {
  return (
    <>
      <Select
        isClearable={true}
        styles={{
          input: base => ({
            ...base,
            'input:focus': {
              boxShadow: 'none'
            }
          })
        }}
        classNames={{
          control: ({ isFocused }) =>
            clsx(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),

          option: ({ isFocused, isSelected }) =>
            clsx(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,

          singleValue: () => singleValueStyles,

          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles
        }}
        {...props}
      />
    </>
  )
}
