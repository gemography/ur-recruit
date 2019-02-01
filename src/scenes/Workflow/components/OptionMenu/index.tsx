import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import ActionCommand, { ActionMethodEnum } from '../../lib/commands/ActionCommand'
import ConditionCommand, { ConditionMethodEnum } from '../../lib/commands/ConditionCommand'
import EventCommand, { EventMethodEnum } from '../../lib/commands/EventCommand'
import Command, { CommandTypeEnum } from '../../lib/Command'
import OptionMenuList from './OptionMenuList'

import { OptionMenuItemModel } from '../../model'

interface Props extends WithStyles<typeof styles> {
  eventExists: boolean
  onWorkflowChange: () => void
}

class OptionMenu extends React.PureComponent<Props> {
  handleOptionSelect = (command: Command) => async (parent: string) => {
    const { onWorkflowChange, eventExists } = this.props
    await command.execute(parent)
    onWorkflowChange()
  };

  render(): React.ReactNode {
    const {classes, eventExists} = this.props

    return (
      <div className={classes.root}>
      {
        eventExists?
          <>
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
          </>:
          <OptionMenuList
            type={ CommandTypeEnum.EVENT }
            items={[
              {text: 'On Tag', command: new EventCommand(CommandTypeEnum.EVENT, EventMethodEnum.TAG)},
              {text: 'On Stage', command: new EventCommand(CommandTypeEnum.EVENT, EventMethodEnum.STAGE)},
              {text: 'Webhook', command: new EventCommand(CommandTypeEnum.EVENT, EventMethodEnum.WEBHOOK)}
            ] as Array<OptionMenuItemModel>}
            onOptionSelect={this.handleOptionSelect}
          />
      }
      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root : {
    paddingLeft: theme.spacing.unit * 5,
    paddingTop: theme.spacing.unit * 16
  }
});

export default withStyles(styles)(OptionMenu);
