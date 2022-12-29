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
  const [chances, setChances] = useState(
    fateChart[defaultChaosFactor][defaultCurrentOdds]
  )

  const [chanceExtremeYes, chanceYes, chanceExtremeNo] = chances

  const handleChaosChange: FormEventHandler<HTMLInputElement> = (e) => {
    const newChaosFactor = parseInt(e.currentTarget.value) as ChaosFactor

    if (!isNaN(newChaosFactor)) {
      setChaosFactor(newChaosFactor)
      setChances(fateChart[newChaosFactor][currentOdds])
    }
  }

  const handleCurrentOddsChange: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    const newOdds = parseInt(e.currentTarget.value) as Odds
    setCurrentOdds(newOdds)
    setChances(fateChart[chaosFactor][newOdds])
  }

  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="p-4">
        <Input
          input={{
            type: InputType.Number,
            min: 1,
            max: 9,
            placeholder: 'Enter chaos factor...',
            width: InputWidth.XSmall,
            value: `${chaosFactor}`,
            onChange: handleChaosChange,
          }}
        />
      </div>
      <div className="p-4">
        <Select
          name="current-odds"
          options={Object.keys(Odds)
            .map((odds) => parseInt(odds) as Odds)
            .filter((odds) => Odds[odds] !== undefined)
            .reverse()
            .map((odds) => ({ value: odds, name: oddsMap[odds] }))}
          width={SelectWidth.XSmall}
          selected={{ value: currentOdds, name: oddsMap[currentOdds] }}
          onChange={handleCurrentOddsChange}
        />
      </div>
      <div className="flex flex-col justify-center self-center p-4">
        <div>
          <span className='font-bold'>Extreme Yes: </span>
          <span>{chanceExtremeYes}%</span>
        </div>
        <div>
          <span className='font-bold'>Yes: </span>
          <span>{chanceYes}%</span>
        </div>
        <div>
          <span className='font-bold'>Extreme No: </span>
          <span>{chanceExtremeNo}%</span>
        </div>
      </div>
    </div>
  )
}

export default GameMasterEmulator
