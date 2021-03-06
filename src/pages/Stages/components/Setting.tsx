import * as React from 'react';
import {
  WithStyles,
  withStyles,
  createStyles,
  Theme,
  IconButton,
} from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Options from '../../../components/Options';

interface Props extends WithStyles<typeof styles> {
  data: any;
  onUpdate: (_id: string, name: string) => void;
  onDelete: (_id: string) => void;
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
    } = this.props;

    return (
      <>
        <IconButton
          id={data._id}
          aria-owns={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          aria-label="Menu"
          onClick={event => this.handleOpen(event)}>
          <MoreVertIcon />
        </IconButton>
        <Options
          data={data}
          dataKey="name"
          parentAnchorEl={anchorEl}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onClose={this.handleClose}
        />
      </>
    );
  }
}

const styles = (theme: Theme) => createStyles({});

export default withStyles(styles)(Setting);
