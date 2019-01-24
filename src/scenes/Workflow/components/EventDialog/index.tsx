import * as React from 'react';
import { createStyles, Dialog, DialogTitle, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputIcon from '@material-ui/icons/Input';
import BuildIcon from '@material-ui/icons/Build';

import EventItem from './EventItem'
import Command from '../../modules/Command'

export enum EventType {
  TAG,
  STAGE,
  WEBHOOK
}

export interface Props extends WithStyles<typeof styles> {
  open: boolean;
  command: Command;
  onClose: () => void;
}

export interface State {
  eventType: EventType;
}

class EventDialog extends React.Component<Props> {

  state = {
    eventType: null
  };

  static getDerivedStateFromProps(nextProps: Readonly<Props>, prevState: Readonly<State>) {
    return { open: nextProps.open, eventType: prevState.eventType };
  }

  onEventSelect = (eventType: EventType) => () => {
    const { command } = this.props;
    command.execute()
    this.props.onClose();
  };

  render() {
    const { classes, open } = this.props;
    return (
      <Dialog open={open} maxWidth="sm" fullWidth={true}>
        <DialogTitle>Select an event</DialogTitle>
        <div className={classes.eventItemsContainer}>
          <EventItem
            onEventSelect={this.onEventSelect}
            eventType={EventType.TAG}
          >
            <>
              <BookmarkIcon className={classes.eventIcon}/>
              <Typography variant="subtitle1">Tag</Typography>
            </>
          </EventItem>
          <EventItem
            onEventSelect={this.onEventSelect}
            eventType={EventType.STAGE}
          >
            <>
              <InputIcon className={classes.eventIcon}/>
              <Typography variant="subtitle1">Stage</Typography>
            </>
          </EventItem>
          <EventItem
            onEventSelect={this.onEventSelect}
            eventType={EventType.WEBHOOK}
          >
            <>
              <BuildIcon className={classes.eventIcon}/>
              <Typography variant="subtitle1">Webhook</Typography>
            </>
          </EventItem>
        </div>
      </Dialog>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  eventItemsContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    marginBottom: theme.spacing.unit * 2
  },
  eventIcon: {
    fontSize: theme.spacing.unit * 5
  }
});

export default withStyles(styles)(EventDialog);
