import type { NextPage } from 'next'
import { useState } from 'react'
import type { FormEventHandler } from 'react'

const odds: string[] = [
  'impossible',
  'no way',
  'very unlikely',
  'unlikely',
  '50/50',
  'somewhat likely',
  'likely',
  'very likely',
  'near sure thing',
  'a sure thing',
  'has to be',
]

// nested object representing a fate chart
// outer key is the chaos factor
// inner key are the odds
// value is the chance of a yes
const fateChart: Record<number, Record<string, number>> = {
  1: {
    [odds[0]]: -20,
    [odds[1]]: 0,
    [odds[2]]: 5,
    [odds[3]]: 5,
    [odds[4]]: 10,
    [odds[5]]: 20,
    [odds[6]]: 25,
    [odds[7]]: 45,
    [odds[8]]: 50,
    [odds[9]]: 55,
    [odds[10]]: 80,
  },
  5: {
    [odds[0]]: 5,
    [odds[1]]: 15,
    [odds[2]]: 25,
    [odds[3]]: 35,
    [odds[4]]: 50,
    [odds[5]]: 65,
    [odds[6]]: 75,
    [odds[7]]: 85,
    [odds[8]]: 90,
    [odds[9]]: 90,
    [odds[10]]: 95,
  },
}

const GameMasterEmulator: NextPage = () => {
  const defaultChaosFactor = 5
  const defaultCurrentOdds = 4
  const [chaosFactor, setChaosFactor] = useState(defaultChaosFactor)
  const [currentOdds, setCurrentOdds] = useState(odds[defaultCurrentOdds])
  const [chanceYes, setChanceYes] = useState(
    fateChart[defaultChaosFactor][odds[defaultCurrentOdds]]
  )

  const handleChaosChange: FormEventHandler<HTMLInputElement> = (e) => {
    const newChaosFactor = parseInt(e.currentTarget.value)

    if (!isNaN(newChaosFactor)) {
      setChaosFactor(newChaosFactor)
      setChanceYes(fateChart[newChaosFactor][currentOdds])
    }
  }

  const handleCurrentOddsChange: FormEventHandler<HTMLInputElement> = (e) => {
    const newOdds = e.currentTarget.value
    setCurrentOdds(newOdds)
    setChanceYes(fateChart[chaosFactor][newOdds])
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-center min-w-full">
        <input
          type="number"
          onChange={handleChaosChange}
          min={1}
          max={9}
          placeholder="Enter chaos factor..."
          className="relative flex-auto min-w-0 max-w-xs block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
        />
      </div>
      <div className="flex flex-row justify-center min-w-full">
        <input
          type="text"
          onChange={handleCurrentOddsChange}
          placeholder="Enter current odds..."
          className="relative flex-auto min-w-0 max-w-xs block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-700 focus:outline-none"
        />
      </div>
      <p>{chanceYes}</p>
    </div>
  )
}

export default GameMasterEmulator
