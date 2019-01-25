import * as React from 'react';
import Options from './components/Options'
import { Button, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import EventDialog from './components/EventDialog';

export interface Props extends WithStyles<typeof styles> {}

export interface State {
  open: boolean;
}

class Workflow extends React.PureComponent<Props> {
  state = { open: false };

  handleOpenDialog = () => this.setState({ open: true });
  handleCloseDialog = () => this.setState({ open: false });

  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div>
        <Options></Options>
        <main className={classes.main}>
          <EventDialog
            open={this.state.open}
            onClose={this.handleCloseDialog}
          />
          <Button className={classes.eventPlaceHolder} onClick={this.handleOpenDialog}>Add an Event</Button>
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  main: {
    width: 320,
    margin: "32px auto"
  },
  eventPlaceHolder: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5
  }
});

export default withStyles(styles)(Workflow);
