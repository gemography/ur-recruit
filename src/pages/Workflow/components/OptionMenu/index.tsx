import * as React from 'react';
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ActionCommand, { ActionMethodEnum } from '../../lib/commands/ActionCommand'
import ConditionCommand, { ConditionMethodEnum } from '../../lib/commands/ConditionCommand'
import EventCommand, { EventMethodEnum } from '../../lib/commands/EventCommand'
import Command, { CommandTypeEnum } from '../../lib/Command'

import OptionMenuList from './OptionMenuList'
import { actionFetchWorkflow } from '../../actions'
import { OptionMenuItemModel, OptionModel } from '../../model'

interface Props extends WithStyles<typeof styles> {
  eventExists: boolean;
  actionFetchWorkflow: any;
}

class OptionMenu extends React.PureComponent<Props> {
  handleOptionSelect = (command: Command) => async (parent: string) => {
    const { actionFetchWorkflow } = this.props
    await command.execute(parent);
    actionFetchWorkflow()
  };

  render(): React.ReactNode {
    const {classes, eventExists} = this.props

    return (
      <div className={classes.root}>
      {
        eventExists?
          <>
            <OptionMenuList
              items={[
                {
                  option: { type: CommandTypeEnum.CONDITION, method: ConditionMethodEnum.IF_ELSE } as OptionModel,
                  command: new ConditionCommand(ConditionMethodEnum.IF_ELSE)
                },
                {
                  option: { type: CommandTypeEnum.CONDITION, method: ConditionMethodEnum.WAIT } as OptionModel,
                  command: new ConditionCommand(ConditionMethodEnum.WAIT)
                }
              ] as Array<OptionMenuItemModel>}
              onOptionSelect={this.handleOptionSelect}
            />
            <OptionMenuList
              items={[
                {
                  option: { type: CommandTypeEnum.ACTION, method: ActionMethodEnum.EMAIL } as OptionModel,
                  command: new ActionCommand(ActionMethodEnum.EMAIL)
                },
                {
                  option: { type: CommandTypeEnum.ACTION, method: ActionMethodEnum.TAG } as OptionModel,
                  command: new ActionCommand(ActionMethodEnum.TAG)
                },
                {
                  option: { type: CommandTypeEnum.ACTION, method: ActionMethodEnum.STAGE } as OptionModel,
                  command: new ActionCommand(ActionMethodEnum.STAGE)
                },
                {
                  option: { type: CommandTypeEnum.ACTION, method: ActionMethodEnum.DISQUALIFY } as OptionModel,
                  command: new ActionCommand(ActionMethodEnum.DISQUALIFY)
                }
              ] as Array<OptionMenuItemModel>}
              onOptionSelect={this.handleOptionSelect}
            />
          </>:
          <OptionMenuList
            items={[
              {
                option: { type: CommandTypeEnum.EVENT, method: EventMethodEnum.TAG } as OptionModel,
                command: new EventCommand(EventMethodEnum.TAG)
              },
              {
                option: { type: CommandTypeEnum.EVENT, method: EventMethodEnum.STAGE } as OptionModel,
                command: new EventCommand(EventMethodEnum.STAGE)
              },
              {
                option: { type: CommandTypeEnum.EVENT, method: EventMethodEnum.WEBHOOK } as OptionModel,
                command: new EventCommand(EventMethodEnum.WEBHOOK)
              }
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

function mapDispatchToProps(dispatch: any) {
  return {
    actionFetchWorkflow: bindActionCreators(actionFetchWorkflow, dispatch)
  };
}

export default withStyles(styles)(connect(undefined, mapDispatchToProps)(OptionMenu));
