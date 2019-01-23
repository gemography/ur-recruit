import * as React from 'react';
import { Drawer, Divider, List, createStyles, WithStyles, withStyles, ListSubheader, Theme } from '@material-ui/core';
import Option from '../Option'
import ActionCommand from '../../modules/ActionCommand'
import ConditionCommand from '../../modules/ConditionCommand'

export interface Props extends WithStyles<typeof styles> {}

class Options extends React.PureComponent<Props> {
  render(): React.ReactNode {
    const {classes} = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={false}
        anchor="right"
      >
        <List
          subheader={<ListSubheader component="div">Conditions</ListSubheader>}
        >
          {['if / else', 'Wait'].map((text, index) => (
            <Option key={index} title={text} command={new ConditionCommand(0)}>
            </Option>
          ))}
        </List>
        <Divider />
        <List
          subheader={<ListSubheader component="div">Actions</ListSubheader>}
        >
          {['Send E-mail', 'Add tag', 'Move to', 'Disqualify'].map((text, index) => (
            <Option key={index} title={text} command={new ActionCommand(0)}>
            </Option>
          ))}
        </List>
      </Drawer>
    );
  }
}

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

export default withStyles(styles)(Options);
