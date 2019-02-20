import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  Popover,
  Button,
  Grid,
  Typography
} from '@material-ui/core';

interface Props extends WithStyles<typeof styles> {
  parentAnchorEl: any;
  onConfirm: () => void;
  onCancel: () => void;
}

class DeletePopover extends React.Component<Props> {
  render(): React.ReactNode {
    const { parentAnchorEl, onConfirm, onCancel, classes } = this.props;
    const open = Boolean(parentAnchorEl);

    return (
      <Popover
        id="create-form-popover"
        anchorEl={parentAnchorEl}
        open={open}
        onClose={onCancel}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div className={classes.deleteConfirmationContainer}>
          <Typography variant="subtitle1">Are you sure about this?</Typography>
          <Grid justify="center" className={classes.actionsContainer} container spacing={8}>
            <Grid item>
              <Button size="small" onClick={onConfirm}>
                Yes
              </Button>
            </Grid>
            <Grid item>
              <Button size="small" onClick={onCancel}>
                No
              </Button>
            </Grid>
          </Grid>
        </div>
      </Popover>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  deleteConfirmationContainer: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  actionsContainer: {
    marginTop: theme.spacing.unit / 2
  }
});

export default withStyles(styles)(DeletePopover);
