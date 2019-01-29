import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

export interface Props extends WithStyles<typeof styles> {}

class Action extends React.Component<Props> {
  render() {
    const { children, classes } = this.props;
    return (
      <>
        <div className={classes.line}></div>
        <div className={classes.action}>{ children }</div>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  action: {
    border: "2px solid " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5,
    width: "fit-content",
    margin: "0 auto"
  },
  line: {
    borderLeft: "1px solid " + theme.palette.primary.light,
    height: theme.spacing.unit * 2,
    width: 1,
    margin: theme.spacing.unit / 2 + "px auto"
  }
});

export default withStyles(styles)(Action);
