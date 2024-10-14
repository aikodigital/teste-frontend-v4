'use client'

import { useTheme } from 'next-themes'
import ReactSwitch from 'react-switch'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme()

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <ReactSwitch
      className="flex items-center justify-center shadow-shadowlight dark:shadow-shadowdark "
      aria-label="Tema light ou dark"
      onChange={changeTheme}
      checked={theme === 'light'}
      checkedIcon={
        <BsFillMoonFill color="#6D28D9" fontSize="28" className="p-[4px]" />
      }
      uncheckedIcon={
        <BsFillSunFill color="yellow" fontSize="28" className="p-[4px]" />
      }
      onColor={'#E4E4E7'}
      offColor={'#262626'}
      onHandleColor={'#10B981'}
      offHandleColor={'#10B981'}
      activeBoxShadow={'0 0 1px 2px #70a1e0'}
    />
  )
}
