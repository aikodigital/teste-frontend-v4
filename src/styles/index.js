import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
        font-family: "Roboto", sans-serif;
    }

    .container{
        max-width: 1024px;
        margin: 0 auto;
    }

`

export default GlobalStyle