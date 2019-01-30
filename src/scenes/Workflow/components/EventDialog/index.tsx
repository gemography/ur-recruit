import * as React from 'react';
import { createStyles, Dialog, DialogTitle, Theme, WithStyles, withStyles, Typography } from '@material-ui/core';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputIcon from '@material-ui/icons/Input';
import BuildIcon from '@material-ui/icons/Build';

import EventItem from './EventItem'
import Command, {CommandTypeEnum} from '../../lib/Command'
import EventCommand from '../../lib/commands/EventCommand'

interface Props extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

class EventDialog extends React.Component<Props> {

  handleEventSelect = (command: Command) => () => {
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
            onEventSelect={this.handleEventSelect(new EventCommand(0, CommandTypeEnum.TAG_EVENT))}
          >
            <>
              <BookmarkIcon className={classes.eventIcon}/>
              <Typography variant="subtitle1">Tag</Typography>
            </>
          </EventItem>
          <EventItem
            onEventSelect={this.handleEventSelect(new EventCommand(0, CommandTypeEnum.STAGE_EVENT))}
          >
            <>
              <InputIcon className={classes.eventIcon}/>
              <Typography variant="subtitle1">Stage</Typography>
            </>
          </EventItem>
          <EventItem
            onEventSelect={this.handleEventSelect(new EventCommand(0, CommandTypeEnum.WEBHOOK_EVENT))}
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
