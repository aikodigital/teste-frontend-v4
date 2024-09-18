'use client'

import styled from 'styled-components'

export const Input = styled.input`
  padding: 1rem;
  border: 2px solid #b3b2b8;
  position: relative;
  border-radius: 1rem 0rem 0rem 1rem;

  &::placeholder {
    color: #b3b2b8;
    font-size: 1.5rem;
    font-weight: bold;
  }
`
export const Button = styled.button`
  background-color: #003184;
  padding: 0.75rem;
  border: 1px solid #e1e1e1;
  cursor: pointer;
  border-radius: 0rem 1rem 1rem 0rem;
  position: absolute;
  margin-left: -1rem;
  margin-top: -0.1rem;
  &:hover {
    filter: brightness(0.8);
  }
`
export const InputSearch = styled.div`
  display: block;
`
