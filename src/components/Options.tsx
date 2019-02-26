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
import UpdatePopover from './UpdatePopover';
import DeletePopover from './DeletePopover';

interface Props extends WithStyles<typeof styles> {
  parentAnchorEl: any;
  data: any;
  dataKey: string;
  onUpdate?: (_id: string, name: string) => void;
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
    !!name && onUpdate && onUpdate(_id, name)
    this.setState({updateAnchorEl: null, deleteAnchorEl: null})
  };

  handleDelete = () => {
    const { onDelete, data: {_id} } = this.props;
    onDelete(_id);
    this.handleClose("deleteAnchorEl")
  }

  render(): React.ReactNode {
    const { updateAnchorEl, deleteAnchorEl } = this.state;
    const { data, dataKey, onUpdate, parentAnchorEl, onClose } = this.props;

    return (
      <>
        <Menu
          id="simple-menu"
          anchorEl={parentAnchorEl}
          open={Boolean(parentAnchorEl)}
          onClose={onClose}
        >

        { onUpdate &&
          <MenuItem
            aria-owns={open ? 'simple-popper' : undefined}
            aria-haspopup="true"
            aria-label="edit"
            onClick={event=> this.handleOpen("updateAnchorEl", event)}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText inset primary="Edit" />
          </MenuItem>
        }
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
            value={data[dataKey]}
            onSave={this.handleSave}
            onClose={() => this.handleClose("updateAnchorEl")}
          />
        <DeletePopover
          parentAnchorEl={deleteAnchorEl}
          onConfirm={this.handleDelete}
          onCancel={() => this.handleClose("deleteAnchorEl")}
        />
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({ });

export default withStyles(styles)(Options);
