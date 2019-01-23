import Command from './Command'

class ConditionCommand extends Command {

  execute(): void {
    console.log("Execute a ConditionCommand");
  }
}

export default ConditionCommand;
