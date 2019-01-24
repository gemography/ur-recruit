import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import {EventType} from "./index"

export interface Props extends WithStyles<typeof styles> {
  eventType: EventType;
  onEventSelect : (eventType: EventType) => () => void;
}

class EventItem extends React.Component<Props> {
  render() {
    const { classes, children, onEventSelect, eventType } = this.props;
    return (
      <div className={classes.root} onClick={onEventSelect(eventType)}>
        {children}
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    padding: theme.spacing.unit * 2,
    border: "2px solid " + theme.palette.primary.light,
    width: theme.spacing.unit * 16,
    borderRadius: theme.spacing.unit,
    color: theme.palette.primary.light,
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      borderColor:theme.palette.primary.main,
      color: theme.palette.primary.main
    },
    "&.selected": {
      borderColor:theme.palette.primary.main,
      color: theme.palette.primary.main
    },
    "& *": {
      color: theme.palette.primary.main
    }
  }
});

export default withStyles(styles)(EventItem);
