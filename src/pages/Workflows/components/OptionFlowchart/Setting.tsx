import * as React from 'react';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  IconButton,
} from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Options from '../../../../components/Options';

interface Props extends WithStyles<typeof styles> {
  data: any;
  onUpdate?: (_id: string, name: string) => void;
  onDelete: (_id: string) => void;
  updateForm?: any;
}

class Setting extends React.Component<Props> {
  state = {
    anchorEl: null
  }
  handleOpen = (event: any) => this.setState({
    anchorEl: event.currentTarget
  });

  handleClose = () => this.setState({
    anchorEl: null
  });

  render(): React.ReactNode {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const {
      data,
      onUpdate,
      onDelete,
      classes,
      updateForm,
    } = this.props;

    return (
      <div className={classes.setting}>
        <IconButton
          id={data._id}
          className={classes.button}
          aria-owns={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          aria-label="Menu"
          onClick={event => this.handleOpen(event)}
        >
          <MoreHorizIcon />
        </IconButton>
        <Options
          data={data}
          dataKey="value"
          parentAnchorEl={anchorEl}
          onUpdate={onUpdate}
          updateForm={updateForm}
          onDelete={onDelete}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  setting: {
    position: "absolute",
    right: -theme.spacing.unit,
    top: -theme.spacing.unit,
    backgroundColor: theme.palette.common.white,
    boxShadow: `0 1px 3px ${theme.palette.primary.light}`,
    borderRadius: 2 * theme.spacing.unit,
    cursor: "pointer",
    visibility: 'hidden'
  },
  button: {
    padding: 0
  }
});

export default withStyles(styles)(Setting);
