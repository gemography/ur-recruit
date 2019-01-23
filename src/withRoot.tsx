import { createMuiTheme, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import * as React from 'react';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "hsl(0, 0%, 69%)",
      main: "hsl(0, 0%, 32%)",
      dark: "hsl(0, 0%, 13%)"
    }
  },
  typography: {
    useNextVariants: true,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  }
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
