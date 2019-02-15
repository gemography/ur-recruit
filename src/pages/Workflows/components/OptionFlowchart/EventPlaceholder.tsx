import * as React from 'react';
import { Button, createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  onClick: () => void
}

class EventPlaceholder extends React.Component<Props> {
  render() {
    const { children, classes, onClick } = this.props;
    return (
      <>
        <Button className={classes.root} onClick={onClick}>{ children }</Button>
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    border: "2px dashed " + theme.palette.primary.light,
    color: theme.palette.primary.main,
    padding: theme.spacing.unit * 1.5 + "px " + theme.spacing.unit * 3 + "px ",
    fontSize: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit * 5
  }
});

export default withStyles(styles)(EventPlaceholder);
