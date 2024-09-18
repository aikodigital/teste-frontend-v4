'use client'

import styled, { keyframes } from 'styled-components'

const bounce = keyframes`
  from {
    transform: translate(0, 20px);
  }
  to {
    transform: translate(0, 0);
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  img {
    animation: ${bounce} 1s ease infinite alternate;
  }
`

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`
