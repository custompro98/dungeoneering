import type { NextPage } from 'next'
import { useState } from 'react'
import { Die, d2, d4, d6, d8, d10, d20, d100 } from 'roller.ts'
import type { RollFunction } from 'roller.ts'

const diceMap: { [key: string]: RollFunction } = {
  2: d2,
  4: d4,
  6: d6,
  8: d8,
  10: d10,
  20: d20,
  100: d100,
}

const Home: NextPage = () => {
  const [dice, setDice] = useState([] as Die[])

  const onAddDie = (die: number) => () => {
    setDice([...dice, new Die(diceMap[die])])
  }

  return (
    <div className="bg-gray-800 text-slate-300 flex flex-row h-screen w-screen pb-4 pt-4">
      <div className="flex flex-col justify-between h-full w-fit">
        <button onClick={onAddDie(2)}>d2</button>
        <button onClick={onAddDie(4)}>d4</button>
        <button onClick={onAddDie(6)}>d6</button>
        <button onClick={onAddDie(8)}>d8</button>
        <button onClick={onAddDie(10)}>d10</button>
        <button onClick={onAddDie(20)}>d20</button>
        <button onClick={onAddDie(100)}>d100</button>
      </div>
      <div className="flex flex-row flex-wrap w-full max-w-lg mx-auto">
        {dice.map((die, idx) => (
          <div
            key={idx}
            className="flex flex-col basis-1/5 justify-center items-center border h-12 w-12"
          >
            {die.value()}
            <button className="text-xs">Reroll</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
