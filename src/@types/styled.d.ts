import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      light: string;
      default: string;
      dark: string;
    };

    secondary: {
      light: string;
      default: string;
      dark: string;
    };

    neutral: {
      light: string;
      default: string;
      dark: string;
    };

    background: {
      light: string;
      neutral: string;
      blue: string;
    };

    text: {
      darkBlue: string;
      lightBlue: string;
      base: string;
      baseLight: string;
      white: string;
    };
  }
}
