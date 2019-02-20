import * as React from 'react';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Options from './Options';

interface Props extends WithStyles<typeof styles> {
  data: any;
  isSelected: boolean,
  onSelect: () => void
  onCreate: (name: string) => void
  onUpdate: (_id: string, name: string) => void
  onDelete: (_id: string) => void
}

class ATSListItem extends React.Component<Props> {
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
      classes,
      isSelected,
      onSelect,
      data,
      onUpdate,
      onDelete,
    } = this.props;

    return (
      <>
        <ListItem
          className={classes.listItem}
          classes={{
            container: classes.listItem
          }}
          button
          selected={isSelected}
          onClick={onSelect}
        >
          <ListItemText primary={data.name} />
          <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
            <IconButton
              id={data._id}
              aria-owns={open ? 'simple-menu' : undefined}
              aria-haspopup="true"
              aria-label="Menu"
              onClick={event => this.handleOpen(event)}>
              <MoreHorizIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Options
          data={data}
          parentAnchorEl={anchorEl}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onClose={this.handleClose}
        />
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  listItem: {
    "&:hover $listItemSecondaryAction": {
      visibility: "inherit"
    }
  },
  listItemSecondaryAction: {
    visibility: 'hidden'
  },
});

export default withStyles(styles)(ATSListItem);
