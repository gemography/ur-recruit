import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {}

class Condition extends React.Component<Props> {
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography variant="subtitle2" color="primary">{ children }</Typography>
        </div>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: 256,
    margin: "0 auto",
    minWidth: theme.spacing.unit * 20
  }
});

export default withStyles(styles)(Condition);
