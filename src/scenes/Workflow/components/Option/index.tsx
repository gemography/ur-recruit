import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon, createStyles, WithStyles, withStyles } from '@material-ui/core';
import OpenWithIcon from '@material-ui/icons/OpenWith';

export interface Props extends WithStyles<typeof styles> {
  text: string,
  onOptionSelect : () => void;
}

class Action extends React.Component<Props> {
  render() {
    const { text, onOptionSelect } = this.props;
    return (
      <ListItem button key={text} onClick={onOptionSelect}>
        <ListItemText primary={text} />
        <ListItemIcon><OpenWithIcon/></ListItemIcon>
      </ListItem>
    );
  }
}

const styles = () => createStyles({});

export default withStyles(styles)(Action);
