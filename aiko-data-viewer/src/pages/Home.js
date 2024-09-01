import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'
import { Navbar } from '../components/Navbar'
import { useState } from 'react'

import s from './Home.module.css'

export function Home() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={s.home}>
      <Header isOpen={isOpen} toggleMenu={toggleMenu} />
      <Navbar isOpen={isOpen} toggleMenu={setIsOpen} />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
