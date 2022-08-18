import React from 'react'

import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col justify-between h-screen w-screen bg-gray-800 text-slate-200'>
      <Navbar />
      <main className="flex flex-row justify-center h-full w-full">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
