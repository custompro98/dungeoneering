import type { NextPage } from 'next'
import { useState } from 'react'
import type { ChangeEventHandler, FormEventHandler } from 'react'

import Input, { InputType, Width as InputWidth } from '../components/input'
import Select, { Width as SelectWidth } from '../components/select'

import { ChaosFactor, fateChart, Odds, oddsMap } from '../utils/fate-chart'

const GameMasterEmulator: NextPage = () => {
  const defaultChaosFactor = ChaosFactor.Five
  const defaultCurrentOdds = Odds.FiftyFifty

  const [chaosFactor, setChaosFactor] = useState(defaultChaosFactor)
  const [currentOdds, setCurrentOdds] = useState(defaultCurrentOdds)
  const [chanceYes, setChanceYes] = useState(
    fateChart[defaultChaosFactor][defaultCurrentOdds]
  )

  const handleChaosChange: FormEventHandler<HTMLInputElement> = (e) => {
    const newChaosFactor = parseInt(e.currentTarget.value) as ChaosFactor

    if (!isNaN(newChaosFactor)) {
      setChaosFactor(newChaosFactor)
      setChanceYes(fateChart[newChaosFactor][currentOdds])
    }
  }

  const handleCurrentOddsChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newOdds = parseInt(e.currentTarget.value) as Odds
    setCurrentOdds(newOdds)
    setChanceYes(fateChart[chaosFactor][newOdds])
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row justify-center min-w-full">
        <Input
          input={{
            type: InputType.Number,
            min: 1,
            max: 9,
            placeholder: 'Enter chaos factor...',
            width: InputWidth.XSmall,
            onChange: handleChaosChange,
          }}
        />
      </div>
      <div className="flex flex-row justify-center min-w-full">
        <Select
          name="current-odds"
          options={
            Object.keys(Odds)
              .map(odds => parseInt(odds) as Odds)
              .filter(odds => Odds[odds] !== undefined)
              .map(odds => ({ value: odds, name: oddsMap[odds]}))
          }
          width={SelectWidth.XSmall}
          onChange={handleCurrentOddsChange}
        />
      </div>
      <p>{chanceYes}</p>
    </div>
  )
}

export default GameMasterEmulator
