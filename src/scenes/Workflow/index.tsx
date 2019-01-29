import * as React from 'react';
import OptionMenu from './components/OptionMenu'
import { Button, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import EventDialog from './components/EventDialog';
import {Action} from './components/Options/index';

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
        <OptionMenu></OptionMenu>
        <main className={classes.main}>
          <EventDialog
            open={this.state.open}
            onClose={this.handleCloseDialog}
          />
          <Button className={classes.eventPlaceHolder} onClick={this.handleOpenDialog}>Add an Event</Button>
          <Action>action 1</Action>
          <Action>action 1</Action>
        </main>
      </div>
    );
  }
}


const styles = (theme: Theme) => createStyles({
  main: {
    width: 320,
    margin: "32px auto",
    textAlign: "center"
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
