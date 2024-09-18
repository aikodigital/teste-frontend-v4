'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1rem;
    background-color:#FFFF ;
    color: #151619 ;
    width: 100vw;
    height: 100%;
    text-rendering: optimizelegibility;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  html, body {
    height: auto;
  }

  @media (max-width: 720px) {
    html {
      font-size: 50%;
    }
  }

  @media (max-width: 430px) {
    html {
      font-size: 43,75%;
    }
  }

`
