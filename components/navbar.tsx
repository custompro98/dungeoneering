import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between h-16 items-center">
      <h1 className="font-medium text-2xl leading-tight pl-8">
        <Link href="/">dungeoneeering</Link>
      </h1>
      <nav className="flex flex-row justify-evenly pr-8">
        <ul>
          <li>
            <Link href="/tray">Tray</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
