import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

import Line from './Line';
import { DefaultProps } from './index'

interface Props extends WithStyles<typeof styles>, DefaultProps {}

class Action extends React.Component<Props> {
  render() {
    const { children, classes, isEnd } = this.props;
    return (
      <>
        <div className={classes.root}>{ children }</div>
        { !isEnd && <Line/> }
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    border: "2px solid " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5,
    width: "fit-content",
    margin: "0 auto"
  }
});

export default withStyles(styles)(Action);
