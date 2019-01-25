import Command from './Command'

class ActionCommand extends Command {
  execute(): void {
    console.log("Execute ActionCommand of type " + this.type + " on position " + this.position);
  }
}

export default ActionCommand;
