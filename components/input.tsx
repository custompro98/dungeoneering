import React from 'react'

enum InputType {
  Text = 0,
  Number = 1,
}

const typeMap = {
  [InputType.Text]: 'text',
  [InputType.Number]: 'number',
}

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

type InputProps = {
  type: InputType
  value?: string
  width: Width
  placeholder: string
  min?: number
  max?: number
  onChange?: React.FormEventHandler<HTMLInputElement>
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

type ButtonProps = {
  text: string
  onClick: React.FormEventHandler<HTMLButtonElement>
}

type Props = {
  input: InputProps
  button?: ButtonProps
}

const Input = ({ input, button }: Props) => {
  const isEmpty = (s: string) => s.length === 0

  const inputClasses: string[] = [
    'relative',
    'flex-auto',
    'min-w-0',
    `max-w-${widthMap[input.width]}`,
    'block',
    'px-3',
    'py-1.5',
    'text-base',
    'font-normal',
    'text-gray-700',
    'bg-white',
    'bg-clip-padding',
    'border',
    'border-solid',
    'border-gray-300',
    'rounded',
    button ? 'rounded-r-none' : '',
    'transition',
    'ease-in-out',
    'm-0',
    'focus:text-gray-700',
    'focus:bg-white',
    'focus:border-gray-700',
    'focus:outline-none',
  ].filter((c) => !isEmpty(c))

  const buttonClasses: string[] = [
    'px-6',
    'py-2.5',
    'bg-gray-500',
    'text-white',
    'font-medium',
    'text-xs',
    'leading-tight',
    'uppercase',
    'rounded',
    'rounded-l-none',
    'shadow-md',
    'hover:bg-gray-600',
    'hover:shadow-lg',
    'focus:bg-gray-700',
    'focus:shadow-lg',
    'focus:outline-none',
    'focus:ring-0',
    'active:bg-gray-800',
    'active:shadow-lg',
    'transition',
    'duration-150',
    'ease-in-out',
    'flex',
    'items-center',
    'border',
    'border-solid',
    'border-gray-300',
    'border-l-0',
  ].filter((c) => !isEmpty(c))

  return (
    <>
      <input
        type={typeMap[input.type]}
        value={input.value}
        placeholder={input.placeholder}
        onChange={input.onChange}
        onKeyPress={input.onKeyPress}
        min={input.min}
        max={input.max}
        className={inputClasses.join(' ')}
      />
      {button && (
        <button className={buttonClasses.join(' ')} onClick={button.onClick}>
          {button.text}
        </button>
      )}
    </>
  )
}

export default Input
export { InputType, Width }
