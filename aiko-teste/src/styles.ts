import { createGlobalStyle } from "styled-components";

export const colors = {
    darkgreen: '#1a5319',
    green: '#508d4e',
    lightgreen: '#80af81',
    verylightgreen: '#d6efd8',
}

export const GlobalCss = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: Roboto, sans-serif
    }

    body {
        background-color: ${colors.verylightgreen};
    }
`