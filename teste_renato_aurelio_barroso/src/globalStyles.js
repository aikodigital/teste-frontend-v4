import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /* Cores definidas pela roda de cores, utilizando o azul do logo da Aiko como base */
    --light: #fdfdfd;
    --dark: #2f2f2f;
    --medium-grey: #7d7f7c;
    --aiko-blue: #003184;
    --comp-gold: #845300;
    --mono-blue: #0044b7;
    --analog-blue: #110084;
    --analog-green: #007384;
    --triad-red: #840031;
    --triad-red-2: #c00047;
    --triad-green: #318400;
    --tetra-purple: #840073;
    --tetra-green: #008411;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    span.material-symbols-rounded {
      display: block;
      -webkit-user-select: none; /* Safari */
      -ms-user-select: none; /* IE 10 and IE 11 */
      user-select: none; /* Standard syntax */
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
`;

export default GlobalStyle;
