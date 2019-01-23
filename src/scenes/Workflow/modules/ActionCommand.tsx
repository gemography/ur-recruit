import Command from './Command'

class ActionCommand extends Command {

  execute(): void {
    console.log("Execute a ActionCommand");
  }
}

export default ActionCommand;
