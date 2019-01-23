import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, createStyles, WithStyles, withStyles } from '@material-ui/core';
import OpenWithIcon from '@material-ui/icons/OpenWith';

import Command from '../../modules/Command'

export interface Props extends WithStyles<typeof styles> {
  title: string,
  command: Command
}

class Action extends React.Component<Props> {
  render() {
    const { title, command } = this.props;
    return (
      <ListItem button key={title} onClick={command.execute}>
        <ListItemText primary={title} />
        <ListItemIcon><OpenWithIcon/></ListItemIcon>
      </ListItem>
    );
  }
}

const styles = () => createStyles({});

export default withStyles(styles)(Action);
