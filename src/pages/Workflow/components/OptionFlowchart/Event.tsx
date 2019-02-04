import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

import Line from './Line'

interface Props extends WithStyles<typeof styles> {}

class Event extends React.Component<Props> {
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography variant="subtitle1" color="secondary">{ children }</Typography>
        </div>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: 256,
    margin: "0 auto"
  }
});

export default withStyles(styles)(Event);
