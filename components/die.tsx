import React from 'react'
import { useState } from 'react'

import { Die as Rollable } from 'roller.ts'

type Props = {
  rollable: Rollable
  onReroll: (r: Rollable) => void
}

const Die = ({ rollable, onReroll }: Props) => {
  const [roller, _] = useState(rollable)
  const [result, setResult] = useState(rollable.value())

  const handleClick = () => {
    onReroll(roller)
    setResult(roller.value())
  }

  const canReroll = roller.reroll !== undefined

  return (
    <div className="flex flex-col items-center justify-center border h-12 w-12">
      {result}
      {canReroll && (
        <button onClick={handleClick} className="hover:bg-gray-600 text-xs">
          Reroll
        </button>
      )}
    </div>
  )
}

export default Die
