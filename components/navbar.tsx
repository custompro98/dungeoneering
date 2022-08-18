import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between h-16 items-center">
      <h1 className="font-medium text-2xl leading-tight pl-8">
        <Link href="/">dungeoneeering</Link>
      </h1>
      <nav className="pr-8">
        <ul className="flex flex-row">
          <li className="pl-2">
            <Link href="/tray">Tray</Link>
          </li>
          <li className="pl-2">
            <Link href="/game-master-emulator">GME</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
