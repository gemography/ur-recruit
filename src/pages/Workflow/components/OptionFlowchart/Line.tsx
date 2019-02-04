import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {}

class Line extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}></div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    borderLeft: "2px solid " + theme.palette.primary.light,
    height: theme.spacing.unit * 3,
    width: 1,
    margin: "0px auto"
  }
});

export default withStyles(styles)(Line);
