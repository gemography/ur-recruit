import * as React from 'react';
import { Drawer, Divider, createStyles, WithStyles, withStyles, ListSubheader, Theme } from '@material-ui/core';
import ActionCommand from '../../lib/commands/ActionCommand'
import ConditionCommand from '../../lib/commands/ConditionCommand'
import Command, {CommandTypeEnum} from '../../lib/Command'
import List from './List'

import { OptionMenuItemModel } from '../../model'

interface Props extends WithStyles<typeof styles> {}

class Options extends React.PureComponent<Props> {
  handleOptionSelect = (command: Command) => () => {
    command.execute()
  };

  render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        open={false}
        anchor="right"
      >
        <List
          subheader={<ListSubheader component="div">Conditions</ListSubheader>}
          items={[
            {text: 'if/else', command: new ConditionCommand(0, CommandTypeEnum.IF_ELSE_CONDITION)},
            {text: 'wait', command: new ConditionCommand(0, CommandTypeEnum.WAIT_CONDITION)}
          ] as Array<OptionMenuItemModel>}
          onOptionSelect={this.handleOptionSelect}
        />
        <Divider />
        <List
          subheader={<ListSubheader component="div">Actions</ListSubheader>}
          items={[{text: 'Send E-mail', command: new ActionCommand(0, CommandTypeEnum.EMAIL_ACTION)},
            {text: 'Add tag', command: new ActionCommand(0, CommandTypeEnum.TAG_ACTION)},
            {text: 'Move to', command: new ActionCommand(0, CommandTypeEnum.STAGE_ACTION)},
            {text: 'Disqualify', command: new ActionCommand(0, CommandTypeEnum.DISQUALIFY_ACTION)}
          ] as Array<OptionMenuItemModel>}
          onOptionSelect={this.handleOptionSelect}
        />
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
  }
});

export default withStyles(styles)(Options);
