import * as React from 'react';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';

import Workflow from './scenes/Workflow';
import withRoot from './withRoot';

import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

interface Props extends WithStyles<typeof styles> {}

class App extends React.Component<Props> {
  render(): React.ReactNode {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <div>
          <Workflow>
          </Workflow>
        </div>
      </DragDropContextProvider>
    );
  }
}

const styles = () => createStyles({});

export default withRoot(withStyles(styles)(App));
