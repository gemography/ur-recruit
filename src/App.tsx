import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

import Workflow from './scenes/Workflow';
import withRoot from './withRoot'

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <Workflow>
      </Workflow>
    );
  }
}

const styles = () => createStyles({});

export default withRoot(withStyles(styles)(App));
