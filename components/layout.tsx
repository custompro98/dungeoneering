import React from 'react'

import Navbar from './navbar'
import Footer from './footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex flex-col justify-between h-screen bg-gray-800 text-slate-200'>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
