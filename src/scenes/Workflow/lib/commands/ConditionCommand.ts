import Command, { CommandTypeEnum } from '../Command'

class ConditionCommand extends Command {

  execute(): void {
    console.log("Execute ConditionCommand of type " + CommandTypeEnum[this.type] + " on position " + this.position);
  }
}

export default ConditionCommand;
