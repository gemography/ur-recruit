import Command from './Command'

class ConditionCommand extends Command {

  execute(): void {
    console.log("Execute ConditionCommand of type " + this.type + " on position " + this.position);
  }
}

export default ConditionCommand;
