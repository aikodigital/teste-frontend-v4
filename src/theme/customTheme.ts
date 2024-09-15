/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme } from "@mui/material/styles";

const DRAWER_WIDTH = 240;
const DRAWER_MINI_WIDTH = 56;

declare module "@mui/material/styles" {
  interface Theme {
    mixins: {
      openedMixin: (theme: Theme) => any;
      closedMixin: (theme: Theme) => any;
    };
  }
  interface ThemeOptions {
    mixins?: {
      openedMixin?: (theme: Theme) => any;
      closedMixin?: (theme: Theme) => any;
    };
  }
}

const customTheme = createTheme({
  mixins: {
    openedMixin: (theme) => ({
      width: DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: "hidden",
    }),
    closedMixin: (theme) => ({
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: DRAWER_MINI_WIDTH,
    }),
  },
});

export default customTheme;
