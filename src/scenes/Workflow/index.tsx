import * as React from 'react';
import Options from './components/Options'
import { Button, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

export interface Props extends WithStyles<typeof styles> {}

class Workflow extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <div>
        <Options></Options>
        <main className={classes.main}>
          <Button className={classes.eventPlaceHolder}>Add an Event</Button>
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  main: {
    width: 600,
    margin: "32px auto"
  },
  eventPlaceHolder: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: 16,
    fontSize: 16
  }
});

export default withStyles(styles)(Workflow);
