import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import Line from './Line'

interface Props extends WithStyles<typeof styles> {}

class Event extends React.Component<Props> {
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className={classes.root}>{ children }</div>
        <Line/>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: "fit-content",
    margin: "0 auto"
  }
});

export default withStyles(styles)(Event);
