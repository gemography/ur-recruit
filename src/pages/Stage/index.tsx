import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
}

class Workflow extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        Stage
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex"
  },
  main: {
    width: 600,
    margin: theme.spacing.unit * 10,
    textAlign: "center"
  }
});

export default withStyles(styles)(Workflow);
