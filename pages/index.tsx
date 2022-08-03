import type { NextPage } from 'next'
import Image from 'next/image'
import { FormEventHandler, useState } from 'react'
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

const Home: NextPage = () => {
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
    console.log(rollables.map((r) => r.value()))
    setDice(rollables.map(generateWrapper))
  }

  const handleChange: FormEventHandler<HTMLInputElement> = (e) => {
    setInput((e.target as HTMLInputElement).value)
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    handleParse(input)
    setInput('')
  }

  return (
    <div className="bg-gray-800 text-slate-300 flex flex-col w-screen h-full pb-4 pt-4 ">
      <div className="flex flex-row justify-between pl-4 pr-4">
        <Image
          src="/vercel.svg"
          alt="logo: placeholder"
          width="128"
          height="32"
        />

        <form onSubmit={handleFormSubmit} className="space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter dice pattern..."
            className="text-slate-700 rounded px-1"
          />
          <input type="submit" className="border rounded px-2" />
        </form>
      </div>
      <div className="flex flex-row h-screen w-screen pb-4 pt-4">
        <div className="flex flex-col justify-around w-fit">
          <button onClick={onAddDie(2)}>d2</button>
          <button onClick={onAddDie(4)}>d4</button>
          <button onClick={onAddDie(6)}>d6</button>
          <button onClick={onAddDie(8)}>d8</button>
          <button onClick={onAddDie(10)}>d10</button>
          <button onClick={onAddDie(20)}>d20</button>
          <button onClick={onAddDie(100)}>d100</button>
        </div>
        <div className="flex flex-row flex-wrap w-full max-w-lg mx-auto">
          {dice.map((die) => (
            <div key={die.id}>
              <Die rollable={die.rollable} onReroll={handleReroll} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
