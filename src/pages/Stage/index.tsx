import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme, Typography } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
}

class Workflow extends React.Component<Props> {
  render(): React.ReactNode {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.board}>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
        </div>
        <div className={classes.board}>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
        </div>
        <div className={classes.board}>
          <div className={classes.card}>
            <Typography variant="subtitle1" color="primary">Full Name</Typography>
            <Typography variant="subtitle2" color="primary">Email</Typography>
          </div>
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    margin: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 8
  },
  board: {
    width: 320,
    margin: theme.spacing.unit * 2,
    height: "fit-content",
    backgroundColor: theme.palette.common.white,
    border: `1px solid ${theme.palette.primary.light}`,
    borderRadius: theme.spacing.unit / 4,
  },
  card: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing.unit * 2,
    borderBottom: `1px solid ${theme.palette.primary.light}`
  }
});

export default withStyles(styles)(Workflow);
