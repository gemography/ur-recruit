import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {}

class Placeholder extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography variant="subtitle2" color="primary">Drop an Option</Typography>
        </div>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit + "px " + theme.spacing.unit * 1.5 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit,
    width: "fit-content",
    margin: "0 auto"
  }
});

export default withStyles(styles)(Placeholder);
