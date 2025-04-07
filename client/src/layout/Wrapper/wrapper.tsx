import React, { ReactNode } from 'react';
import './wrapper.css'

type WrapperProps = {
    children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div id="wrapper">
        { children }
    </div>
  )
}

export default Wrapper