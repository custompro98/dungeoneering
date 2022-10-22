import React from 'react'
import type { ChangeEventHandler } from 'react'

enum Width {
  XSmall = 0,
  Small = 1,
  Medium = 2,
  Large = 3,
  XLarge = 4,
  XXLarge = 5,
  XXXLarge = 6,
  Full = 7,
}

const widthMap = {
  [Width.XSmall]: 'xs',
  [Width.Small]: 'sm',
  [Width.Medium]: 'md',
  [Width.Large]: 'lg',
  [Width.XLarge]: 'xl',
  [Width.XXLarge]: '2xl',
  [Width.XXXLarge]: '3xl',
  [Width.Full]: 'full',
}

type Option = {
  value: string | number
  name: string
}

type Props = {
  name: string
  options: Option[]
  selected?: Option
  width: Width
  onChange: ChangeEventHandler<HTMLSelectElement>
}

const Select = (props: Props) => {
  const classes = [
    'form-select',
    'appearance-none',
    'block',
    'w-full',
    'px-3',
    'py-1.5',
    'text-base',
    'font-normal',
    'text-gray-700',
    'bg-white',
    'bg-clip-padding',
    'bg-no-repeat',
    'border',
    'border-solid',
    'border-gray-300',
    'rounded',
    'transition',
    'ease-in-out',
    'm-0',
    'focus:text-gray-700',
    'focus:bg-white',
    'focus:border-blue-600',
    'focus:outline-none',
    `max-w-${widthMap[props.width]}`,
  ]

  return (
    <select
      name={props.name}
      className={classes.join(' ')}
      onChange={props.onChange}
    >
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={props.selected && option.value === props.selected.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select
export { Width }
export type { Option }
