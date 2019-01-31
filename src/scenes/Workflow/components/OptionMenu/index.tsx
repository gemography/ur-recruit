import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import ActionCommand, { ActionMethodEnum } from '../../lib/commands/ActionCommand'
import ConditionCommand, { ConditionMethodEnum } from '../../lib/commands/ConditionCommand'
import Command, { CommandTypeEnum } from '../../lib/Command'
import OptionMenuList from './OptionMenuList'

import { OptionMenuItemModel } from '../../model'

interface Props extends WithStyles<typeof styles> {}

class Options extends React.PureComponent<Props> {
  handleOptionSelect = (command: Command) => (parent: string) => {
    command.execute(parent)
  };

  render(): React.ReactNode {
    const {classes} = this.props

    return (
      <div className={classes.root}>
        <OptionMenuList
          type={ CommandTypeEnum.CONDITION }
          items={[
            {text: 'if/else', command: new ConditionCommand(CommandTypeEnum.CONDITION, ConditionMethodEnum.IF_ELSE)},
            {text: 'wait', command: new ConditionCommand(CommandTypeEnum.CONDITION, ConditionMethodEnum.WAIT)}
          ] as Array<OptionMenuItemModel>}
          onOptionSelect={this.handleOptionSelect}
        />
        <OptionMenuList
          type={ CommandTypeEnum.ACTION }
          items={[{text: 'Send E-mail', command: new ActionCommand(CommandTypeEnum.ACTION, ActionMethodEnum.EMAIL)},
            {text: 'Add tag', command: new ActionCommand(CommandTypeEnum.ACTION, ActionMethodEnum.TAG)},
            {text: 'Move to', command: new ActionCommand(CommandTypeEnum.ACTION, ActionMethodEnum.STAGE)},
            {text: 'Disqualify', command: new ActionCommand(CommandTypeEnum.ACTION, ActionMethodEnum.DISQUALIFY)}
          ] as Array<OptionMenuItemModel>}
          onOptionSelect={this.handleOptionSelect}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root : {
    paddingLeft: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 3
  }
});

export default withStyles(styles)(Options);
