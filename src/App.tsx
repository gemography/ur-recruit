import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

import Workflow from './scenes/Workflow';
import withRoot from './withRoot'

export interface Props extends WithStyles<typeof styles> {}

class App extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <Workflow>
      </Workflow>
    );
  }
}

const styles = () => createStyles({});

export default withRoot(withStyles(styles)(App));
