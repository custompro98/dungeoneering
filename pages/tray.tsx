import type { NextPage } from 'next'

import { useState } from 'react'
import type { FormEventHandler, KeyboardEvent } from 'react'
import {
  Die as Rollable,
  d2,
  d4,
  d6,
  d8,
  d10,
  d20,
  d100,
  parse,
} from 'roller.ts'
import type { RollFunction } from 'roller.ts'
import { v4 as uuidv4 } from 'uuid'

import Die from '../components/die'

const diceMap: { [key: string]: RollFunction } = {
  2: d2,
  4: d4,
  6: d6,
  8: d8,
  10: d10,
  20: d20,
  100: d100,
}

type RollableWrapper = {
  rollable: Rollable
  id: string
}

const Tray: NextPage = () => {
  const [dice, setDice] = useState([] as RollableWrapper[])
  const [input, setInput] = useState('')

  const generateWrapper = (rollable: Rollable): RollableWrapper => {
    return {
      id: uuidv4(),
      rollable,
    }
  }

  const onAddDie = (die: number) => () => {
    setDice([...dice, generateWrapper(new Rollable(diceMap[die]))])
  }

  const handleReroll = (rollable: Rollable) => {
    rollable.reroll()
  }

  const handleParse = (input: string) => {
    setDice([])

    const rollables = parse(input) as Rollable[]
    setDice(rollables.map(generateWrapper))
    setInput('')
  }

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const handleClick: FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    handleParse(input)
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleParse(input)
    }
  }

  return (
    <div className="flex flex-row justify-between w-full mx-16">
      <div>
        <ul className="flex flex-col justify-around h-full w-16">
          <li>
            <button onClick={onAddDie(2)}>d2</button>
          </li>
          <li>
            <button onClick={onAddDie(4)}>d4</button>
          </li>
          <li>
            <button onClick={onAddDie(6)}>d6</button>
          </li>
          <li>
            <button onClick={onAddDie(8)}>d8</button>
          </li>
          <li>
            <button onClick={onAddDie(10)}>d10</button>
          </li>
          <li>
            <button onClick={onAddDie(20)}>d20</button>
          </li>
          <li>
            <button onClick={onAddDie(100)}>d100</button>
          </li>
        </ul>
      </div>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row justify-center min-w-full">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter dice pattern..."
            className="relative flex-auto min-w-0 max-w-xl block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded rounded-r-none transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
          />
          <button
            className="px-6 py-2.5 bg-gray-500 text-white font-medium text-xs leading-tight uppercase rounded rounded-l-none shadow-md hover:bg-gray-600 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out flex items-center border border-solid border-gray-300 border-l-0"
            onClick={handleClick}
          >
            Roll
          </button>
        </div>
        <div className="flex flex-row flex-wrap h-fit min min-w-full mt-8">
          {dice.map((die) => (
            <div className="m-2" key={die.id}>
              <Die rollable={die.rollable} onReroll={handleReroll} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tray
