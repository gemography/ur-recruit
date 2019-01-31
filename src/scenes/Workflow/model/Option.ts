import { CommandTypeEnum } from '../lib/Command'
import { ActionMethodEnum } from '../lib/commands/ActionCommand'
import { ConditionMethodEnum } from '../lib/commands/ConditionCommand'
import { EventMethodEnum } from '../lib/commands/EventCommand'

export default interface OptionModel {
  _id: string;
  type: CommandTypeEnum;
  method: ActionMethodEnum | ConditionMethodEnum | EventMethodEnum;
  children: Array<string>;
}
