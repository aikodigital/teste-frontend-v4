import { cn } from '@/lib/utils'
import React from 'react'
import { Link } from 'react-router-dom'

interface HeaderProps extends React.HTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

const Header = React.forwardRef<HTMLTableElement, HeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <header
        ref={ref}
        {...props}
        className={cn(
          'absolute left-0 right-0 top-0 z-20 m-auto flex max-w-7xl flex-row items-center justify-between gap-3 p-4 py-4 text-white',
          className
        )}
      >
        <Link to='/'>
          <img src='../img/aiko.png' className='w-28 opacity-60' alt='aiko' />
        </Link>

        {children}
      </header>
    )
  }
)

export default Header
