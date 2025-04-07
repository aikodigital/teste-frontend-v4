import ModeToggle from './mode-toggle';
import React from 'react';

const url = import.meta.env.VITE_JSON_URL;

const Header: React.FC = () => {
  return (
    <header className="flex w-full bg-popover text-foreground items-center border-b border-border">
      <div className="flex justify-between max-w-[90%] w-full items-center mx-auto py-3 px-4">
        <div className="flex gap-4 items-center">
          <img
            src={`${url}/img/aiko.png`}
            alt="logo"
            className="w-12 sm:w-16"
          />
        </div>
        <nav className="hidden md:flex gap-6">
          <ModeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
