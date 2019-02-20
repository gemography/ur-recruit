import * as React from 'react';
import {
  createStyles,
  WithStyles,
  withStyles,
  Theme,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdatePopover from '../UpdatePopover';
import DeletePopover from '../DeletePopover';

interface Props extends WithStyles<typeof styles> {
  parentAnchorEl: any;
  data: any;
  onUpdate: (_id: string, name: string) => void;
  onDelete: (_id: string) => void;
  onClose: () => void;
}

class Options extends React.Component<Props> {
  state = {
    updateAnchorEl: null,
    deleteAnchorEl: null
  }

  handleOpen = (anchorKey: string, event: any) => {
    const { onClose } = this.props;
    this.setState({
      [anchorKey]: event.currentTarget
    });
    onClose();
  }
  handleClose = (anchorKey: string) => this.setState({
    [anchorKey]: null
  });

  handleSave = (name: string) => {
    const { onUpdate, data: {_id} } = this.props;
    !!name && onUpdate(_id, name)
    this.setState({updateAnchorEl: null, deleteAnchorEl: null})
  };

  render(): React.ReactNode {
    const { updateAnchorEl, deleteAnchorEl } = this.state;
    const { data: {name, _id}, onDelete, parentAnchorEl, onClose } = this.props;

    return (
      <>
        <Menu
          id="simple-menu"
          anchorEl={parentAnchorEl}
          open={Boolean(parentAnchorEl)}
          onClose={onClose}
        >
          <MenuItem
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            aria-label="rename"
            onClick={event=> this.handleOpen("updateAnchorEl", event)}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Rename" />
          </MenuItem>
          <MenuItem
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            aria-label="delete"
            onClick={event=> this.handleOpen("deleteAnchorEl", event)}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary="Delete" />
          </MenuItem>
        </Menu>
        <UpdatePopover
          parentAnchorEl={updateAnchorEl}
          name={name}
          onSave={this.handleSave}
          onClose={() => this.handleClose("updateAnchorEl")}
        />
        <DeletePopover
          parentAnchorEl={deleteAnchorEl}
          onConfirm={()=> onDelete(_id)}
          onCancel={() => this.handleClose("deleteAnchorEl")}
        />
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({ });

export default withStyles(styles)(Options);
