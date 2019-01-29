import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  onEventSelect : (e: React.MouseEvent<HTMLElement>) => void;
}

class EventItem extends React.Component<Props> {
  render() {
    const { classes, children, onEventSelect } = this.props;
    return (
      <div className={classes.root} onClick={onEventSelect}>
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
    "& *": {
      color: theme.palette.primary.main
    }
  }
});

export default withStyles(styles)(EventItem);
