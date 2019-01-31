import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {}

class Curve extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <svg height="50" width="600">
          <path d="M205,50 Q300,-12 395,50" stroke="hsl(0, 0%, 69%)" strokeWidth="2" fill="none" />
        </svg>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: -theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Curve);
