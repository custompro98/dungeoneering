import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import type { ChangeEventHandler, FormEventHandler } from 'react'

import { ChaosFactor, fateChart, Odds, oddsMap } from 'mythic-gme.ts'
import { d100 } from 'roller.ts'

import Input, { InputType, Width as InputWidth } from '../components/input'
import Select, { Width as SelectWidth } from '../components/select'

enum FATE {
  NONE,
  EXTREME_YES,
  YES,
  NO,
  EXTREME_NO,
}

const GameMasterEmulator: NextPage = () => {
  const defaultChaosFactor = ChaosFactor.Five
  const defaultCurrentOdds = Odds.FiftyFifty

  const chosenFate = 'text-amber-300 p-4'

  const [fate, setFate] = useState(FATE.NONE)
  const [chaosFactor, setChaosFactor] = useState(defaultChaosFactor)
  const [currentOdds, setCurrentOdds] = useState(defaultCurrentOdds)
  const [chances, setChances] = useState(
    fateChart[defaultChaosFactor][defaultCurrentOdds]
  )

  const [chanceExtremeYes, chanceYes, chanceExtremeNo] = chances

  useEffect(() => {
    const roll = d100();

    console.info(roll);

    if (roll <= chanceExtremeYes) {
      setFate(FATE.EXTREME_YES)
    } else if (roll <= chanceYes) {
      setFate(FATE.YES)
    } else if (chanceExtremeNo > 0 && roll >= chanceExtremeNo) {
      setFate(FATE.EXTREME_NO)
    } else {
      setFate(FATE.NO)
    }
  }, [chanceExtremeYes, chanceYes, chanceExtremeNo])

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
      <div className="flex flex-col justify-center place-items-center p-4">
        <div className={fate === FATE.EXTREME_YES ? chosenFate : 'p-4'}>
          <span className="font-bold">Extreme Yes ({chanceExtremeYes})</span>
        </div>
        <div className={fate === FATE.YES ? chosenFate : 'p-4'}>
          <span className="font-bold">Yes ({chanceYes})</span>
        </div>
        <div className={fate === FATE.NO ? chosenFate : 'p-4'}>
          <span className="font-bold">No ({chanceYes})</span>
        </div>
        <div className={fate === FATE.EXTREME_NO ? chosenFate : 'p-4'}>
          <span className="font-bold">Extreme No ({chanceExtremeNo})</span>
        </div>
      </div>
    </div>
  )
}

export default GameMasterEmulator
